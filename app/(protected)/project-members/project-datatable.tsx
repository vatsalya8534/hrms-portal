"use client";

import * as React from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/datatable/DataTable";
import { ProjectMember } from "@/types";
import { deleteProjectMember } from "@/lib/actions/project-members";
import { getProjectMemberColumns } from "./column";

type ProjectMemberDataTableProps = {
  data: any;
  canEdit: boolean;
  canDelete: boolean;
  title: string;
  actions?: React.ReactNode;
};

export default function ProjectDataTable({
  data,
  canEdit,
  canDelete,
  title,
  actions,
}: ProjectMemberDataTableProps) {
  const [tableData, setTableData] = React.useState<ProjectMember[]>(data);

  const deleteHandler = async (id: string) => {
    const res = await deleteProjectMember(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setTableData((prev) => prev.filter((projectMember) => projectMember.id !== id));
  };

  const columns = getProjectMemberColumns({
    canEdit,
    canDelete,
    onDelete: deleteHandler,
  });

  return (
    <DataTable
      data={tableData}
      columns={columns}
      title={title}
      actions={actions}
    />
  );
}
