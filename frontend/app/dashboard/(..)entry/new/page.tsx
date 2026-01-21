"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EntryForm } from "@/components/entry-form";

export default function InterceptedNewEntry() {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl border border-zinc-700 bg-[#18181b] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">New Time Entry</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-1">
          <EntryForm inDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}
