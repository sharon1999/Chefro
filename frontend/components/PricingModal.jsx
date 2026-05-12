"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PricingTable } from "@clerk/nextjs";

const PricingModal = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-5  max-w-4xl w-full bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upgrade
          </DialogTitle>
          <DialogDescription className="text-stone-500">
            Choose the plan that works best for your culinary journey.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full mt-4 max-h-[70vh] overflow-y-auto">
          <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: {
                    zIndex: 2000,
                  },
                },
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
