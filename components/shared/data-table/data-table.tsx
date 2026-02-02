"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { DataTableSearch } from "./data-table-search";
import { DataTableDateFilter } from "./data-table-date-filter";
import {
  filterByDateRange,
  DateRange,
} from "@/lib/utils/table-utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  dateColumn?: keyof TData;
  showDateFilter?: boolean;
  showSearch?: boolean;
  isLoading?: boolean;
  // Columns to hide on mobile (< 640px)
  mobileHiddenColumns?: string[];
  // Columns to hide on tablet (< 1024px)
  tabletHiddenColumns?: string[];
  // Server-side pagination props
  serverSide?: boolean;
  totalRows?: number;
  page?: number;
  pageSize?: number;
  onSearchChange?: (search: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  // Server-side date filtering props
  dateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  dateColumn,
  showDateFilter = true,
  showSearch = true,
  isLoading = false,
  mobileHiddenColumns = [],
  tabletHiddenColumns = [],
  // Server-side props
  serverSide = false,
  totalRows = 0,
  page = 1,
  pageSize: serverPageSize = 10,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  // Server-side date filtering props
  dateRange: controlledDateRange,
  onDateRangeChange,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [localDateRange, setLocalDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [localPageSize, setLocalPageSize] = useState(serverPageSize);
  const [localPageIndex, setLocalPageIndex] = useState(0);

  // Use controlled date range if provided (server-side mode), otherwise use local state
  const isServerSideDateFilter = serverSide && !!onDateRangeChange;
  const dateRange = isServerSideDateFilter && controlledDateRange ? controlledDateRange : localDateRange;
  const setDateRange = isServerSideDateFilter ? onDateRangeChange! : setLocalDateRange;

  // Debounced search for server-side
  useEffect(() => {
    if (!serverSide || !onSearchChange) return;
    const timer = setTimeout(() => {
      onSearchChange(globalFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [globalFilter, serverSide, onSearchChange]);

  // Handle responsive column visibility
  useEffect(() => {
    const updateVisibility = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;

      const visibility: VisibilityState = {};

      // Hide mobile columns
      mobileHiddenColumns.forEach((col) => {
        visibility[col] = !isMobile;
      });

      // Hide tablet columns (only if not already hidden)
      tabletHiddenColumns.forEach((col) => {
        if (!mobileHiddenColumns.includes(col)) {
          visibility[col] = !isTablet;
        }
      });

      setColumnVisibility(visibility);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [mobileHiddenColumns, tabletHiddenColumns]);

  // Filter data by date range (only for client-side filtering)
  // Skip filtering when in server-side mode as the API handles filtering
  const filteredData = useMemo(() => {
    // In server-side mode with date range callback, API handles filtering
    if (isServerSideDateFilter) {
      return data;
    }
    if (!dateColumn || (!dateRange.from && !dateRange.to)) {
      return data;
    }
    return filterByDateRange(data, dateColumn, dateRange);
  }, [data, dateColumn, dateRange, isServerSideDateFilter]);

  // Reset page index when data changes (client-side only)
  useEffect(() => {
    if (!serverSide) {
      setLocalPageIndex(0);
    }
  }, [filteredData.length, serverSide]);

  // Calculate server-side pagination values
  const serverPageCount = serverSide ? Math.ceil(totalRows / localPageSize) : undefined;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns: columns as ColumnDef<TData, unknown>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: serverSide ? undefined : getPaginationRowModel(),
    getFilteredRowModel: serverSide ? undefined : getFilteredRowModel(),
    // Using "includes" preset for global filtering across all columns
    globalFilterFn: serverSide ? undefined : "includesString",
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: serverSide,
    manualFiltering: serverSide,
    pageCount: serverPageCount,
    state: {
      globalFilter: serverSide ? undefined : globalFilter,
      columnVisibility,
      pagination: serverSide
        ? { pageIndex: page - 1, pageSize: localPageSize }
        : { pageIndex: localPageIndex, pageSize: localPageSize },
    },
    onPaginationChange: serverSide
      ? undefined
      : (updater) => {
          const newState =
            typeof updater === "function"
              ? updater({ pageIndex: localPageIndex, pageSize: localPageSize })
              : updater;
          setLocalPageIndex(newState.pageIndex);
          setLocalPageSize(newState.pageSize);
        },
  });

  return (
    <div className="space-y-4">
      {/* Filters - responsive layout */}
      {(showSearch || showDateFilter) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {showSearch && (
              <DataTableSearch
                value={globalFilter}
                onChange={setGlobalFilter}
                placeholder={searchPlaceholder}
              />
            )}
            {showDateFilter && (dateColumn || isServerSideDateFilter) && (
              <DataTableDateFilter
                value={dateRange}
                onChange={setDateRange}
                placeholder="Filter by date"
              />
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {serverSide ? totalRows : table.getFilteredRowModel().rows.length} result(s)
          </div>
        </div>
      )}

      {/* Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls - responsive layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Page info - hidden on mobile */}
        <div className="hidden text-sm text-muted-foreground sm:block">
          Page {serverSide ? page : table.getState().pagination.pageIndex + 1} of{" "}
          {serverSide ? (serverPageCount || 1) : (table.getPageCount() || 1)}
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          {/* Mobile: simpler pagination */}
          <div className="flex items-center gap-1 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (serverSide && onPageChange) {
                  onPageChange(page - 1);
                } else {
                  table.previousPage();
                }
              }}
              disabled={serverSide ? page <= 1 : !table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <span className="px-2 text-sm text-muted-foreground">
              {serverSide ? page : table.getState().pagination.pageIndex + 1}/
              {serverSide ? (serverPageCount || 1) : (table.getPageCount() || 1)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (serverSide && onPageChange) {
                  onPageChange(page + 1);
                } else {
                  table.nextPage();
                }
              }}
              disabled={serverSide ? page >= (serverPageCount || 1) : !table.getCanNextPage()}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Desktop: full pagination */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page</span>
              <select
                value={serverSide ? localPageSize : table.getState().pagination.pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  setLocalPageSize(newSize);
                  if (serverSide && onPageSizeChange) {
                    onPageSizeChange(newSize);
                  } else {
                    table.setPageSize(newSize);
                  }
                }}
                className="h-8 w-[70px] rounded border border-input bg-background px-2 text-sm"
              >
                {[10, 20, 30, 40, 50].map((ps) => (
                  <option key={ps} value={ps}>
                    {ps}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (serverSide && onPageChange) {
                    onPageChange(1);
                  } else {
                    table.setPageIndex(0);
                  }
                }}
                disabled={serverSide ? page <= 1 : !table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (serverSide && onPageChange) {
                    onPageChange(page - 1);
                  } else {
                    table.previousPage();
                  }
                }}
                disabled={serverSide ? page <= 1 : !table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (serverSide && onPageChange) {
                    onPageChange(page + 1);
                  } else {
                    table.nextPage();
                  }
                }}
                disabled={serverSide ? page >= (serverPageCount || 1) : !table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (serverSide && onPageChange) {
                    onPageChange(serverPageCount || 1);
                  } else {
                    table.setPageIndex(table.getPageCount() - 1);
                  }
                }}
                disabled={serverSide ? page >= (serverPageCount || 1) : !table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
