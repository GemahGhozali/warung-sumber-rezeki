import { useRouter } from "next/navigation";
import { useActionState, startTransition, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "./stores";
import { createTransactionAction } from "./actions";
import { PaymentMethod } from "@/generated/prisma/enums";
import { CheckoutTransactionSchema, CheckoutTransactionFormInput, CheckoutTransactionInput, CustomMenuFormInput, CustomMenuSchema, CustomMenuInput } from "./schemas";

export function useCheckoutForm() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const [state, formAction, isPending] = useActionState(createTransactionAction, null);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CheckoutTransactionFormInput>({
    resolver: zodResolver(CheckoutTransactionSchema),
    defaultValues: {
      paymentMethod: PaymentMethod.TUNAI,
      totalPrice: totalPrice,
      totalPayment: 0,
      cartItems: cart,
    },
  });

  useEffect(() => {
    setValue("cartItems", cart);
    setValue("totalPrice", totalPrice);
  }, [cart, totalPrice, setValue]);

  const selectedPaymentMethod = useWatch({ control, name: "paymentMethod" });
  const watchedTotalPayment = useWatch({ control, name: "totalPayment" }) || 0;

  useEffect(() => {
    if (selectedPaymentMethod === PaymentMethod.TRANSFER) {
      setValue("totalPayment", totalPrice);
    } else {
      setValue("totalPayment", 0);
    }
  }, [selectedPaymentMethod, totalPrice, setValue]);

  const totalChange = selectedPaymentMethod === PaymentMethod.TUNAI && Number(watchedTotalPayment) >= totalPrice ? Number(watchedTotalPayment) - totalPrice : 0;

  const onSubmitForm = (data: CheckoutTransactionFormInput) => {
    if (data.paymentMethod === PaymentMethod.TUNAI && Number(data.totalPayment) < totalPrice) {
      return setError("totalPayment", {
        type: "manual",
        message: "Uang tunai yang dimasukkan tidak mencukupi total belanja",
      });
    }

    startTransition(() => formAction(data as CheckoutTransactionInput));
  };

  useEffect(() => {
    if (state?.success) {
      clearCart();
      reset();
      router.push("/kasir");
    }
  }, [state, clearCart, reset]);

  return {
    register,
    errors,
    state,
    isPending,
    totalChange,
    totalPrice,
    selectedPaymentMethod,
    handleSubmit: handleSubmit(onSubmitForm),
  };
}

export function useCustomMenuForm({ onSuccess }: { onSuccess: () => void }) {
  const { addCustomItem } = useCartStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomMenuFormInput>({
    resolver: zodResolver(CustomMenuSchema),
    defaultValues: {
      menuName: "",
      price: 0,
      hpp: 0,
    },
  });

  const onSubmitForm = (data: CustomMenuFormInput) => {
    addCustomItem(data as CustomMenuInput);
    reset();
    onSuccess();
  };

  return { register, errors, handleSubmit: handleSubmit(onSubmitForm), resetForm: reset };
}
