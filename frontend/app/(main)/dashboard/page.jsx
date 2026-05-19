import {
  getRecipeOfTheDay,
  getCategories,
  getAreas,
} from "@/actions/mealdb.actions";
import ExpandableCuisines from "@/components/ExpandableCuisines";
import ExpandableCategories from "@/components/ExpandableCategories";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecipeOfTheDay from "@/components/dashboard/RecipeOfTheDay";

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
      <DashboardHeader />
      <RecipeOfTheDay recipe={recipe} />
      <ExpandableCategories categories={categories} />
      <ExpandableCuisines areas={areas} />
    </div>
  );
}
