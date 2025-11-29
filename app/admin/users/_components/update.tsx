"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editUtilisateur } from "@/lib/actions/user";
import {
  utilisateurUpdateSchema,
  utilisateurUpdateRenderedFields,
} from "@/lib/schema/user";
import { User } from "@/lib/types/main";
import { toast } from "sonner";


interface UpdateUserFormProps {
  utilisateurData: User;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateUserForm = ({
  utilisateurData,
  open,
  setIsOpen,
}: UpdateUserFormProps) => {
  const initialValues = {
    idutilisateur: utilisateurData.id.toString(), // Using 'id' from User type
    nomutilisateur: utilisateurData.name,
    emailutilisateur: utilisateurData.email,
  };

  const updatedUtilisateurFields = utilisateurUpdateRenderedFields; // No mapping needed for entreprise or license now
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier l'Utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'utilisateur et enregistrez les
            modifications.
            <span className="text-muted-foreground dark:text-gray-400">
              Veuillez vous assurer que tous les champs sont correctement
              remplis.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={editUtilisateur}
          schema={utilisateurUpdateSchema}
          fields={updatedUtilisateurFields}
          submitText="Mettre à jour l'Utilisateur"
          loadingText="Mise à jour en cours..."
          onSuccessToast={(message) => {
            toast.success(message || "Utilisateur mis à jour avec succès");
            if (setIsOpen) {
              setIsOpen(false);
            }
          }}
          onErrorToast={(error) => {
            toast.error(
              error || "Erreur lors de la mise à jour de l'utilisateur"
            );
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserForm;


