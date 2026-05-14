"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ExpandableCategories({ categories }) {
  const [expanded, setExpanded] = useState(false);

  if (!categories || categories.length === 0) return null;

  const displayedCategories = expanded ? categories : categories.slice(0, 8);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-primary" />
          Top Categories
        </h3>
        {categories.length > 8 && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1 transition-all"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>View All <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
        {displayedCategories.map((cat) => (
          <Link href={`/category/${cat.strCategory}`} key={cat.idCategory}>
            <Card className="group cursor-pointer overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-card hover:-translate-y-1 h-full">
              <div className="relative h-20 md:h-24 w-full p-2 bg-muted/30">
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  fill
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 15vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNjYmQ1ZTEiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjOTRhM2I4IiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2NiZDVlMSIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjY2JkNWUxIiAvPgogIDxyZWN0IGlkPSJyIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMTAwMCIgdG89IjEwMDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4K"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-3 text-center">
                <h4 className="font-semibold text-sm md:text-base line-clamp-1">{cat.strCategory}</h4>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
