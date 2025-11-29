"use client";

import CreateUtilisateurForm from "./create";
import DeleteUtilisateur from "./delete";
import UpdateUtilisateurForm from "./update";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnDef, ServerDataTable } from "@/components/ui/server-data-table";
import type { User as Utilisateur } from "@/lib/types/main";
import { PaginationMeta } from "@/lib/types/subTypes/commonTypes";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Pencil, Trash2, User, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface GetAllUtilisateursServerProps {
  utilisateurs: Utilisateur[];
  pagination: PaginationMeta;
}

export default function GetAllUtilisateursServer({
  utilisateurs,
  pagination,
}: GetAllUtilisateursServerProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUtilisateur, setSelectedUtilisateur] =
    useState<Utilisateur | null>(null);

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
      key: "id",
      header: "ID",
      className: "font-medium",
    },
    {
      key: "name",
      header: "Nom",
      cell: (utilisateur) => (
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4 text-gray-500" />
          <span className="font-medium">{utilisateur.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "roles",
      header: "Rôle",
      cell: (utilisateur) => (
        <Badge
          variant="outline"
          className={
            utilisateur.roles === "ROLE_ADMIN"
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }
        >
          {utilisateur.roles === "ROLE_ADMIN" && (
            <Crown className="mr-1 h-3 w-3" />
          )}
          {/* For the base User type, roles is an array of strings. We need to join them. */}
          {Array.isArray(utilisateur.roles) ? utilisateur.roles.join(', ') : utilisateur.roles}
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
            title={"Delete user"}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
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
          <CreateUtilisateurForm />
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
                        (u) => Array.isArray(u.roles) ? u.roles.includes("ROLE_ADMIN") : u.roles === "ROLE_ADMIN"
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
              {pagination.totalItems} utilisateur{pagination.totalItems > 1 ? "s" : ""} au
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
            setIsOpen={setEditModalOpen}
          />
          <DeleteUtilisateur
            id={selectedUtilisateur.id.toString()}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            isDeleted={false}
          />
        </>
      )}
    </>
  );
}
