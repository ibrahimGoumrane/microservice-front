"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, MapPin, CreditCard } from "lucide-react";
import type { Order } from "@/lib/types/main";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

interface OrderDetailClientProps {
  order: Order;
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
  const router = useRouter();

  const shipping = order.totalAmount >= 50 ? 0 : 9.99;
  const tax = order.totalAmount * 0.08;
  const grandTotal = order.totalAmount + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-mono">{order.orderNumber}</h1>
          <p className="mt-2 text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`${
            statusColors[
              order.status.toLowerCase() as keyof typeof statusColors
            ] || statusColors.pending
          } text-sm px-4 py-1`}
        >
          {order.status}
        </Badge>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src="/placeholder.svg"
                      alt={`Product ${item.productId}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Product #{item.productId}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold">
                        $
                        {(item.subtotal || item.price * item.quantity).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p className="mt-1 text-muted-foreground">
                {order.shippingAddress.street}
              </p>
              <p className="text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>
              <p className="text-muted-foreground">
                {order.shippingAddress.country}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
