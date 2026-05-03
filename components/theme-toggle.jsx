"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const subscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

const themes = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  // Hydration-safe: false on server, true on client — no setState needed
  const mounted = React.useSyncExternalStore(subscribe, getTrue, getFalse);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="size-9 rounded-md bg-muted animate-pulse" />
    );
  }

  const current = themes.find((t) => t.value === theme) ?? themes[2];
  const CurrentIcon = current.Icon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle theme"
        className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <CurrentIcon className="size-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
          {themes.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                theme === value
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-popover-foreground"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
              {theme === value && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
