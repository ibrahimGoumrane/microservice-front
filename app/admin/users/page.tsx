import { getAllUsers } from "@/lib/network/api/users";
import { HeaderWrapper } from "@/components/header-wrapper";
import { AdminUsersClient } from "./_components/admin-users-client";

export default async function AdminUsersPage() {
  const users = await getAllUsers();
  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <AdminUsersClient users={users.data} />
    </div>
  );
}
