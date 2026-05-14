"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { areaToCountryCode } from "@/lib/countryMappings";

// The top 6 will be shown first
const topCuisines = [
  "Italian",
  "Mexican",
  "Indian",
  "Japanese",
  "Chinese",
  "American",
];

// The rest of the famous cuisines to show when expanded
const otherFamousCuisines = [
  "British",
  "Canadian",
  "French",
  "Greek",
  "Spanish",
  "Thai",
  "Turkish",
  "Vietnamese",
  "Moroccan",
  "Jamaican",
  "Portuguese",
  "Lebanese"
];

const allFamousCuisines = [...topCuisines, ...otherFamousCuisines];

export default function ExpandableCuisines({ areas }) {
  const [expanded, setExpanded] = useState(false);

  if (!areas || areas.length === 0) return null;

  // Filter to only famous cuisines
  const famousAreas = areas.filter(a => allFamousCuisines.includes(a.strArea));

  // Sort them so the topCuisines come first
  const sortedAreas = famousAreas.sort((a, b) => {
    const indexA = topCuisines.indexOf(a.strArea);
    const indexB = topCuisines.indexOf(b.strArea);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.strCountry.localeCompare(b.strCountry);
  });

  const displayedAreas = expanded ? sortedAreas : sortedAreas.slice(0, 6);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          Explore Cuisines
        </h3>
        {sortedAreas.length > 6 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1 transition-all"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View All <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayedAreas.map((area) => {
          const code = areaToCountryCode[area.strArea];
          return (
            <Link href={`/cuisine/${area.strArea}`} key={area.strArea}>
              <div className="px-4 py-6 rounded-2xl bg-muted/50 hover:bg-primary/10 border hover:border-primary/50 text-center transition-all duration-300 cursor-pointer group hover:-translate-y-1 h-full flex flex-col gap-3 items-center justify-center shadow-sm hover:shadow-md">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors shadow-sm bg-background flex items-center justify-center">
                  {code ? (
                    <Image
                      src={`https://flagcdn.com/w80/${code}.png`}
                      alt={`${area.strCountry} flag`}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNjYmQ1ZTEiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjOTRhM2I4IiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2NiZDVlMSIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjY2JkNWUxIiAvPgogIDxyZWN0IGlkPSJyIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMTAwMCIgdG89IjEwMDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4K"
                      unoptimized
                    />
                  ) : (
                    <Globe className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <span className="font-semibold text-base group-hover:text-primary transition-colors">
                  {area.strCountry}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
