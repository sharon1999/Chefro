import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
          >
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <div className="w-6 h-6 rounded bg-primary/80 flex items-center justify-center shadow-inner">
                <span className="text-primary-foreground font-bold text-xs">
                  C
                </span>
              </div>
            </div>
            <span className="text-xl font-bold bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Chefro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#recipes"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Recipes
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
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
              <Link
                href="/dashboard"
                className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 border-2 border-border hover:border-primary/50 transition-colors shadow-sm",
                  },
                }}
              />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
