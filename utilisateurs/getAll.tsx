"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  User,
  Plus,
  Pencil,
  RotateCcw,
  Trash2,
  ArrowLeft,
  Shield,
  Crown,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ServerDataTable,
  type ColumnDef,
} from "@/components/ui/server-data-table";
import CreateUtilisateurForm from "./create";
import UpdateUtilisateurForm from "./update";
import DeleteUtilisateur from "./delete";
import type { Utilisateur } from "@/lib/types/utilisateurTypes";
import type { License } from "@/lib/types/licenseTypes";
import type { Entreprise } from "@/lib/types/entrepriseTypes";
import { useState } from "react";
import { PaginatedResponse } from "@/lib/types/subTypes/commonTypes";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface GetAllUtilisateursServerProps {
  response: PaginatedResponse<Utilisateur>;
  licenses: License[];
  entreprises: Entreprise[];
}

export default function GetAllUtilisateursServer({
  response,
  licenses,
  entreprises,
}: GetAllUtilisateursServerProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUtilisateur, setSelectedUtilisateur] =
    useState<Utilisateur | null>(null);

  const {
    data: utilisateurs,
    meta: { pagination },
  } = response;

  const handleEditClick = (utilisateur: Utilisateur) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedUtilisateur(utilisateur);
  };

  const handleDeleteClick = (utilisateur: Utilisateur) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedUtilisateur(utilisateur);
  };

  // Define columns for the server data table
  const columns: ColumnDef<Utilisateur>[] = [
    {
      key: "idutilisateur",
      header: "ID",
      className: "font-medium",
    },
    {
      key: "nomutilisateur",
      header: "Nom",
      cell: (utilisateur) => (
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4 text-gray-500" />
          <span className="font-medium">{utilisateur.nomutilisateur}</span>
        </div>
      ),
    },
    {
      key: "emailutilisateur",
      header: "Email",
    },
    {
      key: "roleutilisateur",
      header: "Rôle",
      cell: (utilisateur) => (
        <Badge
          variant="outline"
          className={
            utilisateur.roleutilisateur === "admin"
              ? "bg-red-100 text-red-700 border-red-300"
              : utilisateur.roleutilisateur === "analyste"
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }
        >
          {utilisateur.roleutilisateur === "admin" && (
            <Crown className="mr-1 h-3 w-3" />
          )}
          {utilisateur.roleutilisateur === "analyste" && (
            <Shield className="mr-1 h-3 w-3" />
          )}
          {utilisateur.roleutilisateur === "subscriber" && (
            <User className="mr-1 h-3 w-3" />
          )}
          {utilisateur.roleutilisateur}
        </Badge>
      ),
    },
    {
      key: "deleted_at",
      header: "Status",
      cell: (utilisateur) => (
        <Badge
          variant={!utilisateur.deleted_at ? "default" : "secondary"}
          className={
            !utilisateur.deleted_at
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        >
          {!utilisateur.deleted_at ? "Actif" : "Supprimé"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (utilisateur) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(utilisateur);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(utilisateur);
            }}
            title={
              utilisateur.deleted_at
                ? "Restaurer l'utilisateur"
                : "Supprimer l'utilisateur"
            }
          >
            {utilisateur.deleted_at ? (
              <RotateCcw className="w-4 h-4 text-green-500" />
            ) : (
              <Trash2 className="w-4 h-4 text-red-500" />
            )}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600">
                Créez et gérez les utilisateurs du système.
              </p>
            </div>
          </div>
          {licenses.length > 0 && entreprises.length > 0 ? (
            <CreateUtilisateurForm
              licenses={licenses}
              entreprises={entreprises}
            >
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Utilisateur
              </Button>
            </CreateUtilisateurForm>
          ) : (
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" />
              Créer des licences et entreprises d'abord
            </Button>
          )}
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Utilisateurs
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {utilisateurs.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Administrateurs
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {
                      utilisateurs.filter(
                        (u) => u.roleutilisateur === "admin" && !u.deleted_at
                      ).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Analystes</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {
                      utilisateurs.filter(
                        (u) => u.roleutilisateur === "analyste" && !u.deleted_at
                      ).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Utilisateurs Actifs
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {utilisateurs.filter((u) => !u.deleted_at).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Server Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Liste des Utilisateurs
            </CardTitle>
            <CardDescription>
              {pagination.total} utilisateur{pagination.total > 1 ? "s" : ""} au
              total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServerDataTable
              data={utilisateurs}
              columns={columns}
              pagination={pagination}
              searchPlaceholder="Rechercher un utilisateur..."
              emptyMessage={
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">
                    Aucun utilisateur trouvé
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              }
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      {selectedUtilisateur && (
        <>
          <UpdateUtilisateurForm
            utilisateurData={selectedUtilisateur}
            open={editModalOpen}
            licenses={licenses}
            entreprises={entreprises}
            setIsOpen={setEditModalOpen}
          />
          <DeleteUtilisateur
            id={selectedUtilisateur.idutilisateur.toString()}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            isDeleted={!!selectedUtilisateur.deleted_at}
          />
        </>
      )}
    </>
  );
}
