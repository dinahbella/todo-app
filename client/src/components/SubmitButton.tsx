"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  text: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
    | null
    | undefined;
  width?: string;
  icon?: React.ReactNode;
}

const SubmitButton = ({ text, variant, width, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button variant={variant} className={width} disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && <div>{icon}</div>}
            <span>{text}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
