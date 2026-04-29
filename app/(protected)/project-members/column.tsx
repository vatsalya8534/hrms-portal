import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";

type ProjectMemberColumnOptions = {
  canEdit: boolean;
  canDelete: boolean;
  onDelete: (id: string) => void;
};

export const getProjectMemberColumns = ({
  canEdit,
  canDelete,
  onDelete,
}: ProjectMemberColumnOptions): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "projectId",
      header: "Project",
        cell: ({ row }) => row.original.project.name ?? "-",
    },
    {
      accessorKey: "employeeId",
      header: "Employee",
      cell: ({ row }) => row.original.employee.employeeName ?? "-",
    },
    {
      accessorKey: "assignedAt",
      header: "Assigned At",
      cell: ({ row }) => row.original.assignedAt ? new Date(row.original.assignedAt).toLocaleDateString() : "-",
    }
  ];

  if (canEdit || canDelete) {
    columns.push({
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original.id as string;

        return (
          <div className="flex gap-2">
            {canEdit && (
              <Button
                asChild
                size="icon"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link href={`/project-members/edit/${id}`}>
                  <EditIcon size={16} />
                </Link>
              </Button>
            )}

            {canDelete && (
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onDelete(id)}
              >
                <Trash size={16} />
              </Button>
            )}
          </div>
        );
      },
    });
  }

  return columns;
};
