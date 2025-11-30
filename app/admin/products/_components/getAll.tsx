"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ServerDataTable,
  type ColumnDef,
} from "@/components/ui/server-data-table";
import type { Product } from "@/lib/types/main";
import { PaginationMeta } from "@/lib/types/subTypes/commonTypes";
import { getImageUrl } from "@/lib/utils/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Pencil,
  Trash2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CreateProduct from "./create";
import DeleteProduct from "./delete";
import UpdateProduct from "./update";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface GetAllProductsServerProps {
  products: Product[];
  pagination: PaginationMeta;
}

export default function GetAllProductsServer({
  products,
  pagination,
}: GetAllProductsServerProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );

  const handleEditClick = (product: Product) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedProduct(product);
  };

  const handleDeleteClick = (product: Product) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedProduct(product);
  };

  const totalProducts = pagination.totalItems;
  const lowStockProducts = products.filter((p) => p.stockQuantity < 10).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      change: `${lowStockProducts} low stock`,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
  ];

  // Define columns for the server data table
  const columns: ColumnDef<Product>[] = [
    {
        key: "name",
        header: "Product",
        cell: (product) => (
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={getImageUrl(product.mainImage)}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium line-clamp-1">{product.name}</span>
          </div>
        ),
      },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "price",
      header: "Price",
      cell: (product) => `$${product.price.toFixed(2)}`,
    },
    {
      key: "stockQuantity",
      header: "Stock",
      cell: (product) => (
        <span
          className={
            product.stockQuantity < 10 ? "text-destructive font-medium" : ""
          }
        >
          {product.stockQuantity}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (product) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(product);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(product);
            }}
            title="Delete Product"
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
                Product Management
              </h1>
              <p className="text-gray-600">
                Create and manage system products.
              </p>
            </div>
          </div>
          <CreateProduct />
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
              <Package className="mr-2 h-5 w-5" />
              Product List
            </CardTitle>
            <CardDescription>
              {pagination.totalItems} product{pagination.totalItems > 1 ? "s" : ""} in
              total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServerDataTable
              data={products}
              columns={columns}
              pagination={pagination}
              searchPlaceholder="Search for a product..."
              emptyMessage={
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">
                    No products found
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
      {selectedProduct && (
        <>
          <UpdateProduct
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
            productData={selectedProduct}
          />
          <DeleteProduct
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            productId={selectedProduct.id}
          />
        </>
      )}
    </>
  );
}
