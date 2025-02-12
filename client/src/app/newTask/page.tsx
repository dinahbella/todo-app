"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  const router = useRouter();
  const [tasks, setTasks] = useState<AddTaskFormData[]>([]); // Store tasks

  const form = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: undefined,
      dueDate: "",
    },
  });

  // Function to add a task to the list
  const onSubmit = (data: AddTaskFormData) => {
    setTasks((prevTasks) => [...prevTasks, data]);
    form.reset(); // Clear form after submission
  };

  // Function to delete a task from the list
  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6 p-9 border rounded-lg shadow-md max-w-md mx-auto">
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
              onClick={() => router.push("/home")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Task List */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Task List</h2>
        <div className="mt-2 space-y-3">
          {tasks.map((task, index) => (
            <Card key={index} className="p-4 relative">
              <CardContent>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Priority: {task.priority}
                </p>
                <p className="text-xs text-gray-500">
                  Due Date: {task.dueDate}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => deleteTask(index)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
