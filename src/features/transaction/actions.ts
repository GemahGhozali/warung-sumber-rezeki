"use server";

import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";
import { getSession } from "@/libs/session";
import { formatZodError } from "@/libs/zod";
import { revalidatePath } from "next/cache";
import { getActiveShiftId } from "@/features/shift/queries";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
import { CheckoutTransactionSchema, CheckoutTransactionInput, CartItemInput } from "./schemas";
import { PaymentMethod } from "@/generated/prisma/enums";
import { ServerActionResponse } from "@/types";
import { Menu, Prisma, Transaction, TransactionDetail } from "@/generated/prisma/client";

export async function createTransactionAction(prevState: ServerActionResponse<Transaction> | null, data: CheckoutTransactionInput): Promise<ServerActionResponse<Transaction>> {
  const validation = CheckoutTransactionSchema.safeParse(data);

  if (!validation.success) {
    return sendErrorResponse({ message: "Gagal memproses transaksi, data tidak valid", code: "VALIDATION_ERROR", fields: formatZodError(validation.error) });
  }

  const { paymentMethod, totalPayment, cartItems } = validation.data;

  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShiftId = await getActiveShiftId();
    if (!activeShiftId) return sendErrorResponse({ message: "Transaksi ditolak. Anda harus membuka shift toko terlebih dahulu", code: "SHIFT_CLOSED" });

    const { totalPrice, transactionDetails } = await generateTransactionDetails(cartItems);

    // Validasi ulang nominal pembayaran terhadap uang hasil hitung server
    if (paymentMethod === PaymentMethod.TUNAI && totalPayment < totalPrice) {
      return sendErrorResponse({ message: "Gagal memproses transaksi. Uang tunai yang dimasukkan tidak mencukupi", code: "VALIDATION_ERROR" });
    }

    // Hitung total kembalian
    const calculatedChange = paymentMethod === PaymentMethod.TUNAI ? totalPayment - totalPrice : 0;

    // Jika transaksi transfer, total payment sama seperti hasil kalkulasi totalPrice
    // Jika transaksi tunai, total payment sama seperti yang dikirimkan dari form
    const finalTotalPayment = paymentMethod === PaymentMethod.TRANSFER ? totalPrice : totalPayment;

    const transaction = await prisma.transaction.create({
      data: {
        paymentMethod,
        totalPrice,
        totalPayment: finalTotalPayment,
        totalChange: calculatedChange,
        userId: user.id,
        shiftId: activeShiftId,
        transactionDetails: { createMany: { data: transactionDetails } },
      },
    });

    revalidatePath("/", "layout");

    return sendSuccessResponse({ message: "Transaksi berhasil tercatat", data: transaction });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientInitializationError && error.errorCode === "P1001") {
      return sendErrorResponse({ message: "Terjadi kesalahan pada server saat memproses transaksi", code: "INTERNAL_SERVER_ERROR" });
    }

    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan pada server saat memproses transaksi";
    return sendErrorResponse({ message: errorMessage, code: "INTERNAL_SERVER_ERROR" });
  }
}

async function generateTransactionDetails(cartItems: CheckoutTransactionInput["cartItems"]) {
  const menuInDatabase = await getCartItemDetails(cartItems);

  let totalPrice = 0;

  const transactionDetails: Array<Omit<TransactionDetail, "id" | "transactionId" | "createdAt" | "updatedAt">> = [];

  for (const item of cartItems) {
    const product = validateCartItem(item, menuInDatabase);

    const itemSubtotal = product.price * item.quantity;
    totalPrice += itemSubtotal;

    transactionDetails.push({
      menuId: item.menuId || null,
      menuName: product.name,
      price: product.price,
      hpp: product.hpp,
      quantity: item.quantity,
      subtotal: itemSubtotal,
      isCustom: item.isCustom,
    });
  }

  return { transactionDetails, totalPrice };
}

function validateCartItem(item: CartItemInput, menuInDatabase: Pick<Menu, "id" | "name" | "price" | "hpp">[]) {
  if (item.isCustom && item.menuId) throw new Error("Menu custom tidak boleh mengandung ID menu terdaftar");

  if (item.isCustom) return { name: item.menuName, price: item.price, hpp: item.hpp };

  const menu = menuInDatabase.find((menu) => menu.id === item.menuId);

  if (!menu) throw new Error(`Menu dengan nama "${item.menuName}" tidak ditemukan`);

  return { name: menu.name, price: menu.price, hpp: menu.hpp };
}

async function getCartItemDetails(cartItems: CheckoutTransactionInput["cartItems"]) {
  const regularMenuIds = cartItems.filter((item) => !item.isCustom && item.menuId).map((item) => item.menuId as string);

  return await prisma.menu.findMany({
    where: { id: { in: regularMenuIds } },
    select: { id: true, name: true, price: true, hpp: true },
  });
}
