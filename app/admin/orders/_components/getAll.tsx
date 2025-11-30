"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Eye,
  ClipboardList,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ServerDataTable,
  type ColumnDef,
} from "@/components/ui/server-data-table";
// import CreateOrder from "./create";
import UpdateOrder from "./update";
import DeleteOrder from "./delete";
import type { Order } from "@/lib/types/main";
import { useState } from "react";
import { PaginationMeta } from "@/lib/types/subTypes/commonTypes";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface GetAllOrdersServerProps {
  orders: Order[];
  pagination: PaginationMeta;
}

const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-600 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
  };

export default function GetAllOrdersServer({
  orders,
  pagination,
}: GetAllOrdersServerProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    null
  );

  const handleEditClick = (order: Order) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedOrder(order);
  };

  const handleDeleteClick = (order: Order) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedOrder(order);
  };

  const totalOrders = pagination.totalItems;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const stats = [
    {
        title: "Total Revenue",
        value: `$${totalRevenue.toFixed(2)}`,
        icon: DollarSign,
        change: "+12.5%",
        color: "text-chart-2",
        bgColor: "bg-chart-2/10",
      },
      {
        title: "Total Orders",
        value: totalOrders,
        icon: ShoppingCart,
        change: "+8.2%",
        color: "text-chart-1",
        bgColor: "bg-chart-1/10",
      },
  ];

  // Define columns for the server data table
  const columns: ColumnDef<Order>[] = [
    {
      key: "orderNumber",
      header: "Order ID",
      cell: (order) => (
        <span className="font-mono text-sm">{order.orderNumber}</span>
      ),
    },
    {
        key: "createdAt",
        header: "Date",
        cell: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
        key: "customer",
        header: "Customer",
        cell: (order) => order.shippingAddress?.fullName || "N/A",
    },
    {
        key: "items",
        header: "Items",
        cell: (order) => order.orderItems.length,
    },
    {
        key: "totalAmount",
        header: "Total",
        cell: (order) => `$${order.totalAmount.toFixed(2)}`,
        className: "text-right font-medium",
    },
    {
        key: "status",
        header: "Status",
        cell: (order) => (
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
        ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (order) => (
        <div className="flex justify-end space-x-2">
            <Link href={`/orders/${order.orderNumber}`}>
                <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                </Button>
            </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(order);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(order);
            }}
            title="Delete Order"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Management
              </h1>
              <p className="text-gray-600">
                Create and manage customer orders.
              </p>
            </div>
          </div>
          {/* <CreateOrder /> */}
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat) => (
            <motion.div variants={fadeInUp} key={stat.title}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Server Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="mr-2 h-5 w-5" />
              Order List
            </CardTitle>
            <CardDescription>
              {pagination.totalItems} order{pagination.totalItems > 1 ? "s" : ""} in
              total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServerDataTable
              data={orders}
              columns={columns}
              pagination={pagination}
              searchPlaceholder="Search for an order..."
              emptyMessage={
                <div className="text-center py-8">
                  <ClipboardList className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">
                    No orders found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </div>
              }
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      {selectedOrder && (
        <>
          <UpdateOrder
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
            orderData={selectedOrder}
          />
          <DeleteOrder
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            orderId={selectedOrder.id}
          />
        </>
      )}
    </>
  );
}
