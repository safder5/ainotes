"use client";

import { NoteProviderContext } from "@/app/providers/NoteProvider";
import { useContext } from "react";

function useNote() {
  const context = useContext(NoteProviderContext);

  if (!context) throw new Error("useNote msut be used witgin a noteProvider");
  return context;
}
export default useNote;
