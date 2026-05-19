"use client";

import { Camera, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ScannedReview({ ingredients, saving, onRemove, onSave, onScanAgain }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Review Detected Items
          </h3>
          <p className="text-sm text-muted-foreground">
            Found {ingredients.length} ingredients
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onScanAgain} className="gap-2">
          <Camera className="w-4 h-4" />
          Scan Again
        </Button>
      </div>

      {/* Ingredients List */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border"
          >
            <div className="flex-1">
              <div className="font-medium text-foreground text-sm">{ingredient.name}</div>
              <div className="text-xs text-muted-foreground">{ingredient.quantity}</div>
            </div>
            {ingredient.confidence && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-400/40 bg-green-500/10">
                {Math.round(ingredient.confidence * 100)}%
              </Badge>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemove(index)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <Button
        onClick={onSave}
        disabled={saving || ingredients.length === 0}
        className="w-full h-12 gap-2 bg-green-600 hover:bg-green-700 text-white"
      >
        {saving ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            Save {ingredients.length} Items to Pantry
          </>
        )}
      </Button>
    </div>
  );
}
