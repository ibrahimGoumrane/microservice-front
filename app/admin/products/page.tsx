import { getAllProductsPaginated } from "@/lib/network/api/products";
import { HeaderWrapper } from "@/components/header-wrapper";
import GetAllProductsServer from "./_components/getAll";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const search = params.search || "";

  const response = await getAllProductsPaginated(page, limit, search);
  const pagination  = response.metadata?.pagination ? response.metadata.pagination : {
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 0,
  };
  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <div className="p-8">
        <GetAllProductsServer products={response.data} pagination={pagination} />
      </div>
    </div>
  );
}
