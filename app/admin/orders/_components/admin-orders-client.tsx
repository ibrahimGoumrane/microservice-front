"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Eye } from "lucide-react";
import type { Order } from "@/lib/types/main";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

interface AdminOrdersClientProps {
  orders: Order[];
}

export function AdminOrdersClient({ orders }: AdminOrdersClientProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.push("/admin")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="mt-2 text-muted-foreground">
          {orders.length} total orders
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {order.shippingAddress?.fullName || "N/A"}
                      </TableCell>
                      <TableCell>{order.orderItems.length}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${order.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            statusColors[
                              order.status.toLowerCase() as keyof typeof statusColors
                            ]
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/orders/${order.orderNumber}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No orders yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
