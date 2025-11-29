"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GetOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function GetOrder({ open, setIsOpen }: GetOrderProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            This is a placeholder for displaying order details.
          </DialogDescription>
        </DialogHeader>
        <p>Order details will be here.</p>
      </DialogContent>
    </Dialog>
  );
}
