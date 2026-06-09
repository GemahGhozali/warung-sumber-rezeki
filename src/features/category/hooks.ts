import { useForm } from "react-hook-form";
import { useActionState, startTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema, CategoryInput } from "./schemas";
import { createCategoryAction, editCategoryAction } from "./actions";

export function useCreateCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      information: "",
    },
  });

  const [state, formAction, isPending] = useActionState(createCategoryAction, null);

  const onSubmitForm = (data: CategoryInput) => {
    startTransition(() => formAction(data));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}

export function useEditCategoryForm({ categoryData }: { categoryData: CategoryInput }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      id: categoryData.id,
      name: categoryData.name,
      information: categoryData.information,
    },
  });

  const [state, formAction, isPending] = useActionState(editCategoryAction, null);

  const onSubmitForm = (data: CategoryInput) => {
    startTransition(() => formAction(data));
  };

  return { register, handleSubmit: handleSubmit(onSubmitForm), errors, state, isPending };
}
