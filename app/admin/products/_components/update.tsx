"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpdateProductProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function UpdateProduct({ open, setIsOpen }: UpdateProductProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            This is a placeholder for the update product form.
          </DialogDescription>
        </DialogHeader>
        <p>Update product form will be here.</p>
      </DialogContent>
    </Dialog>
  );
}
