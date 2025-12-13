import { getCurrentUser } from "@/lib/network/api/auth";
import { getCart } from "@/lib/network/api/cart";
import { Header } from "./header";

export async function HeaderWrapper() {
  let user = await getCurrentUser();
  let cartCount = 0;
  let authenticated = !!(user);

  if (user?.id) {
    const cart = await getCart(user.id);
    cartCount = cart?.itemCount || 0;
  }


  return (
    <Header user={user} cartCount={cartCount} isAuthenticated={authenticated} />
  );
}
