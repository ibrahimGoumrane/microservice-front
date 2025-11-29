"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateOrderStatusAction } from "@/lib/actions/orders";
import { updateOrderRenderedFields, updateOrderSchema } from "@/lib/schema/order";
import { Order } from "@/lib/types/main";
import { toast } from "sonner";

interface UpdateOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  orderData: Order;
}

export default function UpdateOrder({ open, setIsOpen, orderData }: UpdateOrderProps) {
    const initialValues = {
        id: orderData.id,
        status: orderData.status,
    };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Order</DialogTitle>
          <DialogDescription>
            Update the order details below.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
            initialState={{ success: false, errors: {} }}
            action={updateOrderStatusAction}
            schema={updateOrderSchema}
            fields={updateOrderRenderedFields}
            submitText="Update Order"
            loadingText="Updating..."
            onSuccessToast={(message) => {
                toast.success(message || "Order updated successfully");
                setIsOpen(false);
            }}
            onErrorToast={(error) => {
                toast.error(error || "Error updating order");
            }}
            defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}
