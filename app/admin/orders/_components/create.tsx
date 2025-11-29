"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function CreateOrder() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>
            This is a placeholder for the create order form.
          </DialogDescription>
        </DialogHeader>
        <p>Create order form will be here.</p>
      </DialogContent>
    </Dialog>
  );
}
