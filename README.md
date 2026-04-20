# BipBip Merchant Integration API — Developer Portal

> Portal público de documentación para la integración del **Merchant Integration API** de BipBip. Dos contratos de API complementarios (webhook outbound + REST API inbound) y una guía paso a paso para unirlos.

[![Astro](https://img.shields.io/badge/Astro-6.0-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.2-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-FDC300)](https://docs.astro.build/en/guides/internationalization/)

---

## Qué es

Un dev portal estático, bilingüe (ES + EN), con dark mode, view transitions y contenido alineado 1:1 al swagger real del backend. Diseñado para que un comercio (cadena, franquicia, POS/ERP) integre sus operaciones con BipBip sin intervención del equipo BipBip.

**Live**:
- Producción: por definir
- Dev local: `http://localhost:4321`

## Qué incluye

- **Guía de integración** (`/docs`) — Quickstart de 4 pasos, verificación HMAC con 3 footguns, troubleshooting con 4 FAQs, glosario con tabla de estados
- **Webhook Spec** (`/webhook`) — Contrato outbound, headers firmados, política de reintentos at-least-once, schemas `Order`, `OrderCancellation`, `OrderAck`
- **REST API Reference** (`/api`) — 5 endpoints (`/accept`, `/reject`, `/status`, `GET /{orderKey}`, `GET /` con cursor pagination), autenticación `X-Bipbip-Api-Key`, `Idempotency-Key`, errores RFC 7807
- **Portal (Autogestión)** (`/portal`) — 13 endpoints bajo `/portal/*` para gestionar API Keys, tiendas, webhooks + flow de auth `/auth/*`
- **Changelog** (`/changelog`) — Versiones publicadas + roadmap
- **Search Ctrl+K** — Command palette con endpoints, secciones y páginas indexadas
- **Toggle de idioma** — ES ↔ EN con rutas nativas de Astro i18n (`/` vs `/en/`)
- **Dark mode** — Class-based, persistente via `localStorage`, cálido con hint de rojo

## Stack

- **Framework**: [Astro 6.0](https://astro.build) — static-first, islands architecture, view transitions
- **Estilos**: [Tailwind CSS 4.2](https://tailwindcss.com) con `@theme` tokens en CSS (no `tailwind.config.js`)
- **Fuentes**: Poppins (300–900) + JetBrains Mono (400/500) via `@fontsource`
- **i18n**: Astro nativo con fallback rewrite — archivo fuente en ES, EN en `src/pages/en/`, dicts tipados en `src/i18n/`
- **Deploy**: Static output — sirve desde cualquier CDN (Cloudflare Pages, Vercel, Netlify, S3+CloudFront)

## Quickstart

```bash
# Requiere Node.js 22.12+
npm install
npm run dev
```

El portal arranca en `http://localhost:4321` con HMR. El script `dev` incluye `--host`, así que la LAN ve el server en `http://<tu-ip>:4321`.

### Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR y `--host` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Preview local del build |
| `npm run astro -- check` | Type-check + diagnostics de Astro |

### Tunnel público (Cloudflare)

Para compartir un preview sin deploy:

```bash
npx cloudflared@latest tunnel --url http://localhost:4321
```

Te entrega una URL pública `https://*.trycloudflare.com` mientras el comando esté vivo. `vite.server.allowedHosts` en `astro.config.mjs` ya permite `.trycloudflare.com` y `.ngrok*` para que Vite no bloquee el hostname.

## Estructura del proyecto

```
.
├── DESIGN.md                # Sistema de diseño (obligatorio leer antes de tocar UI)
├── astro.config.mjs         # i18n + Vite allowedHosts
├── public/
│   ├── iconografia/         # SVGs oficiales de marca (logos + illustrations + pattern)
│   ├── favicon.svg
│   └── v2.svg               # OG image
├── src/
│   ├── i18n/
│   │   ├── config.ts        # locales, default
│   │   ├── es.ts            # dict completo español
│   │   ├── en.ts            # dict completo inglés
│   │   └── ui.ts            # useTranslations(locale) helper
│   ├── pages/
│   │   ├── index.astro      # landing ES
│   │   ├── docs.astro       # guía ES
│   │   ├── api.astro        # REST reference ES
│   │   ├── webhook.astro    # webhook spec ES
│   │   ├── portal.astro     # autogestión ES
│   │   ├── changelog.astro  # changelog ES
│   │   ├── 404.astro        # shared (usa useTranslations)
│   │   └── en/              # mismas páginas traducidas a inglés
│   ├── layouts/
│   │   └── Layout.astro     # shell con Header, Footer, CommandPalette, view transitions
│   ├── components/
│   │   ├── docs/            # DocsLayout, SidebarGroup, SidebarLink, EndpointCard, Callout, TabbedCode
│   │   ├── landing/         # Hero, FeaturesGrid, FeatureCard, CodePreview, GettingStarted, CTAFooter
│   │   ├── layout/          # Header, Footer, NavLink, ThemeToggle, LanguageToggle
│   │   ├── icons/           # Logo variants + illustrations (Astro components)
│   │   ├── CommandPalette.astro
│   │   └── FloatingIcons.astro
│   └── styles/
│       └── global.css       # @theme tokens + animaciones + view transitions + reduced-motion
└── package.json
```

## i18n

Rutas por locale:

| Locale | Prefix | Ejemplos |
|---|---|---|
| `es` (default) | ninguno | `/`, `/docs`, `/api`, `/webhook` |
| `en` | `/en/` | `/en/`, `/en/docs`, `/en/api` |

`astro.config.mjs` usa `fallbackType: 'rewrite'` — si un endpoint en `/en/` no existe, Astro sirve el contenido español bajo la misma URL. Esto permite ir traduciendo páginas incrementalmente sin romper el toggle.

Para agregar una key de copy:

1. Agregala en `src/i18n/es.ts` dentro del nested object correspondiente
2. Agregala en `src/i18n/en.ts` con la misma shape
3. Usala en el componente con `const t = useTranslations(Astro.currentLocale); ...{t.xxx.yyy}`

Para links internos en componentes compartidos usá siempre `getRelativeLocaleUrl(locale, path)`:

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
const locale = Astro.currentLocale ?? 'es';
const url = (path: string) => getRelativeLocaleUrl(locale, path);
---
<a href={url('/docs')}>…</a>
```

## Diseño

Antes de tocar UI leé **[`DESIGN.md`](./DESIGN.md)** — define paleta, jerarquía de color (red = primary, yellow = tip, orange = mid warning), escala tipográfica, voice & tone por contexto (Voice A warm Honduran para landing/errors, Voice B neutral preciso para reference), catálogo de motion permitido y checklist pre-merge.

Reglas duras:

- **Nunca hardcodear hex** — usá los tokens `bipbip-*`, `surface-*`, `border-*`
- **Nunca usar los 3 colores brand como peers** en la misma composición
- **Nunca `text-yellow-*` sobre fondo blanco** — WCAG AA falla
- **Nunca animación sin `prefers-reduced-motion` guard**
- **Nunca mezclar Voice A y Voice B** en la misma sección

## Deploy

El output es estático (`astro build` → `dist/`). Sirve desde cualquier CDN o static host.

Recomendado: **Cloudflare Pages** (gratis, SSL, edge global, view transitions funcionan perfecto).

```bash
npm run build
# dist/ queda listo para subir
```

Variables de entorno: ninguna requerida para el portal en sí (todo el contenido está estático y las API keys son del consumidor final, no del portal).

## Contribuir

1. Leé `DESIGN.md`
2. Rama feature: `feat/algo-descriptivo` o `fix/issue-descriptivo`
3. Commits con [Conventional Commits](https://www.conventionalcommits.org/): `feat(docs):`, `fix(ui):`, `chore(config):`, etc.
4. Agregá textos nuevos en `src/i18n/es.ts` **Y** `src/i18n/en.ts` con la misma shape
5. Respetá el checklist pre-merge de `DESIGN.md`
6. PR a `main` con descripción clara del cambio

## Soporte

- **Integración con BipBip**: [integraciones@bipbip.com](mailto:integraciones@bipbip.com)
- **Bugs/issues del portal**: abrir issue en este repo
- **Swagger backend**: pedir al equipo BE el JSON de `/swagger/v1/swagger.json`

## Licencia

Proprietary — BipBip / Creative Information Technologies. Todos los derechos reservados.
