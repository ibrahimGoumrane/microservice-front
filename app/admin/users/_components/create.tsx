"use client";
import BaseForm from "@/components/form/base-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addUtilisateur } from "@/lib/actions/user";
import {
  utilisateurCreateRenderedFields,
  utilisateurCreateSchema,
} from "@/lib/schema/user";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


const CreateUserForm = () => {
  const [open, setOpen] = useState(false);
  const updatedCreationRenderedFields = utilisateurCreateRenderedFields; // No mapping needed for entreprise or license now
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un Utilisateur</DialogTitle>
          <DialogDescription>
            Remplissez les détails pour créer un nouvel utilisateur.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          defaultValues={{
            roleutilisateur: "subscriber",
            status: "active",
          }}
          className=" "
          action={addUtilisateur}
          schema={utilisateurCreateSchema}
          fields={updatedCreationRenderedFields}
          submitText="Créer l'Utilisateur"
          loadingText="Création en cours..."
          onSuccessToast={(message) => {
            toast.success(message || "Utilisateur créé avec succès");
            setOpen(false);
          }}
          onErrorToast={(error) => {
            toast.error(error || "Erreur lors de la création de l'utilisateur");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserForm;

