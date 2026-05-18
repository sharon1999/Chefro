import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection({ userId }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Your AI Culinary Assistant
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight lg:leading-[1.1] bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            Cook Smarter, Not Harder.
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            ChefroAI transforms your pantry ingredients into masterclass meals.
            Discover new recipes, manage your groceries, and elevate your
            cooking experience with the power of AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {userId ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/recipes">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pantry">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full"
                  >
                    Explore Pantry
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              100+ AI Recipes
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
          <div className="relative rounded-2xl overflow-hidden border bg-background/50 backdrop-blur-sm shadow-2xl shadow-primary/20">
            <Image
              src="/images/hero.png"
              alt="AI Kitchen Interface"
              width={800}
              height={600}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
