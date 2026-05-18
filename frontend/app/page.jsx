import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChefHat, ShoppingBasket, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
           <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Your AI Culinary Assistant
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight lg:leading-[1.1] bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
              Cook Smarter, Not Harder.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              ChefroAI transforms your pantry ingredients into masterclass meals. Discover new recipes, manage your groceries, and elevate your cooking experience with the power of AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {userId ? (
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto rounded-full group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/recipes">
                    <Button size="lg" className="w-full sm:w-auto rounded-full group">
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/pantry">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full">
                      Explore Pantry
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 100+ AI Recipes</div>
            </div>
          </div>
          
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

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need in the kitchen</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Say goodbye to food waste and &quot;what&apos;s for dinner&quot; panic. ChefroAI handles the planning so you can enjoy the cooking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <div className="inline-flex items-center rounded-full bg-primary/10 p-3 text-primary">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold">Magical Recipe Generation</h3>
              <p className="text-lg text-muted-foreground">
                Tell ChefroAI what you&apos;re craving, or let it surprise you. Our advanced AI crafts perfectly portioned, delicious recipes tailored to your dietary preferences and skill level.
              </p>
              <ul className="space-y-3">
                {['Step-by-step instructions', 'Nutritional information included', 'Adjustable serving sizes'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden shadow-xl group">
               <Image 
                src="/images/recipe.png" 
                alt="Recipe Generation" 
                width={600} 
                height={600} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-24">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
               <Image 
                src="/images/pantry.png" 
                alt="Digital Pantry" 
                width={600} 
                height={600} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-primary/10 p-3 text-primary">
                <ShoppingBasket className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold">Smart Digital Pantry</h3>
              <p className="text-lg text-muted-foreground">
                Keep track of what&apos;s in your fridge and cupboards. ChefroAI will suggest recipes based exclusively on what you already have, saving you time and money.
              </p>
              <ul className="space-y-3">
                {['Automatic expiration tracking', 'Generate shopping lists', 'Reduce food waste'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to unleash your inner chef?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of home cooks who are transforming their daily meals with ChefroAI.
          </p>
          <Button size="lg" className="rounded-full text-lg h-14 px-8 group">
            Start Your Culinary Journey
            <Sparkles className="ml-2 w-5 h-5 group-hover:text-yellow-300 transition-colors" />
          </Button>
        </div>
      </section>
    </div>
  );
}
