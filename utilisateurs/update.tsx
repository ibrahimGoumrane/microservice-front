"use client";

import BaseForm from "@/components/base/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editUtilisateur } from "@/lib/actions/utilisateurActions";
import {
  utilisateurUpdateSchema,
  utilisateurUpdateRenderedFields,
} from "@/lib/schemas/utilisateurSchema";
import { FieldConfig } from "@/lib/schemas/base";
import { Utilisateur } from "@/lib/types/utilisateurTypes";
import { Entreprise } from "@/lib/types/entrepriseTypes";
import { License } from "@/lib/types/licenseTypes";
import { toast } from "sonner";

interface FormProps {
  utilisateurData: Utilisateur;
  entreprises: Entreprise[];
  licenses: License[];
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateUserForm = ({
  utilisateurData,
  entreprises,
  licenses,
  open,
  setIsOpen,
}: FormProps) => {
  const initialValues = {
    idutilisateur: utilisateurData.idutilisateur.toString(),
    nomutilisateur: utilisateurData.nomutilisateur,
    emailutilisateur: utilisateurData.emailutilisateur,
    identreprise: utilisateurData.entreprise?.identreprise?.toString() || "",
    idlicense: utilisateurData.license?.idlicense?.toString() || "",
  };

  const updatedUtilisateurFields: FieldConfig[] =
    utilisateurUpdateRenderedFields.map((field) => {
      if (
        utilisateurData.roleutilisateur !== "admin" &&
        utilisateurData.roleutilisateur !== "analyste"
      ) {
        if (field.name === "identreprise" && field.type === "select") {
          return {
            ...field,
            options: [
              ...entreprises.map((entreprise) => ({
                value: entreprise.identreprise.toString(),
                label: entreprise.nomentreprise,
              })),
            ],
          };
        }
        if (field.name === "idlicense" && field.type === "select") {
          return {
            ...field,
            options: [
              ...licenses.map((license) => ({
                value: license.idlicense.toString(),
                label: license.licensekey,
              })),
            ],
          };
        }
      } else {
        if (field.name === "identreprise" && field.type === "select") {
          return {
            ...field,
            type: "hidden",
          };
        }
        if (field.name === "idlicense" && field.type === "select") {
          return {
            ...field,
            type: "hidden",
          };
        }
      }
      return field;
    });

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
