"use client";

import { useMemo, useCallback, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

import { useStaff, useStaffMutations, StaffMember } from "@/hooks/use-staff";
import { usePermissions } from "@/hooks/use-permissions";
import { DataTable } from "@/components/shared/data-table";
import {
  createStaffColumns,
  StaffActionHandlers,
} from "@/components/staff/columns";
import { EditStaffDialog } from "@/components/staff/edit-staff-dialog";

export default function StaffPage() {
  const { userId } = useAuth();
  const { staff, isLoading, error, refetch } = useStaff();
  const { updateStaff, deleteStaff, isUpdating, isDeleting } =
    useStaffMutations();
  const { hasPermission, PERMISSIONS } = usePermissions();

  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Action handlers
  const handleEdit = useCallback((staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setIsEditDialogOpen(true);
  }, []);

  const handleSave = useCallback(
    async (id: string, data: Parameters<typeof updateStaff>[0]["data"]) => {
      try {
        await updateStaff({ id, data });
        toast.success("Staff member updated successfully");
        setIsEditDialogOpen(false);
        setEditingStaff(null);
        refetch();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update staff member"
        );
      }
    },
    [updateStaff, refetch]
  );

  const handleDelete = useCallback(
    async (staffMember: StaffMember) => {
      try {
        await deleteStaff({ id: staffMember.id });
        toast.success(`${staffMember.name} has been deleted`);
        refetch();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to delete staff member"
        );
      }
    },
    [deleteStaff, refetch]
  );

  const canWriteStaff = hasPermission(PERMISSIONS.STAFF_WRITE);

  const actionHandlers: StaffActionHandlers = useMemo(
    () => ({
      onEdit: handleEdit,
      onDelete: handleDelete,
      isDeleting,
      currentUserId: userId || undefined,
      canWrite: canWriteStaff,
    }),
    [handleEdit, handleDelete, isDeleting, userId, canWriteStaff]
  );

  const columns = useMemo(
    () => createStaffColumns(actionHandlers),
    [actionHandlers]
  );

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to load staff
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 text-sm text-primary underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
        <p className="text-muted-foreground">
          Manage staff accounts, roles, and permissions
        </p>
      </div>

      <DataTable
        columns={columns}
        data={staff}
        isLoading={isLoading}
        searchPlaceholder="Search staff by name or email..."
        showDateFilter={false}
        mobileHiddenColumns={["email", "permissions"]}
        tabletHiddenColumns={["permissions"]}
      />

      <EditStaffDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setEditingStaff(null);
        }}
        staff={editingStaff}
        onSave={handleSave}
        isLoading={isUpdating}
      />
    </div>
  );
}