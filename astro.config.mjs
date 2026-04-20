// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow access through tunneling services (Cloudflare Tunnel, ngrok, etc.)
      // '.trycloudflare.com' covers any quick-tunnel subdomain.
      allowedHosts: [
        '.trycloudflare.com',
        '.ngrok.io',
        '.ngrok-free.app',
      ],
    },
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
    fallback: { en: 'es' },
  },
});