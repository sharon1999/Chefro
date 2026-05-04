"use client";

import { UserButton } from "@clerk/nextjs";
import { BookOpen, Package } from "lucide-react";

export function CustomUserButton() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox:
            "w-9 h-9 border-2 border-border hover:border-primary/50 transition-colors shadow-sm",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Recipes"
          labelIcon={<BookOpen className="w-4 h-4" />}
          href="/recipes"
        />
        <UserButton.Link
          label="My Pantry"
          labelIcon={<Package className="w-4 h-4" />}
          href="/pantry"
        />
        <UserButton.Action label="manageAccount"/>
      </UserButton.MenuItems>
    </UserButton>
  );
}
