"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GetProductProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function GetProduct({ open, setIsOpen }: GetProductProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            This is a placeholder for displaying product details.
          </DialogDescription>
        </DialogHeader>
        <p>Product details will be here.</p>
      </DialogContent>
    </Dialog>
  );
}
