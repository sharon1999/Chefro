"use client";

import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";

export default function ScanTab({ scanning, selectedImage, onImageSelect, onScan }) {
  return (
    <div className="space-y-4">
      <ImageUploader onImageSelect={onImageSelect} loading={scanning} />

      {selectedImage && !scanning && (
        <Button onClick={onScan} className="w-full h-12 text-base gap-2" disabled={scanning}>
          {scanning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              Scan Image
            </>
          )}
        </Button>
      )}
    </div>
  );
}
