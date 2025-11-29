"use client";
import BaseForm from "@/components/base/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addUtilisateur } from "@/lib/actions/utilisateurActions";
import { FieldConfig } from "@/lib/schemas/base";
import {
  utilisateurCreateRenderedFields,
  utilisateurCreateSchema,
} from "@/lib/schemas/utilisateurSchema";
import { Entreprise } from "@/lib/types/entrepriseTypes";
import { License } from "@/lib/types/licenseTypes";
import React, { useState } from "react";
import { toast } from "sonner";

interface FormProps {
  children: React.ReactNode;
  entreprises: Entreprise[];
  licenses: License[];
}

const CreateThemeForm = ({ children, entreprises, licenses }: FormProps) => {
  const [open, setOpen] = useState(false);
  const updatedCreationRenderedFields: FieldConfig[] =
    utilisateurCreateRenderedFields.map((field) => {
      if (field.name === "identreprise") {
        return {
          ...field,
          options: [
            ...entreprises.map((entreprise) => ({
              value: entreprise.identreprise.toString(),
              label: entreprise.nomentreprise,
            })),
          ],
        };
      } else if (field.name === "idlicense") {
        return {
          ...field,
          options: [
            ...licenses.map((license) => ({
              value: license.idlicense.toString(),
              label: `License ${license.debutlicense} - ${license.finlicense} (${license.typelicense})`,
            })),
          ],
        };
      }
      return field;
    });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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

export default CreateThemeForm;
