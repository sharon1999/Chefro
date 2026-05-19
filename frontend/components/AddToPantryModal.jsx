/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Camera, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetch from "@/hooks/use-fetch";
import {
  scanPantryImage,
  saveToPantry,
  addPantryItemManually,
} from "@/actions/pantry.actions";
import { toast } from "sonner";
import ScanTab from "@/components/pantry/ScanTab";
import ScannedReview from "@/components/pantry/ScannedReview";
import ManualAddTab from "@/components/pantry/ManualAddTab";

export default function AddToPantryModal({ isOpen, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedIngredients, setScannedIngredients] = useState([]);
  const [manualItem, setManualItem] = useState({ name: "", quantity: "" });

  // Scan image
  const { loading: scanning, data: scanData, fn: scanImage } = useFetch(scanPantryImage);

  // Save scanned items
  const { loading: saving, data: saveData, fn: saveScannedItems } = useFetch(saveToPantry);

  // Add manual item
  const { loading: adding, data: addData, fn: addManualItem } = useFetch(addPantryItemManually);

  // Handle image selection
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setScannedIngredients([]);
  };

  // Scan image
  const handleScan = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
    await scanImage(formData);
  };

  // Update scanned ingredients when scan completes
  useEffect(() => {
    if (scanData?.success && scanData?.ingredients) {
      setScannedIngredients(scanData.ingredients);
      toast.success(`Found ${scanData.ingredients.length} ingredients!`);
    }
  }, [scanData]);

  // Handle save scanned items
  const handleSaveScanned = async () => {
    if (scannedIngredients.length === 0) {
      toast.error("No ingredients to save");
      return;
    }
    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(scannedIngredients));
    await saveScannedItems(formData);
  };

  // Reset modal state
  const handleClose = useCallback(() => {
    setActiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);
    setManualItem({ name: "", quantity: "" });
    onClose();
  }, [onClose]);

  // Handle save success
  useEffect(() => {
    if (saveData?.success) {
      toast.success(saveData.message);
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [handleClose, onSuccess, saveData]);

  // Handle manual add
  const handleAddManual = async (e) => {
    e.preventDefault();
    if (!manualItem.name.trim() || !manualItem.quantity.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", manualItem.name);
    formData.append("quantity", manualItem.quantity);
    await addManualItem(formData);
  };

  // Handle manual add success
  useEffect(() => {
    if (addData?.success) {
      toast.success("Item added to pantry!");
      setManualItem({ name: "", quantity: "" });
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [addData, handleClose, onSuccess]);

  // Remove scanned ingredient
  const removeIngredient = (index) => {
    setScannedIngredients(scannedIngredients.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Add to Pantry
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Scan your pantry with AI or add items manually
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan" className="gap-2">
              <Camera className="w-4 h-4" />
              AI Scan
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Manually
            </TabsTrigger>
          </TabsList>

          {/* AI Scan Tab */}
          <TabsContent value="scan" className="space-y-6 mt-6">
            {scannedIngredients.length === 0 ? (
              <ScanTab
                scanning={scanning}
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
                onScan={handleScan}
              />
            ) : (
              <ScannedReview
                ingredients={scannedIngredients}
                saving={saving}
                onRemove={removeIngredient}
                onSave={handleSaveScanned}
                onScanAgain={() => {
                  setScannedIngredients([]);
                  setSelectedImage(null);
                }}
              />
            )}
          </TabsContent>

          {/* Manual Add Tab */}
          <TabsContent value="manual" className="mt-6">
            <ManualAddTab
              manualItem={manualItem}
              adding={adding}
              onChange={setManualItem}
              onSubmit={handleAddManual}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
