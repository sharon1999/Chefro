"use client";

import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManualAddTab({ manualItem, adding, onChange, onSubmit }) {
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Ingredient Name
        </label>
        <input
          type="text"
          value={manualItem.name}
          onChange={(e) => onChange({ ...manualItem, name: e.target.value })}
          placeholder="e.g., Chicken breast"
          className={inputClass}
          disabled={adding}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Quantity
        </label>
        <input
          type="text"
          value={manualItem.quantity}
          onChange={(e) => onChange({ ...manualItem, quantity: e.target.value })}
          placeholder="e.g., 500g, 2 cups, 3 pieces"
          className={inputClass}
          disabled={adding}
        />
      </div>

      <Button type="submit" disabled={adding} className="w-full h-12 gap-2">
        {adding ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Add Item
          </>
        )}
      </Button>
    </form>
  );
}
