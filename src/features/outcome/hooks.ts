import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, startTransition } from "react";
import { OutcomeSchema, OutcomeFormInput, OutcomeInput } from "./schemas";
import { createOutcomeAction } from "./actions";

export function useCreateOutcomeForm({ currentCash }: { currentCash: number }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<OutcomeFormInput>({
    resolver: zodResolver(OutcomeSchema),
    defaultValues: {
      category: "BIAYA_PRODUKSI",
      total: 0,
      information: "",
    },
  });

  const [state, formAction, isPending] = useActionState(createOutcomeAction, null);

  const onSubmitForm = (data: OutcomeFormInput) => {
    const totalOutcome = data.total as number;

    if (currentCash - totalOutcome < 0) {
      return setError("total", {
        type: "manual",
        message: `Uang kas saat ini tidak cukup untuk pengeluaran`,
      });
    }

    startTransition(() => {
      formAction(data as OutcomeInput);
      reset();
    });
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}
