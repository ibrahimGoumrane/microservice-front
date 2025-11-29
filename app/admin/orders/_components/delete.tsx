"use client";

import BaseForm from "@/components/form/base-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cancelOrderAction } from "@/lib/actions/orders";
import { deleteOrderRenderedFields, cancelOrderSchema } from "@/lib/schema/order";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  orderId: number;
}

export default function DeleteOrder({ open, setIsOpen, orderId }: DeleteOrderProps) {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will cancel the order. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            action={cancelOrderAction}
            schema={cancelOrderSchema}
            fields={deleteOrderRenderedFields}
            defaultValues={{ id: orderId }}
            actionType="delete"
            onSuccessToast={(message) => {
              toast.success(message || "Order cancelled successfully");
              setIsOpen(false);
            }}
            onErrorToast={(error) => {
              toast.error(error || "Error cancelling order");
            }}
            submitText={
              <Button type="submit" variant="destructive">
                Cancel Order
              </Button>
            }
            loadingText={
              <Button disabled variant="destructive">
                Cancelling...
              </Button>
            }
            cancelText={
              <AlertDialogCancel>Close</AlertDialogCancel>
            }
            handleCancel={() => setIsOpen(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
