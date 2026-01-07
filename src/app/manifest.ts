import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Visita Sigchos',
    short_name: 'Sigchos',
    description: 'Entorno web interactivo Turístico para el cantón de Sigchos',
    start_url: '/',
    display: 'standalone',
    background_color: '#12141d', // Tu color de fondo oscuro
    theme_color: '#12141d',      // Tu color de tema
    icons: [
      {
        src: '/Calabazin.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/Calabazin_192.png', // Usando tu imagen existente
        sizes: '192x192', // Nota: Idealmente deberías redimensionar esta imagen a 192px reales
        type: 'image/png',
      },
      {
        src: '/Zapallin_512.png', // Usando tu imagen existente
        sizes: '512x512', // Nota: Idealmente deberías redimensionar esta imagen a 512px reales
        type: 'image/png',
      },
    ],
  };
}