import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, startTransition } from "react";
import { OpenShiftSchema, OpenShiftInput, OpenShiftFormInput, CloseShiftFormInput, CloseShiftInput, CloseShiftSchema } from "./schemas";
import { openShiftAction, closeShiftAction } from "./actions";

export function useOpenShiftForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OpenShiftFormInput>({
    resolver: zodResolver(OpenShiftSchema),
    defaultValues: {
      initialCapital: 0,
    },
  });

  const [state, formAction, isPending] = useActionState(openShiftAction, null);

  const onSubmitForm = (data: OpenShiftFormInput) => {
    startTransition(() => {
      formAction(data as OpenShiftInput);
      reset();
    });
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}

export function useCloseShiftForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CloseShiftFormInput>({
    resolver: zodResolver(CloseShiftSchema),
    defaultValues: {
      actualCash: 0,
    },
  });

  const actualCash = Number(watch("actualCash")) || 0;

  const [state, formAction, isPending] = useActionState(closeShiftAction, null);

  const onSubmitForm = (data: CloseShiftFormInput) => {
    startTransition(() => {
      formAction(data as CloseShiftInput);
      reset();
    });
  };

  return { actualCash, register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}
