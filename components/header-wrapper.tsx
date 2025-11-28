import { Header } from "./header";
import { getCurrentUser, isAuthenticated } from "@/lib/network/api/auth";
import { getCart } from "@/lib/network/api/cart";

export async function HeaderWrapper() {
  let user = null;
  let cartCount = 0;
  let authenticated = false;

  try {
    authenticated = await isAuthenticated();

    if (authenticated) {
      user = await getCurrentUser();

      if (user?.id) {
        const cart = await getCart(user.id);
        cartCount = cart.itemCount || 0;
      }
    }
  } catch (error) {
    console.error("Failed to load user data:", error);
  }

  return (
    <Header user={user} cartCount={cartCount} isAuthenticated={authenticated} />
  );
}
