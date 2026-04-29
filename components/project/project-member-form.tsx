"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  CalendarIcon,
} from "lucide-react";
import z from "zod";
import { toast } from "sonner";
import { Status } from "@prisma/client";

import { projectMemberDefaultValues } from "@/lib/constants";
import { projectMemberSchema } from "@/lib/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EmployeeProfile, Project } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { createProjectMember, updateProjectMember } from "@/lib/actions/project-members";

type FormValues = z.infer<typeof projectMemberSchema>;

type Props = {
  data?: FormValues;
  update: boolean;
  employees: EmployeeProfile[];
  projects: any;
};

const fieldClass =
  "h-12 w-full rounded-2xl border border-indigo-100 bg-white/95 shadow-sm transition-all duration-200 hover:border-cyan-200 focus:ring-2 focus:ring-indigo-300 focus:border-cyan-300";

const textAreaClass =
  "min-h-28 w-full rounded-2xl border border-indigo-100 bg-white/95 shadow-sm transition-all duration-200 hover:border-cyan-200 focus:ring-2 focus:ring-indigo-300 focus:border-cyan-300";

const ProjectMemberForm = ({ data, update, employees, projects }: Props) => {
  const router = useRouter();
  const id = data?.id;
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(projectMemberSchema),
    defaultValues: data ?? projectMemberDefaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (values : any) => {
    startTransition(async () => {
      const res = update && id
        ? await updateProjectMember(values, id)
        : await createProjectMember(values);

      if (!res?.success) {
        toast.error("Error", {
          description: res?.message,
        });
        return;
      }

      toast.success("Success", {
        description: res.message,
      });

      router.push("/project-members");
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Top Fields */}
        <div className="grid gap-5 md:grid-cols-2">

          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Project
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as Status)
                  }
                >
                  <FormControl>
                    <SelectTrigger className={`${fieldClass} w-full`}>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="rounded-2xl border border-indigo-100 shadow-xl">
                    {projects.length > 0 && projects.map((project : any) => (
                      <SelectItem key={project.id} value={project.id as string}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Employee
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as Status)
                  }
                >
                  <FormControl>
                    <SelectTrigger className={`${fieldClass} w-full`}>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="rounded-2xl border border-indigo-100 shadow-xl">
                    {employees.length > 0 && employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id as string}>
                        {employee.employeeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Assigned At
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            {update ? "Update Project" : "Save Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectMemberForm;