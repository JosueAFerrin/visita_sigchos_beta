import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", // Dónde se generará el service worker
  cacheOnFrontEndNav: true, // Caché agresivo para navegación rápida
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true, // Recargar si vuelve la conexión
  disable: process.env.NODE_ENV === "development", // Desactivar en desarrollo para no molestar
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kfkobbtzhqtdfankjtqt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  devIndicators: false, // Esto estaba en tu config original, pero da error de tipo en algunas versiones, si te da error bórralo.
};

export default withPWA(nextConfig);