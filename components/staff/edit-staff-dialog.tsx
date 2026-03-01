"use client";

import { useState, useEffect } from "react";
import { UserRole } from "@/prisma/db/generated/client";
import { StaffMember, UpdateStaffData } from "@/hooks/use-staff";
import { PERMISSIONS } from "@/lib/permissions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffMember | null;
  onSave: (id: string, data: UpdateStaffData) => Promise<void>;
  isLoading?: boolean;
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: "user", label: "User" },
  { value: "cs", label: "Customer Support" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

const PERMISSION_GROUPS = [
  {
    label: "Players",
    permissions: [
      { value: PERMISSIONS.PLAYERS_READ, label: "View Players" },
      { value: PERMISSIONS.PLAYERS_WRITE, label: "Edit Players" },
    ],
  },
  {
    label: "Cashflow",
    permissions: [
      { value: PERMISSIONS.CASHFLOW_READ, label: "View Cashflow" },
      { value: PERMISSIONS.CASHFLOW_WRITE, label: "Edit Cashflow" },
    ],
  },
  {
    label: "Batch Payments",
    permissions: [
      { value: PERMISSIONS.BATCHES_READ, label: "View Batches" },
      { value: PERMISSIONS.BATCHES_APPROVE, label: "Approve Batches" },
      { value: PERMISSIONS.BATCHES_PROCESS, label: "Process Batches" },
    ],
  },
  {
    label: "Promos",
    permissions: [
      { value: PERMISSIONS.PROMOS_READ, label: "View Promos" },
      { value: PERMISSIONS.PROMOS_WRITE, label: "Edit Promos" },
    ],
  },
  {
    label: "Games",
    permissions: [
      { value: PERMISSIONS.GAMES_READ, label: "View Games" },
      { value: PERMISSIONS.GAMES_WRITE, label: "Edit Games" },
    ],
  },
  {
    label: "Staff",
    permissions: [
      { value: PERMISSIONS.STAFF_READ, label: "View Staff" },
      { value: PERMISSIONS.STAFF_WRITE, label: "Edit Staff" },
    ],
  },
  {
    label: "Bonus Engine",
    permissions: [
      { value: PERMISSIONS.BONUS_READ, label: "View Bonus" },
      { value: PERMISSIONS.BONUS_WRITE, label: "Edit Bonus" },
    ],
  },
  {
    label: "Dashboard",
    permissions: [
      { value: PERMISSIONS.SUMMARY_READ, label: "View Summary" },
    ],
  },
  {
    label: "Analytics",
    permissions: [
      { value: PERMISSIONS.ANALYTICS_READ, label: "View Analytics" },
    ],
  },
];

export function EditStaffDialog({
  open,
  onOpenChange,
  staff,
  onSave,
  isLoading = false,
}: EditStaffDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (staff) {
      setName(staff.name);
      setEmail(staff.email);
      setRole(staff.role);
      setSelectedPermissions(staff.permissions.map((p) => p.permission));
    }
  }, [staff]);

  const handleSave = async () => {
    if (!staff) return;

    await onSave(staff.id, {
      name,
      email,
      role,
      permissions: selectedPermissions,
    });
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const toggleGroupPermissions = (permissions: string[]) => {
    const allSelected = permissions.every((p) =>
      selectedPermissions.includes(p)
    );
    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((p) => !permissions.includes(p))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...permissions]),
      ]);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Staff Member</AlertDialogTitle>
          <AlertDialogDescription>
            Update staff member details and permissions.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Role determines default permissions. Individual permissions below
              can override role defaults.
            </p>
          </div>

          {/* Permissions */}
          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="rounded-md border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {PERMISSION_GROUPS.map((group) => (
                  <div key={group.label} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`group-${group.label}`}
                        checked={group.permissions
                          .map((p) => p.value)
                          .every((p) => selectedPermissions.includes(p))}
                        onCheckedChange={() =>
                          toggleGroupPermissions(
                            group.permissions.map((p) => p.value)
                          )
                        }
                      />
                      <Label
                        htmlFor={`group-${group.label}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {group.label}
                      </Label>
                    </div>
                    <div className="ml-6 space-y-1">
                      {group.permissions.map((perm) => (
                        <div
                          key={perm.value}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={perm.value}
                            checked={selectedPermissions.includes(perm.value)}
                            onCheckedChange={() => togglePermission(perm.value)}
                          />
                          <Label
                            htmlFor={perm.value}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !name || !email}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}