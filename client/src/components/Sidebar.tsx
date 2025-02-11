"use client";

import {
  Calendar,
  FastForward,
  File,
  ListCheck,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-gray-300"); // Default color
  const [lists, setLists] = useState([
    { name: "Personal", color: "bg-rose-500", count: 3 },
    { name: "Work", color: "bg-cyan-300", count: 6 },
    { name: "List 1", color: "bg-yellow-500", count: 3 },
  ]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);

  // Colors available for selection
  const colorOptions = [
    { name: "Red", color: "bg-red-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "Green", color: "bg-green-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Purple", color: "bg-purple-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "Teal", color: "bg-teal-500" },
    { name: "Cyan", color: "bg-cyan-300" },
    { name: "Rose", color: "bg-rose-500" },
    { name: "Indigo", color: "bg-indigo-500" },
    { name: "Gray", color: "bg-gray-500" },
  ];

  const tagColors = [
    { name: "Red", color: "bg-red-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "Green", color: "bg-green-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Purple", color: "bg-purple-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "Teal", color: "bg-teal-500" },
    { name: "Cyan", color: "bg-cyan-300" },
    { name: "Rose", color: "bg-rose-500" },
    { name: "Indigo", color: "bg-indigo-500" },
    { name: "Gray", color: "bg-gray-500" },
  ];
  // Add new list
  const handleAddList = () => {
    if (listName.trim()) {
      setLists([...lists, { name: listName, color: selectedColor, count: 0 }]);
      setListName("");
      setSelectedColor("bg-gray-300");
      setIsAddingList(false);
    }
  };
  const handleAddTag = () => {
    if (newTag.trim()) {
      const randomColor =
        tagColors[Math.floor(Math.random() * tagColors.length)];
      setTags([...tags, { name: newTag, color: randomColor }]);
      setNewTag("");
      setIsAddingTag(false);
    }
  };

  // Controls the input field visibility

  // Open delete confirmation popup
  const confirmDeleteList = (listName: string) => {
    setIsDeleting(true);
    setListToDelete(listName);
  };

  // Delete list
  const handleDeleteList = () => {
    if (listToDelete) {
      setLists(lists.filter((list) => list.name !== listToDelete));
      setIsDeleting(false);
      setListToDelete(null);
    }
  };

  return (
    <SidebarProvider>
      {/* Menu button (always visible) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar overlay (closes when clicking outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between p-4">
                <span className="font-semibold text-2xl">Menu</span>
                <X
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </SidebarGroupLabel>

              <SidebarGroupContent>
                {/* Search Bar */}
                <div className="relative w-full max-w-md mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <p className="font-mediun text-xl p-4 mt-2">Tasks</p>

                <SidebarMenu>
                  <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
                    <FastForward />
                    <p className="hover:font-medium">Upcoming</p>
                    <SidebarMenuBadge className="bg-gray-200 rounded hover:bg-white">
                      12
                    </SidebarMenuBadge>
                  </div>
                  <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
                    <ListCheck />
                    <p className="hover:font-medium">Today</p>
                    <SidebarMenuBadge className="bg-gray-200 rounded hover:bg-white">
                      5
                    </SidebarMenuBadge>
                  </div>
                  <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
                    <Calendar />
                    <p className="hover:font-medium">Calender</p>
                  </div>
                  <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
                    <File />
                    <p className="hover:font-medium">Sticky wall</p>
                  </div>
                </SidebarMenu>
                <div className="p-4">
                  <p className="font-medium text-xl mb-2">Lists</p>
                  <ul className="space-y-2">
                    {" "}
                    {/* Ensures lists are displayed properly */}
                    {lists.map((list, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-4 h-4 rounded ${list.color}`}
                          ></span>
                          <p className="hover:font-medium">{list.name}</p>
                          <SidebarMenuBadge className="bg-gray-300 rounded px-2 py-1">
                            {list.count}
                          </SidebarMenuBadge>
                        </div>
                        <Trash2
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => confirmDeleteList(list.name)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add New List Button */}
                <div
                  className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200 cursor-pointer"
                  onClick={() => setIsAddingList(true)}
                >
                  <Plus className="text-gray-500 w-5 h-5" />
                  <p className="hover:font-medium">Add New List</p>
                </div>

                {/* Pop-up for Adding List */}
                {isAddingList && (
                  <div className="absolute bg-white p-4 shadow-lg rounded-md w-56 left-2 top-48 z-50">
                    <h3 className="text-lg font-medium mb-2">New List</h3>
                    <Input
                      type="text"
                      placeholder="List Name"
                      value={listName}
                      onChange={(e) => setListName(e.target.value)}
                      className="mb-3"
                    />

                    {/* Color Selection */}
                    <h4 className="text-sm font-medium mb-2">Choose Color</h4>
                    <div className="flex gap-2 mb-3">
                      {colorOptions.map((option) => (
                        <div
                          key={option.color}
                          className={`w-6 h-6 rounded cursor-pointer ${
                            option.color
                          } ${
                            selectedColor === option.color
                              ? "ring-2 ring-black"
                              : ""
                          }`}
                          onClick={() => setSelectedColor(option.color)}
                        ></div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => setIsAddingList(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddList}>Add</Button>
                    </div>
                  </div>
                )}

                <p className="font-medium text-xl p-4 mt-2">Lists</p>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded ${tag.color}`}
                    >
                      {tag.name}
                    </span>
                  ))}

                  {/* Button to show input field */}
                  {!isAddingTag ? (
                    <Button
                      className="bg-gray-200 flex items-center"
                      onClick={() => setIsAddingTag(true)}
                    >
                      <Plus className="text-gray-500 w-5 h-5" />
                      Add Tag
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="New Tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                      <Button onClick={handleAddTag}>Add</Button>
                    </div>
                  )}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Sidebar Footer */}
            <SidebarFooter>
              <div className="flex items-center space-x-2 p-2 m-1 w-full mt-8 rounded-md hover:bg-gray-200">
                <Settings />
                <h5 className="hover:font-medium">Settings</h5>
              </div>
              <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
                <LogOut />
                <p className="hover:font-medium">Log Out</p>
              </div>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Delete Confirmation Pop-up */}
      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="mb-4 text-lg">
              Are you sure you want to delete "{listToDelete}"?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" onClick={() => setIsDeleting(false)}>
                Cancel
              </Button>
              <Button className="bg-red-500" onClick={handleDeleteList}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
