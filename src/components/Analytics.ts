'use client';
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LAST_VIEW_KEY = "analytics:last-view";
const LAST_VIEW_AT_KEY = "analytics:last-view-at";
const DEDUP_WINDOW_MS = 5000;

export default function Analytics() {
  const pathName = usePathname();

  useEffect(() => {
    const registerView = async () => {
      if (!pathName) return;

      const now = Date.now();
      const lastView = sessionStorage.getItem(LAST_VIEW_KEY);
      const lastViewAt = Number(sessionStorage.getItem(LAST_VIEW_AT_KEY) ?? 0);

      // Evita duplicados por dobles efectos en desarrollo o navegación inmediata al mismo slug.
      const isDuplicate = lastView === pathName && now - lastViewAt < DEDUP_WINDOW_MS;
      if (isDuplicate) return;

      const { error } = await supabase.from("page_views").insert([
        {
          slug: pathName,
        },
      ]);

      if (error) {
        console.error("Error registrando page view:", error.message);
        return;
      }

      sessionStorage.setItem(LAST_VIEW_KEY, pathName);
      sessionStorage.setItem(LAST_VIEW_AT_KEY, String(now));
    };

    registerView().catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Error desconocido";
      console.error("Fallo inesperado registrando page view:", message);
    });
  }, [pathName]);

  return null;
}