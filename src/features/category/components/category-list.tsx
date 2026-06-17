"use client";

import { deleteCategoryAction } from "../actions";
import { startTransition, useRef, useState } from "react";
import { Tag } from "@solar-icons/react-perf/BoldDuotone";
import { CategoryCatalog, CategoryCatalogItem } from "../types";
import { ModalHandle } from "@/component/modal";
import CategoryCard from "./category-card";
import DeleteConfirmationModal from "@/component/delete-confirmation-modal";

interface CategoryListProps {
  categories: CategoryCatalog;
}

type CategoryState = Pick<CategoryCatalogItem, "id" | "name">;

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="p-4 grow overflow-y-auto scrollbar-hidden flex flex-col justify-center items-center">
        <div className="bg-teal-100/60 size-[60px] rounded-full grid place-content-center mb-3">
          <Tag size={32} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Belum ada kategori menu apapun</h6>
        <p className="text-neutral-500 text-sm">Silahkan tambahkan kategori menu</p>
      </div>
    );
  }

  const deleteModalRef = useRef<ModalHandle>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryState | null>(null);

  const handleCloseDeleteModal = () => {
    setSelectedCategory(null);
    deleteModalRef.current?.closeModal();
  };

  const handleOpenDeleteModal = (category: CategoryState) => {
    setSelectedCategory(category);
    deleteModalRef.current?.openModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedCategory) return;

    startTransition(async () => {
      await deleteCategoryAction(selectedCategory.id);
      deleteModalRef.current?.closeModal();
      setSelectedCategory(null);
    });
  };

  return (
    <>
      <ul className="pb-4 space-y-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={() =>
              handleOpenDeleteModal({
                id: category.id,
                name: category.name,
              })
            }
          />
        ))}
      </ul>
      <DeleteConfirmationModal ref={deleteModalRef} onClose={handleCloseDeleteModal} onDelete={handleConfirmDelete}>
        Kategori dengan nama <span className="font-semibold">{selectedCategory?.name}</span> akan dihapus secara permananen!
      </DeleteConfirmationModal>
    </>
  );
}
