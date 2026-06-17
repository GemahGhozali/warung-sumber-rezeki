"use client";

import UserCard from "./user-card";
import DeleteConfirmationModal from "@/component/delete-confirmation-modal";
import { ModalHandle } from "@/component/modal";
import { UserRounded } from "@solar-icons/react-perf/BoldDuotone";
import { deleteUserAction } from "../actions";
import { startTransition, useRef, useState } from "react";
import { UserCatalog, UserCatalogItem } from "../types";

interface UserListProps {
  users: UserCatalog;
}

type UserState = Pick<UserCatalogItem, "id" | "name">;

export default function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="grow flex flex-col justify-center items-center">
        <div className="bg-teal-100/60 size-[60px] rounded-full flex justify-center items-end mb-3">
          <UserRounded size={48} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Belum ada akun apapun</h6>
        <p className="text-neutral-500 text-sm">Silahkan tambahkan akun pengguna</p>
      </div>
    );
  }

  const deleteModalRef = useRef<ModalHandle>(null);
  const [selectedUser, setSelectedUser] = useState<UserState | null>(null);

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    deleteModalRef.current?.closeModal();
  };

  const handleOpenDeleteModal = (user: UserState) => {
    setSelectedUser(user);
    deleteModalRef.current?.openModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;

    startTransition(async () => {
      await deleteUserAction(selectedUser.id);
      deleteModalRef.current?.closeModal();
      setSelectedUser(null);
    });
  };

  return (
    <>
      <ul className="pb-4 space-y-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() =>
              handleOpenDeleteModal({
                id: user.id,
                name: user.name,
              })
            }
          />
        ))}
      </ul>
      <DeleteConfirmationModal ref={deleteModalRef} onClose={handleCloseDeleteModal} onDelete={handleConfirmDelete}>
        Pengguna dengan nama <span className="font-semibold">{selectedUser?.name}</span> akan dihapus secara permananen!
      </DeleteConfirmationModal>
    </>
  );
}
