"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpdateOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function UpdateOrder({ open, setIsOpen }: UpdateOrderProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order</DialogTitle>
          <DialogDescription>
            This is a placeholder for the update order form.
          </DialogDescription>
        </DialogHeader>
        <p>Update order form will be here.</p>
      </DialogContent>
    </Dialog>
  );
}
