import { getAllUsers } from "@/lib/network/api/users";
import { HeaderWrapper } from "@/components/header-wrapper";
import GetAllUtilisateursServer from "./_components/getAll";

export default async function AdminUsersPage({
    searchParams,
  }: {
    searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
  }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const search = params.search || "";
    const users = await getAllUsers(page, limit, search);
    const pagination = users.metadata?.pagination ? users.metadata.pagination : {
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0,
      };
    return (
      <div className="min-h-screen">
        <HeaderWrapper />
        <div className="p-8">
            <GetAllUtilisateursServer utilisateurs={users.data} pagination={pagination} />
        </div>
      </div>
    );
}
