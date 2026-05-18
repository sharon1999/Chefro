import { auth } from "@clerk/nextjs/server";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection userId={userId} />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
