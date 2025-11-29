"use server";

import {
  utilisateurCreateSchema,
  utilisateurDeleteSchema,
  utilisateurUpdateSchema,
} from "../schema/user";
import { State } from "../schema/base";
import { createApiResource } from "../network/utils/base";
import { CreateUserDTO, UpdateUserDTO, User } from "../types/main";

export const utilisateurApiResource = createApiResource<
  User,
  CreateUserDTO,
  UpdateUserDTO
>("api/v1/users");

export const addUtilisateur = async (
  prevState: State,
  newUtilisateur: FormData,
  revalidatePaths: string[] = ["/admin/utilisateurs"]
) => {
  return utilisateurApiResource.createAction(
    prevState,
    newUtilisateur,
    utilisateurCreateSchema,
    true,
    revalidatePaths
  );
};

export const editUtilisateur = async (
  prevState: State,
  updatedUtilisateur: FormData,
  revalidatePaths: string[] = [
    "/admin/utilisateurs",
    `/admin/utilisateurs/${updatedUtilisateur.get("idutilisateur")}`,
  ]
) => {
  return utilisateurApiResource.updateAction(
    prevState,
    updatedUtilisateur,
    utilisateurUpdateSchema,
    true,
    revalidatePaths,
    "idutilisateur"
  );
};

export const deleteUtilisateur = async (
  prevState: State,
  formData: FormData,
  revalidatePaths: string[] = ["/admin/utilisateurs"]
) => {
  return await utilisateurApiResource.deleteAction(
    prevState,
    formData,
    utilisateurDeleteSchema,
    revalidatePaths,
    "idutilisateur"
  );
};
