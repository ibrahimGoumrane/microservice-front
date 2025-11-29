"use client";

import BaseForm from "@/components/form/base-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "@/lib/actions/products";
import { deleteProductRenderedFields, deleteProductSchema } from "@/lib/schema/product";
import { toast } from "sonner";

interface DeleteProductProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  productId: number;
}

export default function DeleteProduct({ open, setIsOpen, productId }: DeleteProductProps) {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            action={deleteProductAction}
            schema={deleteProductSchema}
            fields={deleteProductRenderedFields}
            defaultValues={{ id: productId }}
            actionType="delete"
            onSuccessToast={(message) => {
              toast.success(message || "Product deleted successfully");
              setIsOpen(false);
            }}
            onErrorToast={(error) => {
              toast.error(error || "Error deleting product");
            }}
            submitText={
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            }
            loadingText={
              <Button disabled variant="destructive">
                Deleting...
              </Button>
            }
            cancelText={
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            }
            handleCancel={() => setIsOpen(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
