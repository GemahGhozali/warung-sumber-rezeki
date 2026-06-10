"use client";

import ImagePreview from "@/component/image-preview";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useUploadImage } from "@/hooks/useUploadImage";

interface ImageUploaderProps {
  fieldName: string;
  label: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  imagePlaceholder: string;
  initialImageUrl?: string;
  error?: string;
}

export default function ImageUploader({ watch, setValue, fieldName, label, error, imagePlaceholder, initialImageUrl }: ImageUploaderProps) {
  const { previewSource, fileInputRef, uploadImage, changeImage, removeImage } = useUploadImage({ watch, setValue, initialImageUrl, fieldName });

  const renderImage = () => {
    const className = "border border-neutral-300 rounded-full size-[85px]";
    if (!previewSource) return <img src={imagePlaceholder} className={className} />;
    return <ImagePreview fileOrUrl={previewSource} className={className} />;
  };

  const renderButton = () => {
    if (!previewSource) {
      return (
        <button type="button" onClick={uploadImage} className="bg-teal-600 p-1.5 px-3 text-white text-sm rounded-lg font-medium cursor-pointer mt-2 w-fit">
          Upload
        </button>
      );
    }

    return (
      <div className="flex gap-2 mt-2">
        <button type="button" onClick={uploadImage} className="bg-teal-600 p-1.5 px-3 text-white text-sm rounded-lg font-medium cursor-pointer">
          Ganti
        </button>
        <button type="button" onClick={removeImage} className="bg-red-600 p-1.5 px-3 text-white text-sm rounded-lg font-medium cursor-pointer">
          Hapus
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label className="block font-semibold">{label}</label>
      <div className="flex gap-4 items-center p-3 border border-neutral-300 rounded-xl">
        <input type="file" id="image-input" accept="image/jpeg, image/jpg, image/png, image/webp" ref={fileInputRef} onChange={changeImage} className="hidden" />
        {renderImage()}
        <div className="flex flex-col">
          <p className="font-semibold text-sm">Ketentuan Foto :</p>
          <p className="text-sm text-neutral-500">Format JPEG, JPG, PNG, WEBP (2 MB)</p>
          {renderButton()}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
