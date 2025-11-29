"use client";

import type React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PaginationMeta } from "@/lib/types/subTypes/commonTypes";

// Generic column definition
export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

// Server data table props
export interface ServerDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationMeta;
  searchPlaceholder?: string;
  emptyMessage?: string | React.ReactNode;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function ServerDataTable<T extends Record<string, any>>({
  data,
  columns,
  pagination,
  searchPlaceholder = "Search...",
  emptyMessage = "No data available",
  className,
  onRowClick,
}: ServerDataTableProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentPage = pagination.page;
  const currentPageSize = pagination.pageSize;

  // Calculate derived pagination values
  const hasNextPage = pagination.page < pagination.totalPages;
  const hasPreviousPage = pagination.page > 1;
  const startItem = (currentPage - 1) * currentPageSize + 1;
  const endItem = Math.min(currentPage * currentPageSize, pagination.totalItems);

  const updateURL = (params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    });

    router.push(`?${newSearchParams.toString()}`);
  };

  const handleSearch = (value: string) => {
    updateURL({ search: value || null, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
  };

  const handlePageSizeChange = (limit: string) => {
    updateURL({ limit, page: 1 });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-10"
          defaultValue={currentSearch}
          onChange={(e) => {
            const value = e.target.value;
            // Clear existing timeout
            if ((window as any).searchTimeout) {
              clearTimeout((window as any).searchTimeout);
            }
            // Set new timeout
            (window as any).searchTimeout = setTimeout(() => {
              handleSearch(value);
            }, 500);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if ((window as any).searchTimeout) {
                clearTimeout((window as any).searchTimeout);
              }
              handleSearch(e.currentTarget.value);
            }
          }}
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className={
                    onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
                  }
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={column.className}
                    >
                      {column.cell
                        ? column.cell(item)
                        : String(item[column.key as keyof T] || "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalItems > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Showing {startItem} to {endItem} of {pagination.totalItems} results
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Rows per page</p>
              <Select
                value={String(currentPageSize)}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    let pageNumber;
                    if (pagination.totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= pagination.totalPages - 2) {
                      pageNumber = pagination.totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={
                          currentPage === pageNumber ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
