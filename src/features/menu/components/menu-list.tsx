"use client";

import MenuCard from "./menu-card";
import DeleteConfirmationModal from "@/component/delete-confirmation-modal";
import { Box } from "@solar-icons/react-perf/BoldDuotone";
import { ModalHandle } from "@/component/modal";
import { MenuCatalog, MenuCatalogItem } from "../types";
import { deleteMenuAction } from "../actions";
import { startTransition, useRef, useState } from "react";

interface MenuListProps {
  menus: MenuCatalog;
}

type MenuState = Pick<MenuCatalogItem, "id" | "name">;

export default function MenuList({ menus }: MenuListProps) {
  if (menus.length === 0) {
    return (
      <div className="p-4 grow overflow-y-auto scrollbar-hidden flex flex-col justify-center items-center">
        <div className="bg-teal-100/60 size-[60px] rounded-full grid place-content-center mb-3">
          <Box size={32} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Belum ada menu apapun</h6>
        <p className="text-neutral-500 text-sm">Silahkan tambahkan menu</p>
      </div>
    );
  }

  const deleteModalRef = useRef<ModalHandle>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuState | null>(null);

  const handleCloseDeleteModal = () => {
    setSelectedMenu(null);
    deleteModalRef.current?.closeModal();
  };

  const handleOpenDeleteModal = (menu: MenuState) => {
    setSelectedMenu(menu);
    deleteModalRef.current?.openModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedMenu) return;

    startTransition(async () => {
      await deleteMenuAction(selectedMenu.id);
      deleteModalRef.current?.closeModal();
      setSelectedMenu(null);
    });
  };

  return (
    <>
      <ul className="pb-4 space-y-4">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            onDelete={() =>
              handleOpenDeleteModal({
                id: menu.id,
                name: menu.name,
              })
            }
          />
        ))}
      </ul>
      <DeleteConfirmationModal ref={deleteModalRef} onClose={handleCloseDeleteModal} onDelete={handleConfirmDelete}>
        Menu dengan nama <span className="font-semibold">{selectedMenu?.name}</span> akan dihapus secara permananen!
      </DeleteConfirmationModal>
    </>
  );
}
