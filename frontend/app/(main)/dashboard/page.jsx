import Image from "next/image";
import Link from "next/link";
import {
  getRecipeOfTheDay,
  getCategories,
  getAreas,
} from "@/actions/mealdb.actions";
import { ChefHat, Globe, UtensilsCrossed, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ExpandableCuisines from "@/components/ExpandableCuisines";
import ExpandableCategories from "@/components/ExpandableCategories";

export default async function DashboardPage() {
  const [recipeOfTheDayRes, categoriesRes, areasRes] = await Promise.all([
    getRecipeOfTheDay().catch(() => ({ success: false, recipe: null })),
    getCategories().catch(() => ({ success: false, categories: [] })),
    getAreas().catch(() => ({ success: false, areas: [] })),
  ]);

  const recipe = recipeOfTheDayRes.success ? recipeOfTheDayRes.recipe : null;
  const categories = categoriesRes.success ? categoriesRes.categories : [];
  const areas = areasRes.success ? areasRes.areas : [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Culinary Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover new flavors, explore cuisines, and find your next favorite
          meal.
        </p>
      </div>

      {/* Recipe of the Day Hero */}
      {recipe && (
        <section className="relative rounded-3xl overflow-hidden shadow-2xl group border">
          <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNjYmQ1ZTEiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjOTRhM2I4IiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2NiZDVlMSIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjY2JkNWUxIiAvPgogIDxyZWN0IGlkPSJyIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMTAwMCIgdG89IjEwMDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4K"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recipe of the Day
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Globe className="w-3 h-3" /> {recipe.strCountry}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <UtensilsCrossed className="w-3 h-3" /> {recipe.strCategory}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 line-clamp-2">
              {recipe.strMeal}
            </h2>
            <p className="text-white/80 line-clamp-2 md:line-clamp-3 max-w-3xl mb-6">
              {recipe.strInstructions}
            </p>
            <Link href={`/recipe/${recipe.idMeal}`}>
              <Button
                size="lg"
                className="rounded-full font-semibold shadow-lg hover:shadow-primary/50 transition-all"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                View Full Recipe
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <ExpandableCategories categories={categories} />

      {/* Explore Cuisines */}
      <ExpandableCuisines areas={areas} />
    </div>
  );
}
