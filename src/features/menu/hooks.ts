import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMenuAction, editMenuAction } from "./actions";
import { MenuSchema, MenuInput, MenuFormInput } from "./schemas";

export function useCreateMenuForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuFormInput>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      name: "",
      price: 0,
      hpp: 0,
      categoryId: "",
      image: null,
    },
  });

  const [state, formAction, isPending] = useActionState(createMenuAction, null);

  const onSubmitForm = (data: MenuFormInput) => {
    startTransition(() => formAction(data as MenuInput));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), watch, setValue, errors, state, isPending };
}

export function useEditMenuForm({ menuData }: { menuData: MenuInput }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuFormInput>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      id: menuData.id,
      name: menuData.name,
      price: menuData.price,
      hpp: menuData.hpp,
      categoryId: menuData.categoryId ?? "",
      image: menuData.image,
    },
  });

  const [state, formAction, isPending] = useActionState(editMenuAction, null);

  const onSubmitForm = (data: MenuFormInput) => {
    startTransition(() => formAction(data as MenuInput));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), watch, setValue, errors, state, isPending };
}
