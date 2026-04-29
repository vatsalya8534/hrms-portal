"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { formatError } from "../utils";
import { projectMemberSchema } from "../validators";
import { ProjectMember } from "@prisma/client";

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function getProjectMembers() {
  try {
    const records = await prisma.projectMember.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        project: true,
        employee: true,
      }
    });

    return records;
  } catch {
    return [];
  }
}

export async function createProjectMember(data: ProjectMember): Promise<ActionResponse> {
  try {
    const projectMember = projectMemberSchema.parse(data);

    await prisma.projectMember.create({
      data: {
        projectId: projectMember.projectId,
        employeeId: projectMember.employeeId,
        assignedAt: projectMember.assignedAt || new Date().toISOString(),
      }
    });

    revalidatePath("/project-members");

    return {
      success: true,
      message: "Project member created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getProjectMemberById(id: string) {
  try {
    const record = await prisma.projectMember.findUnique({
      where: { id },
      select: {
        id: true,
        projectId: true,
        employeeId: true,
        assignedAt: true
      },
    });

    if (!record) {
      return {
        success: false,
        message: "Project member not found",
      };
    }

    return {
      success: true,
      data: record,
      message: "Project member fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function updateProjectMember(
  data: ProjectMember,
  id: string,
): Promise<ActionResponse> {
  try {
    const projectMember = projectMemberSchema.parse(data);

    await prisma.projectMember.update({
      where: { id },
      data: {
        projectId: projectMember.projectId,
        employeeId: projectMember.employeeId,
        assignedAt: projectMember.assignedAt || new Date().toISOString(),
      }
    });

    revalidatePath("/project-members");
    revalidatePath(`/project-members/edit/${id}`);

    return {
      success: true,
      message: "Project member updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteProjectMember(id: string): Promise<ActionResponse> {
  try {
    await prisma.projectMember.delete({
      where: { id },
    });

    revalidatePath("/project-members");

    return {
      success: true,
      message: "Project member deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
