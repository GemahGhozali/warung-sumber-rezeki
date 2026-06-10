"use client";

import { useState, useEffect } from "react";

interface ImagePreviewProps {
  fileOrUrl: File | string | null;
  className?: string;
}

export default function ImagePreview({ fileOrUrl, className }: ImagePreviewProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!fileOrUrl) return setPreviewSrc(null);

    if (typeof fileOrUrl === "string") return setPreviewSrc(fileOrUrl);

    const objectUrl = URL.createObjectURL(fileOrUrl);
    setPreviewSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [fileOrUrl]);

  if (!previewSrc) return null;

  return <img src={previewSrc} alt="Image Preview" className={`object-cover ${className}`} />;
}
