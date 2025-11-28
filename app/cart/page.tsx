import { getCart } from "@/lib/network/api/cart";
import { getCurrentUser } from "@/lib/network/api/auth";
import { CartPageClient } from "./_components/cart-page-client";
import { HeaderWrapper } from "@/components/header-wrapper";
import { CartResponse } from "@/lib/types/main";

export default async function CartPage() {
  const currentUser = await getCurrentUser();
  const authenticated = !!currentUser;
  const cartData = authenticated
    ? await getCart(currentUser.id)
    : { items: [], total: 0, itemCount: 0 };

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <CartPageClient
        cart={cartData as CartResponse}
        isAuthenticated={authenticated}
      />
    </div>
  );
}
