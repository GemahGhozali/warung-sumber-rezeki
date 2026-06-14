import { z } from "zod";
import { PaymentMethod } from "@/generated/prisma/enums";

export const CartItemSchema = z.object({
  id: z.string(),
  menuId: z.string().nullable().optional(),
  menuName: z.string().min(1, "Nama menu tidak boleh kosong").max(100),
  price: z.coerce.number("Harga wajib berupa angka").int("Harga berupa bilangan bulat").min(0, "Harga tidak boleh negatif"),
  hpp: z.coerce.number("Estimasi HPP wajib berupa angka").int("Estimasi HPP berupa bilangan bulat").min(0, "Estimasi HPP tidak boleh negatif"),
  quantity: z.coerce.number("Total item wajib berupa angka").int("Total item berupa bilangan bulat").min(0, "Total item tidak boleh negatif"),
  image: z.string().nullable().optional(),
  isCustom: z.boolean().default(false),
});

export const CheckoutTransactionSchema = z
  .object({
    paymentMethod: z.enum(PaymentMethod),
    totalPrice: z.number(),
    totalPayment: z.coerce.number("Nominal pembayaran wajib berupa angka").int("Nominal pembayaran berupa bilangan bulat").min(0, "Nominal pembayaran tidak boleh negatif"),
    cartItems: z.array(CartItemSchema).min(1, "Keranjang belanja masih kosong"),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === PaymentMethod.TUNAI) {
        return data.totalPayment >= data.totalPrice;
      }
      return true;
    },
    { message: "Uang pembayaran tunai tidak mencukupi total belanja", path: ["totalPayment"] },
  );

export const CustomMenuSchema = CartItemSchema.pick({
  menuName: true,
  price: true,
  hpp: true,
}).refine((data) => data.price >= data.hpp, { message: "Harga jual tidak boleh lebih kecil dari HPP", path: ["price"] });

export type CartItemInput = z.infer<typeof CartItemSchema>;

export type CheckoutTransactionInput = z.infer<typeof CheckoutTransactionSchema>;
export type CheckoutTransactionFormInput = z.input<typeof CheckoutTransactionSchema>;

export type CustomMenuInput = z.infer<typeof CustomMenuSchema>;
export type CustomMenuFormInput = z.input<typeof CustomMenuSchema>;
