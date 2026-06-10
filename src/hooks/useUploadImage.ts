import { useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface UseImageUploadProps {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  fieldName: string;
  initialImageUrl?: string | null;
}

export function useUploadImage({ setValue, watch, fieldName, initialImageUrl }: UseImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentImageFile = watch(fieldName);
  const previewSource = currentImageFile || initialImageUrl;

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue(fieldName, file, { shouldValidate: true });
  };

  const uploadImage = () => fileInputRef.current?.click();

  const removeImage = () => {
    setValue(fieldName, null, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return { fileInputRef, previewSource, changeImage, uploadImage, removeImage };
}
