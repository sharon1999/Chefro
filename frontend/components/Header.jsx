 import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Package } from "lucide-react";
import { CustomUserButton } from "./CustomUserButton";
import { checkUser } from "@/lib/checkUser";


const Header = () => {
  const user = checkUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
          >
            <Image 
              src="/logo.png" 
              alt="Chefro Logo" 
              width={32} 
              height={32} 
              className="rounded-lg shadow-sm dark:hidden block"
            />
            <Image 
              src="/logo-dark.png" 
              alt="Chefro Logo Dark Mode" 
              width={32} 
              height={32} 
              className="rounded-lg shadow-sm hidden dark:block"
            />
            <span className="text-xl font-bold bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Chefro
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium">
          <Link
            href="/recipes"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="w-4 h-4" />
            <span>My Recipes</span>
          </Link>
          <Link
            href="/pantry"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Package className="w-4 h-4" />
            <span>My Pantry</span>
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
              >
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="rounded-full shadow-sm hover:shadow hover:ring-2 ring-primary/20 transition-all active:scale-95">
                Get Started
              </Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <div className="flex items-center gap-4">
              <CustomUserButton />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
