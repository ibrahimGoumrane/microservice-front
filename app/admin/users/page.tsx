import { getAllUsers } from "@/lib/network/api/users"
import { AdminUsersClient } from "./_components/admin-users-client"

export default async function AdminUsersPage() {
  const users = await getAllUsers()

  return <AdminUsersClient users={users} />
}
