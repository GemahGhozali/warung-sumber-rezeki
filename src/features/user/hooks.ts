import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, CreateUserInput, EditUserSchema, EditUserInput } from "./schemas";
import { createUserAction, editUserAction } from "./actions";
import { Role } from "@/generated/prisma/enums";

export function useCreateUserForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: Role.KASIR,
      image: null,
    },
  });

  const [state, formAction, isPending] = useActionState(createUserAction, null);

  const onSubmitForm = (data: CreateUserInput) => {
    startTransition(() => formAction(data));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), watch, setValue, errors, state, isPending };
}

export function useEditUserForm({ userData }: { userData: EditUserInput }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserInput>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      role: userData.role,
      password: "",
      image: userData.image,
    },
  });

  const [state, formAction, isPending] = useActionState(editUserAction, null);

  const onSubmitForm = (data: EditUserInput) => {
    startTransition(() => formAction(data));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), watch, setValue, errors, state, isPending };
}
