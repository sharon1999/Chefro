import Image from "next/image";
import { ChefHat, ShoppingBasket, CheckCircle2 } from "lucide-react";

const FEATURE_ITEMS = [
  {
    icon: ChefHat,
    title: "Magical Recipe Generation",
    description:
      "Tell ChefroAI what you're craving, or let it surprise you. Our advanced AI crafts perfectly portioned, delicious recipes tailored to your dietary preferences and skill level.",
    bullets: [
      "Step-by-step instructions",
      "Nutritional information included",
      "Adjustable serving sizes",
    ],
    image: { src: "/images/recipe.png", alt: "Recipe Generation" },
    imageOrder: "order-1 md:order-2",
    contentOrder: "order-2 md:order-1",
  },
  {
    icon: ShoppingBasket,
    title: "Smart Digital Pantry",
    description:
      "Keep track of what's in your fridge and cupboards. ChefroAI will suggest recipes based exclusively on what you already have, saving you time and money.",
    bullets: [
      "Automatic expiration tracking",
      "Generate shopping lists",
      "Reduce food waste",
    ],
    image: { src: "/images/pantry.png", alt: "Digital Pantry" },
    imageOrder: "order-1",
    contentOrder: "order-2",
  },
];

function FeatureItem({ icon: Icon, title, description, bullets, image, imageOrder, contentOrder, isFirst }) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${isFirst ? "" : "mt-24"}`}>
      {/* Image */}
      <div className={`${imageOrder} relative rounded-2xl overflow-hidden shadow-xl group`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={600}
          height={600}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className={`${contentOrder} space-y-6`}>
        <div className="inline-flex items-center rounded-full bg-primary/10 p-3 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
        <ul className="space-y-3">
          {bullets.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything you need in the kitchen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Say goodbye to food waste and &quot;what&apos;s for dinner&quot; panic.
            ChefroAI handles the planning so you can enjoy the cooking.
          </p>
        </div>

        {FEATURE_ITEMS.map((feature, i) => (
          <FeatureItem key={feature.title} {...feature} isFirst={i === 0} />
        ))}
      </div>
    </section>
  );
}
