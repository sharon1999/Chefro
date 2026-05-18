import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10"></div>
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Ready to unleash your inner chef?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of home cooks who are transforming their daily meals
          with ChefroAI.
        </p>
        <Button size="lg" className="rounded-full text-lg h-14 px-8 group">
          Start Your Culinary Journey
          <Sparkles className="ml-2 w-5 h-5 group-hover:text-yellow-300 transition-colors" />
        </Button>
      </div>
    </section>
  );
}
