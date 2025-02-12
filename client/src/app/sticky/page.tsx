"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-gray-500",
];

const Sticky = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Work",
      descriptions: ["Finish the report", "Email client"],
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Personal",
      descriptions: ["Buy groceries", "Call mom"],
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Ideas",
      descriptions: ["New app concept", "Sketch wireframes"],
      color: "bg-yellow-500",
    },
    {
      id: 4,
      title: "Ideas",
      descriptions: ["New app concept", "Sketch wireframes"],
      color: "bg-red-500",
    },
    {
      id: 5,
      title: "Ideas",
      descriptions: ["New app concept", "Sketch wireframes"],
      color: "bg-purple-500",
    },
    {
      id: 6,
      title: "Ideas",
      descriptions: ["New app concept", "Sketch wireframes"],
      color: "bg-orange-500",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescriptions, setNewDescriptions] = useState<string[]>([]);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-gray-500");

  const [isEditing, setIsEditing] = useState(false);
  const [editCardId, setEditCardId] = useState<number | null>(null);

  // Function to add a new card
  const addCard = () => {
    if (!newTitle.trim() || newDescriptions.length === 0) return;

    const newCard = {
      id: Date.now(),
      title: newTitle,
      descriptions: newDescriptions,
      color: selectedColor,
    };

    setCards([...cards, newCard]);
    resetForm();
  };

  // Function to delete a card
  const deleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // Function to open the edit dialog
  const openEditDialog = (card: {
    id: number;
    title: string;
    descriptions: string[];
    color: string;
  }) => {
    setNewTitle(card.title);
    setNewDescriptions(card.descriptions);
    setSelectedColor(card.color);
    setEditCardId(card.id);
    setIsEditing(true);
  };

  // Function to save edits
  const saveEditCard = () => {
    if (!editCardId) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === editCardId
          ? {
              ...card,
              title: newTitle,
              descriptions: newDescriptions,
              color: selectedColor,
            }
          : card
      )
    );
    resetForm();
  };

  // Function to add description to list
  const addDescription = () => {
    if (descriptionInput.trim()) {
      setNewDescriptions([...newDescriptions, descriptionInput.trim()]);
      setDescriptionInput("");
    }
  };

  // Function to remove a specific description
  const removeDescription = (index: number) => {
    setNewDescriptions(newDescriptions.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDescriptions([]);
    setDescriptionInput("");
    setSelectedColor("bg-gray-500");
    setIsEditing(false);
    setEditCardId(null);
  };

  return (
    <div className="flex h-screen">
      <AppSidebar />

      <main className="flex-1 pl-14 m-5 space-y-4">
        {/* Input Section for New Card */}
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Card Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-48"
          />
          <Input
            type="text"
            placeholder="Add Description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="w-64"
          />
          <Button onClick={addDescription} variant="outline">
            + Desc
          </Button>
          <div className="flex space-x-1">
            {colors.map((color) => (
              <div
                key={color}
                className={cn(
                  "w-6 h-6 rounded-full cursor-pointer",
                  color,
                  color === selectedColor && "ring-2 ring-black"
                )}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <Button onClick={addCard}>
            <Plus className="w-4 h-4 mr-1" /> Add Card
          </Button>
        </div>

        {/* Display Cards */}
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`h-auto w-[200px] text-white p-4 relative ${card.color}`}
            >
              <CardContent>
                <h2 className="font-semibold text-lg">{card.title}</h2>
                <ul className="mt-2 text-sm list-disc pl-4">
                  {card.descriptions.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-yellow-300"
                    onClick={() => openEditDialog(card)}
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-red-500"
                    onClick={() => deleteCard(card.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Card Dialog */}
        {isEditing && (
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Card</DialogTitle>
              </DialogHeader>
              <Input
                type="text"
                placeholder="Card Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div>
                <Label>Descriptions</Label>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Add description"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                  />
                  <Button onClick={addDescription} variant="outline">
                    + Add
                  </Button>
                </div>
                <ul className="mt-2 text-sm list-disc pl-4">
                  {newDescriptions.map((desc, index) => (
                    <li key={index} className="flex justify-between">
                      {desc}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeDescription(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer",
                      color,
                      color === selectedColor && "ring-2 ring-black"
                    )}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              <DialogFooter>
                <Button onClick={saveEditCard}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default Sticky;
