"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { createProductAction } from "@/lib/actions/products";
import { createProductRenderedFields, createProductSchema } from "@/lib/schema/product";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CreateProduct() {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Fill in the product details below.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
            initialState={{ success: false, errors: {} }}
            action={createProductAction}
            schema={createProductSchema}
            fields={createProductRenderedFields}
            submitText="Create Product"
            loadingText="Creating..."
            onSuccessToast={(message) => {
                toast.success(message || "Product created successfully");
                setOpen(false);
            }}
            onErrorToast={(error) => {
                toast.error(error || "Error creating product");
            }}
        />
      </DialogContent>
    </Dialog>
  );
}
