/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChefHat,
  Loader2,
  Package,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import {
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
} from "@/actions/pantry.actions";
import { toast } from "sonner";
import AddToPantryModal from "@/components/AddToPantryModal";
import PricingModal from "@/components/PricingModal";

export default function PantryPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", quantity: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pantry items
  const {
    loading: loadingItems,
    data: itemsData,
    fn: fetchItems,
  } = useFetch(getPantryItems);

  // Delete item
  const {
    loading: deleting,
    data: deleteData,
    fn: deleteItem,
  } = useFetch(deletePantryItem);

  // Update item
  const {
    loading: updating,
    data: updateData,
    fn: updateItem,
  } = useFetch(updatePantryItem);

  // Load items on mount
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update items when data arrives
  useEffect(() => {
    if (itemsData?.success) {
      setItems(itemsData.items);
    }
  }, [itemsData]);

  // Refresh after delete
  useEffect(() => {
    if (deleteData?.success && !deleting) {
      toast.success("Item removed from pantry");
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteData, deleting]);

  // Refresh after update
  useEffect(() => {
    if (updateData?.success) {
      toast.success("Item updated successfully");
      setEditingId(null);
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData]);

  // Handle delete
  const handleDelete = async (itemId) => {
    const formData = new FormData();
    formData.append("itemId", itemId);
    await deleteItem(formData);
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.documentId);
    setEditValues({
      name: item.name,
      quantity: item.quantity,
    });
  };

  // Save edit
  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("itemId", editingId);
    formData.append("name", editValues.name);
    formData.append("quantity", editValues.quantity);
    await updateItem(formData);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", quantity: "" });
  };

  // Handle modal success (refresh items)
  const handleModalSuccess = () => {
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl space-y-10">

        {/* Page Header */}
        <div className="relative flex flex-col gap-3 pb-6 border-b border-border/50">
          {/* Background glow */}
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold w-fit tracking-wide uppercase">
                <Package className="w-3.5 h-3.5" />
                My Pantry
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight py-4 bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/80 to-primary/70">
                Your Ingredients
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                Manage your pantry and discover what you can cook with what you
                already have.
              </p>
            </div>

            {/* Add Button — Desktop */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex gap-2 shrink-0"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add to Pantry
            </Button>
          </div>

          {/* Usage Stats */}
          {itemsData?.scansLimit !== undefined && (
            <div className="bg-muted/50 py-2.5 px-4 border border-border rounded-full inline-flex items-center gap-2 w-fit text-sm mt-1">
              <Sparkles className="w-4 h-4 text-primary" />
              {itemsData.scansLimit === "unlimited" ? (
                <>
                  <span className="font-bold text-green-600">∞</span>
                  <span className="text-muted-foreground">
                    Unlimited AI scans (Pro Plan)
                  </span>
                </>
              ) : (
                <PricingModal>
                  <span className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Upgrade to Pro for unlimited Pantry scans
                  </span>
                </PricingModal>
              )}
            </div>
          )}
        </div>

        {/* Add Button — Mobile */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="md:hidden w-full gap-2"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          Add to Pantry
        </Button>

        {/* Quick Action — Find Recipes */}
        {items.length > 0 && (
          <Link href="/pantry/recipes" className="block">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-green-600 to-emerald-500 text-white p-6 border border-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl border border-white/30 group-hover:bg-white/30 transition-colors">
                  <ChefHat className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-1">
                    What Can I Cook Today?
                  </h3>
                  <p className="text-green-100 text-sm font-light">
                    Get AI-powered recipe suggestions from your {items.length}{" "}
                    ingredients
                  </p>
                </div>
                <div className="hidden sm:block">
                  <Badge className="bg-white/20 text-white border border-white/30 font-semibold">
                    {items.length} items
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Loading State */}
        {loadingItems && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p>Loading your pantry...</p>
          </div>
        )}

        {/* Pantry Items Grid */}
        {!loadingItems && items.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground">
                Your Ingredients
              </h2>
              <Badge variant="outline" className="font-semibold">
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.documentId}
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-md transition-all"
                >
                  {editingId === item.documentId ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Ingredient name"
                      />
                      <input
                        type="text"
                        value={editValues.quantity}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            quantity: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Quantity"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={updating}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          {updating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={updating}
                          className="flex-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.documentId)}
                            disabled={deleting}
                            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground/60">
                        Added {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingItems && items.length === 0 && (
          <div className="rounded-2xl bg-card border border-dashed border-border p-14 text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Your Pantry is Empty
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Start by scanning your pantry with AI or adding ingredients
              manually to discover amazing recipes!
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="gap-2"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add Your First Item
            </Button>
          </div>
        )}
      </div>

      {/* Add to Pantry Modal */}
      <AddToPantryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
