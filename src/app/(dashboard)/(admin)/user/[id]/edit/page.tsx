import UserForm from "@/features/user/components/user-form";
import { getUserById } from "@/features/user/queries";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) throw new Error("Data kategori tidak ditemukan");

  return <UserForm user={user} />;
}
