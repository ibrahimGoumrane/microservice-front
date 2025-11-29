"use client";

import BaseForm from "@/components/base/form/base-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUtilisateur } from "@/lib/actions/utilisateurActions";
import {
  utilisateurDeleteSchema,
  deleteUtilisateurRenderedFields,
} from "@/lib/schemas/utilisateurSchema";
import { toast } from "sonner";

interface DeleteProps {
  id: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  isDeleted?: boolean;
}

const DeleteUtilisateur = ({
  id,
  open,
  setIsOpen,
  isDeleted = false,
}: DeleteProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isDeleted
              ? "Êtes-vous sûr de vouloir restaurer cet utilisateur ?"
              : "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isDeleted
              ? "Cette action restaurera l'utilisateur et le rendra à nouveau accessible."
              : "Cette action est irréversible. Cela supprimera définitivement l'utilisateur et retirera ses données de nos serveurs."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            className=""
            action={deleteUtilisateur}
            schema={utilisateurDeleteSchema}
            fields={deleteUtilisateurRenderedFields}
            defaultValues={{ idutilisateur: id.toString() }}
            actionType="delete"
            onSuccessToast={(message) => {
              const defaultMessage = isDeleted
                ? "Utilisateur restauré avec succès"
                : "Utilisateur supprimé avec succès";
              toast.success(message || defaultMessage);
              setIsOpen(false);
            }}
            onErrorToast={(error) => {
              const defaultError = isDeleted
                ? "Une erreur s'est produite lors de la restauration de l'utilisateur."
                : "Une erreur s'est produite lors de la suppression de l'utilisateur.";
              toast.error(error || defaultError);
            }}
            submitText={
              <Button
                className={
                  isDeleted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
                type="submit"
                variant={isDeleted ? "default" : "destructive"}
              >
                {isDeleted ? "Restaurer" : "Supprimer"}
              </Button>
            }
            loadingText={
              <Button
                className={
                  isDeleted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
                disabled
                variant={isDeleted ? "default" : "destructive"}
              >
                {isDeleted ? "Restauration..." : "Suppression..."}
              </Button>
            }
            cancelText={
              <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
                Annuler
              </AlertDialogCancel>
            }
            handleCancel={() => setIsOpen(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUtilisateur;
