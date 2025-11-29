"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateProductAction } from "@/lib/actions/products";
import { updateProductRenderedFields, updateProductSchema } from "@/lib/schema/product";
import { Product } from "@/lib/types/main";
import { toast } from "sonner";

interface UpdateProductProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  productData: Product;
}

export default function UpdateProduct({ open, setIsOpen, productData }: UpdateProductProps) {
    const initialValues = {
        id: productData.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        stockQuantity: productData.stockQuantity,
        active: productData.active ? "true" : "false", // Convert boolean to string for radio field
        rating: productData.rating,
    };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Update the product details below.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
            initialState={{ success: false, errors: {} }}
            action={updateProductAction}
            schema={updateProductSchema}
            fields={updateProductRenderedFields}
            submitText="Update Product"
            loadingText="Updating..."
            onSuccessToast={(message) => {
                toast.success(message || "Product updated successfully");
                setIsOpen(false);
            }}
            onErrorToast={(error) => {
                toast.error(error || "Error updating product");
            }}
            defaultValues={initialValues as any}
        />
      </DialogContent>
    </Dialog>
  );
}
