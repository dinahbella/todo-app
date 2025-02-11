"use client";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { AppSidebar } from "./Sidebar";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";

const TaskItem = ({
  task,
  message,
  date,
  priority,
}: {
  task: string;
  message: string;
  date: string;
  priority: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Priority color mapping
  const priorityColorMap: { [key: string]: string } = {
    Work: "bg-cyan-500", // Blue for Work priority
    Personal: "bg-rose-500", // Green for Personal priority
    List: "bg-yellow-500", // Yellow for List priority
  };

  // Dropdown box color mapping
  const boxColorMap: { [key: string]: string } = {
    Work: "bg-blue-100 border-blue-500", // Light blue for Work
    Personal: "bg-pink-100 border-pink-500", // Light pink for Personal
    List: "bg-yellow-100 border-yellow-500", // Light yellow for List
  };

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-4 items-center">
          <Checkbox className="w-5 h-5 rounded-sm" />
          <p className="font-medium">{task}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={`${
              priorityColorMap[priority] || ""
            } text-white px-2 py-1 rounded-md text-xs`}
          >
            {priority}
          </Badge>
          {isOpen ? (
            <ChevronDown className="transition-transform duration-300" />
          ) : (
            <ChevronRight className="transition-transform duration-300" />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`mt-2 ml-9 p-3 rounded-md text-gray-700 border-l-4 shadow-sm ${
            boxColorMap[priority] || ""
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500 w-5 h-5" />
            <span className="text-sm font-semibold">{message}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
            <Calendar className="w-4 h-4" />
            <span>Due: {date}</span>
          </div>
        </div>
      )}
      <hr className="my-2" />
    </div>
  );
};

const Menu = () => {
  const tasks = [
    {
      task: "Research content ideas",
      message: "Great start! Gather insights.",
      date: "Feb 12, 2025",
      priority: "Work",
    },
    {
      task: "Create a database of guest authors",
      message: "Keep networking!",
      date: "Feb 15, 2025",
      priority: "Personal",
    },
    {
      task: "Write an outline for the article",
      message: "Outline is key!",
      date: "Feb 18, 2025",
      priority: "List",
    },
    {
      task: "Plan a social media post",
      message: "Engagement matters!",
      date: "Feb 20, 2025",
      priority: "Work",
    },
    {
      task: "Schedule an editorial meeting",
      message: "Teamwork wins!",
      date: "Feb 22, 2025",
      priority: "Personal",
    },
  ];

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 pl-14 m-5 space-y-4">
        <h1 className="flex font-semibold text-2xl justify-center gap-4">
          <span>Today</span>
          <Badge className="font-semibold text-2xl bg-transparent border">
            {tasks.length}
          </Badge>
        </h1>
        <Link href="/newTask">
          {" "}
          <div className="border w-screen flex gap-4 rounded-md mt-10 p-3">
            <Plus className="text-muted-foreground w-5 h-5" />
            <h4>Add new task</h4>
          </div>
        </Link>

        {/* Task List */}
        {tasks.map((taskData, index) => (
          <TaskItem
            key={index}
            task={taskData.task}
            message={taskData.message}
            date={taskData.date}
            priority={taskData.priority}
          />
        ))}
      </main>
    </div>
  );
};

export default Menu;
