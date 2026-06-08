import { useActionState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "./schemas";
import { loginAction } from "./actions";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(loginAction, null);

  const onSubmitForm = (data: LoginInput) => {
    startTransition(() => formAction(data));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}
