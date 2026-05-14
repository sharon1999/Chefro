import { getMealsByArea } from "@/actions/mealdb.actions";
import Image from "next/image";
import Link from "next/link";
import { areaToCountryCode } from "@/lib/countryMappings";
import { Globe, ArrowLeft, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function CuisinePage({ params }) {
  const { area } = await params;
  
  // decode area in case it's URL encoded (e.g., from %20 or something, though most areas here are single words)
  const decodedArea = decodeURIComponent(area);
  
  // fetch meals for this area
  const res = await getMealsByArea(decodedArea);
  const meals = res.success ? res.meals : [];
  
  const code = areaToCountryCode[decodedArea];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-primary/20 shadow-sm bg-background flex items-center justify-center shrink-0">
          {code ? (
            <Image
              src={`https://flagcdn.com/w80/${code}.png`}
              alt={`${decodedArea} flag`}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNjYmQ1ZTEiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjOTRhM2I4IiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2NiZDVlMSIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjY2JkNWUxIiAvPgogIDxyZWN0IGlkPSJyIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMTAwMCIgdG89IjEwMDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4K"
              unoptimized
            />
          ) : (
            <Globe className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          {decodedArea} Cuisine
        </h1>
      </div>
      
      {meals.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border">
          <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-muted-foreground">No dishes found for this cuisine.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {meals.map((meal) => (
            <Link href={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
              <Card className="group h-full cursor-pointer overflow-hidden border transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1 bg-card">
                <div className="relative aspect-square w-full">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNjYmQ1ZTEiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjOTRhM2I4IiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2NiZDVlMSIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjY2JkNWUxIiAvPgogIDxyZWN0IGlkPSJyIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMTAwMCIgdG89IjEwMDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4K"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {meal.strMeal}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
