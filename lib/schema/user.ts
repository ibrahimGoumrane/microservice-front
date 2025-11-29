import { z } from "zod";
import { FieldConfig } from "./base";

// Define validation schema for user
export const utilisateurCreateSchema = z
  .object({
    nomutilisateur: z.string().min(1, "Nom d'utilisateur requis"),
    emailutilisateur: z.string().email("Email invalide").min(1, "Email requis"),
    passwordutilisateur: z.string().min(6, "Mot de passe requis"),
    password_confirmation: z
      .string()
      .min(6, "Confirmation du mot de passe requise"),
    roleutilisateur: z.enum(["admin", "analyste", "subscriber"]),
    status: z.enum(["active", "inactive"]),
  })
  .refine((data) => data.passwordutilisateur === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });
export const utilisateurUpdateSchema = z.object({
  nomutilisateur: z.string().min(1, "Nom d'utilisateur requis").optional(),
  emailutilisateur: z
    .string()
    .email("Email invalide")
    .min(1, "Email requis")
    .optional(),
});
export const authenticatedutilisateurUpdateSchema = z.object({
  nomutilisateur: z.string().min(1, "Nom d'utilisateur requis").optional(),
  emailutilisateur: z
    .string()
    .email("Email invalide")
    .min(1, "Email requis")
    .optional(),
});
export const utilisateurUpdatePasswordSchema = z
  .object({
    old_password: z.string().min(6, "Ancien mot de passe requis"),
    new_password: z.string().min(6, "Nouveau mot de passe requis"),
    new_password_confirmation: z
      .string()
      .min(6, "Confirmation du nouveau mot de passe requise"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["new_password_confirmation"],
  });
export const utilisateurDeleteSchema = z.object({
  idutilisateur: z
    .number()
    .int("ID utilisateur invalide")
    .positive("ID utilisateur requis"),
});


// Export Form Fields
export const utilisateurCreateRenderedFields: FieldConfig[] = [
  {
    name: "nomutilisateur",
    label: "Nom d'utilisateur",
    type: "text",
    placeholder: "Entrez le nom d'utilisateur",
    autoComplete: "username",
    required: true,
  },
  {
    name: "emailutilisateur",
    label: "Email",
    type: "email",
    placeholder: "Entrez l'email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "passwordutilisateur",
    label: "Mot de passe",
    type: "password",
    placeholder: "Entrez le mot de passe",
    autoComplete: "new-password",
    required: true,
  },
  {
    name: "password_confirmation",
    label: "Confirmation du mot de passe",
    type: "password",
    placeholder: "Confirmez le mot de passe",
    autoComplete: "new-password",
    required: true,
  },
  {
    name: "roleutilisateur",
    type: "hidden",
    defaultValue: "subscriber",
    required: true,
  },
  {
    name: "status",
    type: "hidden",
    defaultValue: "active",
    required: true,
  },
];
export const utilisateurUpdateRenderedFields: FieldConfig[] = [
  {
    name: "idutilisateur",
    type: "hidden",
    required: true,
  },
  {
    name: "nomutilisateur",
    label: "Nom d'utilisateur",
    type: "text",
    placeholder: "Entrez le nom d'utilisateur",
    autoComplete: "username",
    required: false,
  },
  {
    name: "emailutilisateur",
    label: "Email",
    type: "email",
    placeholder: "Entrez l'email",
    autoComplete: "email",
    required: false,
  },
];export const authenticatedUtilisateurUpdateRenderedFields: FieldConfig[] =
  utilisateurUpdateRenderedFields.filter(
    (field) => field.name !== "idutilisateur"
  );
export const utilisateurUpdatePasswordRenderedFields: FieldConfig[] = [
  {
    name: "old_password",
    label: "Ancien mot de passe",
    type: "password",
    placeholder: "Entrez l'ancien mot de passe",
    autoComplete: "current-password",
    required: true,
  },
  {
    name: "new_password",
    label: "Nouveau mot de passe",
    type: "password",
    placeholder: "Entrez le nouveau mot de passe",
    autoComplete: "new-password",
    required: true,
  },
  {
    name: "new_password_confirmation",
    label: "Confirmation du nouveau mot de passe",
    type: "password",
    placeholder: "Confirmez le nouveau mot de passe",
    autoComplete: "new-password",
    required: true,
  },
];
export const deleteUtilisateurRenderedFields: FieldConfig[] = [
  {
    name: "idutilisateur",
    type: "hidden",
    required: true,
  },
];
