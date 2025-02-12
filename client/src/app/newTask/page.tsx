"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priority: z.enum(["personal", "work", "other"], {
    message: "Priority is required",
  }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
});

type AddTaskFormData = z.infer<typeof addTaskSchema>;

const AddTask = () => {
  const router = useRouter(); // Initialize router

  const form = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: undefined,
      dueDate: "",
    },
  });

  const onSubmit = (data: AddTaskFormData) => {
    console.log("Task Added:", data);
    // Add logic to save the task (e.g., API call)
  };

  return (
    <div className="flex flex-col gap-4 p-9 border rounded-lg shadow-md max-w-md mx-auto">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-xl font-bold">Add Task</h1>

          <Input placeholder="Title" {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}

          <Textarea
            placeholder="Description"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <p className="text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}

          <div className="flex gap-5 items-center">
            <p>Priority</p>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "priority",
                  value as "personal" | "work" | "other"
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {form.formState.errors.priority && (
            <p className="text-red-500">
              {form.formState.errors.priority.message}
            </p>
          )}

          <div className="flex gap-5 items-center">
            <span>Due Date</span>
            <Input type="date" {...form.register("dueDate")} />
          </div>
          {form.formState.errors.dueDate && (
            <p className="text-red-500">
              {form.formState.errors.dueDate.message}
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <Button type="submit" className="w-full">
              Add Task
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => router.push("/home")} // Correct way to navigate
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddTask;
