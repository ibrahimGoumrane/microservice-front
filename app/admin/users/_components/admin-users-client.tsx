"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import type { User } from "@/lib/types/main";

interface AdminUsersClientProps {
  users: User[];
}

export function AdminUsersClient({ users }: AdminUsersClientProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.push("/admin")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-2 text-muted-foreground">
          {users.length} registered users
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {u.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          u.roles === "ROLE_ADMIN" ? "default" : "secondary"
                        }
                      >
                        {u.roles}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {u.id}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
