import { CheckoutForm } from "./_components/checkout-form";
import { HeaderWrapper } from "@/components/header-wrapper";
import { getCart } from "@/lib/network/api/cart";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/network/api/auth";

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  const cartData = await getCart(user.id);

  if (!cartData || cartData.items.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <CheckoutForm cart={cartData.items} cartTotal={cartData.total} />
    </div>
  );
}
