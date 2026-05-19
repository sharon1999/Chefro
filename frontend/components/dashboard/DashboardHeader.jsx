import { Sparkles } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="relative flex flex-col gap-3 pb-6 border-b border-border/50">
      {/* Background glow */}
      <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold w-fit tracking-wide uppercase">
        <Sparkles className="w-3.5 h-3.5" />
        AI-Powered Kitchen
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/80 to-primary/70">
        Culinary Dashboard
      </h1>
      <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
        Discover new flavors, explore cuisines, and find your next favorite meal
        — all powered by AI.
      </p>
    </div>
  );
}
