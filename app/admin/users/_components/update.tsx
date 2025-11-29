"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Utilisateur } from "@/lib/types/main";

interface FormProps {
  utilisateurData: Utilisateur;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateUserForm = ({
  open,
  setIsOpen,
}: FormProps) => {
  
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier l'Utilisateur</DialogTitle>
          <DialogDescription>
            This functionality is not available at the moment.
          </DialogDescription>
        </DialogHeader>
        <div>
            Modification of users is disabled because license and entreprise management is not yet implemented.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserForm;

