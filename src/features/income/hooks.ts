import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, startTransition } from "react";
import { IncomeSchema, IncomeFormInput, IncomeInput } from "./schemas";
import { createIncomeAction } from "./actions";

interface UseCreateIncomeFormProps {
  onSuccess?: () => void;
}

export function useCreateIncomeForm({ onSuccess }: UseCreateIncomeFormProps = {}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncomeFormInput>({
    resolver: zodResolver(IncomeSchema),
    defaultValues: {
      category: "MODAL_TAMBAHAN",
      total: 0,
      information: "",
    },
  });

  const [state, formAction, isPending] = useActionState(createIncomeAction, null);

  const onSubmitForm = (data: IncomeFormInput) => {
    startTransition(() => {
      formAction(data as IncomeInput);
      reset();
      if (onSuccess) onSuccess();
    });
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}
