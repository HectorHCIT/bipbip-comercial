# DESIGN.md — BipBip Developer Portal

Sistema de diseño oficial del portal. **Cualquier agente o persona que genere UI en este repo debe respetar estas reglas antes de tocar código.**

---

## 1. Principios de identidad

BipBip es **delivery hondureño, cálido y directo**. El portal debe transmitirlo sin gritarlo: un dev debe sentir la marca sin que le distraiga del contenido técnico.

Tres guardrails que gobiernan todo lo demás:

1. **Calidez con precisión** — colores cálidos y copy cercano en landing/errors; precisión neutra en reference/schemas.
2. **Motion con propósito** — cada animación tiene que significar algo (entrega, carga, transición). Nada decorativo por decorativo.
3. **Densidad respira** — breathing room generoso en landing, tablas densas solo en reference.

---

## 2. Paleta y uso de color

Tokens canónicos (definidos en `src/styles/global.css`):

| Token | Hex | Rol |
|---|---|---|
| `bipbip-red` | `#E30613` | **Primary action** — CTAs, links importantes, iconos de sección hero |
| `bipbip-red-dark` | `#C7001A` | Hover de rojo |
| `bipbip-red-darker` | `#940013` | Gradiente + focus ring |
| `bipbip-yellow` | `#FDC300` | **Positive accent** — tips útiles, badges "nuevo", highlights de info positiva |
| `bipbip-yellow-warm` | `#FBBA00` | Variante más cálida del amarillo para gradientes |
| `bipbip-orange` | `#F68524` | **Mid-tone warning** — advertencias suaves, steps activos, acentos de transición |
| `bipbip-black` | `#000000` | Solo para texto high-contrast sobre fondo amarillo |

### Jerarquía de color (regla de oro)

Los tres colores de marca **no son intercambiables** — cada uno tiene un rol:

- **Rojo** = "mirá esto / hacé esto ahora" (primary CTA, errores, elementos críticos)
- **Amarillo** = "esto te conviene saber" (tips, positive states, success, info útil)
- **Naranja** = "hay algo entre medio" (warnings que no son críticos, steps intermedios)

No usar los tres al mismo nivel en una misma sección — siempre debe haber un color dominante.

### Gradiente oficial de marca

`from-bipbip-red via-bipbip-orange to-bipbip-yellow` (o red→orange para versión más sobria).

Uso: hero title highlight, scroll progress bar, step numbers, rare emphasis moments. **Máximo 1 gradiente visible por viewport** — si hay más es ruido.

### Dark mode

- Background base: `#0A0A0B` (`surface-dark`) — casi negro neutro
- **Ligero tint cálido recomendado**: `#0C0A0A` (imperceptible pero da warmth). Aplicar cuando se refactorice, no urgente.
- Cards raised: `#141415` (`surface-dark-raised`)
- Cards elevated (hover): `#1E1E20` (`surface-dark-elevated`)
- Borders: `#2A2A2D` (`border-dark`)

### Contrast rules

- **Amarillo `#FDC300`**: nunca como color de texto largo sobre fondo blanco (falla WCAG AA). OK como fill de badges, borders, y texto sobre dark.
- **Rojo `#E30613`**: OK como color de texto sobre blanco o dark. 4.5:1 en ambos.
- **Body text**: `text-neutral-900 dark:text-white` para headings, `text-neutral-600 dark:text-neutral-400` para body.

---

## 3. Tipografía

### Fuentes

- **Sans** (body + headings): `Poppins` — 300/400/500/600/700 (+900 Black para H1s display)
- **Mono** (code): `JetBrains Mono` — 400/500

### Escala

| Elemento | Tamaño | Weight | Tracking |
|---|---|---|---|
| H1 (landing hero) | `text-5xl md:text-6xl lg:text-7xl` | `font-black` (900) | `tracking-tighter` |
| H1 (docs pages) | `text-3xl md:text-4xl` | `font-bold` (700) | `tracking-tight` |
| H2 (sections) | `text-2xl md:text-3xl` | `font-bold` | `tracking-tight` |
| H3 (subsections) | `text-xl` | `font-semibold` | default |
| H4 / step titles | `text-lg` | `font-semibold` | default |
| Body | `text-base` (16) / `text-lg` (17 en prose) | `font-normal` | default |
| Small / captions | `text-sm` (14) / `text-xs` (12) | `font-medium` para labels | default |
| Code inline | `text-sm` | `font-mono` | default |

### Headline gradient utility

Clase `.brand-headline` (por agregar a `global.css`):

```css
.brand-headline {
  background: linear-gradient(
    to right,
    var(--color-bipbip-red),
    var(--color-bipbip-orange),
    var(--color-bipbip-yellow)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

Uso: únicamente en una palabra/frase clave del H1 del landing y del 404. Nunca en H2 o inferiores.

### Inline code

En prose, `<code>` inline usa:
- Light: `bg-neutral-100 text-bipbip-red px-1.5 py-0.5 rounded text-sm font-mono`
- Dark: `dark:bg-surface-dark-elevated dark:text-bipbip-yellow`

**El amarillo** en code inline en dark mode es una de las firmas visuales del portal — mantener.

---

## 4. Voice & tone

Dos voces según contexto:

### Voice A — "Close" (landing, errors, success, callouts informales)

Tono: **Honduran-warm + directo**, usando imperativo profesional sin slang. Ejemplos:
- "Leé la guía" ✅ (imperativo español)
- "Al driver se le cruzó el GPS" ✅ (404, playful)
- "¡Listo! Tu webhook ya está firmado" ✅ (success)
- "Antes de arrancar" ✅ (callout preface)
- "Ojo acá" ✅ (warning)

NO usar:
- Modismos regionales fuertes ("vos, loco", "che", "mae")
- Jerga muy colloquial
- Emojis excesivos (OK uno puntual si suma)

En inglés: warm + direct, imperativo profesional, ej:
- "Read the guide", "Before you start", "Heads up", "You're set!"

### Voice B — "Precise" (REST reference, schemas, glossary, technical tables)

Tono: **neutro, preciso, sin personalidad**. Like Stripe API docs. Ejemplos:
- "Accepts a pending order. Transitions from Pending to Accepted."
- "Required. String. Opaque order identifier."
- "Returns 202 on success. 409 if idempotency conflict."

NO mezclar voice A en reference — si un dev busca el shape de un response, no quiere frases cálidas.

### Reglas de aplicación

| Contexto | Voice | Ejemplo |
|---|---|---|
| Hero subtitle | A | "Tu POS recibe órdenes vía webhook firmado con HMAC…" |
| Landing cards | A | "Verificá la firma HMAC y respondé `200 OK`." |
| Callouts info/warning/danger | A con info técnica | "Ojo: el `remoteOrderId` es obligatorio. Sin él BipBip reintenta." |
| Guide prose (quickstart, HMAC) | A | "Capturá los bytes crudos ANTES de parsear el JSON." |
| Troubleshooting | A (mostly) | "Síntoma: …", "Causa: …", "Cómo arreglarlo: …" |
| REST endpoint descriptions | B | "Accept an order. Body: `{remoteOrderId}`. Idempotent." |
| Schema field tables | B | "String. Required. Max 36 chars." |
| Error tables | B | "409 Conflict — Idempotency-Key reused with different body." |
| 404 / empty states | A extra cálido | "Al driver se le cruzó el GPS." |

---

## 5. Motion

### Principios

- **Duración**: 150–400ms para micro-interacciones, 180–280ms para page transitions
- **Easing**: `cubic-bezier(0, 0, 0.2, 1)` (ease-out) por default; `cubic-bezier(0.4, 0, 1, 1)` (ease-in) para exits
- **Accesibilidad**: TODA animación debe estar cubierta por `@media (prefers-reduced-motion: reduce)` — ya existe el guard global en `global.css`, extenderlo al agregar nuevas

### Catálogo de moments aprobados

| Moment | Dónde | Cuándo |
|---|---|---|
| Scroll progress bar | Top de cada página | Siempre, cambio a `pulse-yellow` en los últimos 5% |
| View transitions (fade+slide) | Entre rutas | Automático |
| Reveal stagger (`[data-animate]`) | Secciones de content | Al entrar al viewport |
| Sidebar stagger | Sidebar de docs al load | Solo primeros 3 items, cap 170ms |
| Hero typewriter | Landing hero | Continuo, pausa 2s entre palabras |
| Counters | Landing hero stats | Al entrar al viewport, 1.5s |
| Tilt cards (3D) | FeatureCards del landing | Solo en hover |
| Float icons | Fondo global via Layout | Loop continuo |
| Logo click pulse | Header logo | On click (Easter egg light) |
| Card icon micro-rotate | Resource cards del landing | En hover |

### Don'ts

- No parallax en landing — añade complejidad sin contar historia
- No auto-play de cualquier cosa que ocupe >10% del viewport
- No typewriter fuera del hero
- No más de **una** animación "wow" por sección

---

## 6. Uso de assets

Assets disponibles (`public/iconografia/`):

| Asset | Cuándo usar |
|---|---|
| `Tipo=Primario, Versión=Default.svg` | Logo principal, headers oscuros |
| `Tipo=Alternativa, Versión=Blanco.svg` | Logo sobre fondo rojo/oscuro |
| `Tipo=Alternativa, Versión=Negro.svg` | Logo sobre fondo amarillo/claro |
| `Tipo=Alternativa, Versión=Amarillo.svg` | Accent version |
| `Bolsa de papel 1.svg` / `1-1.svg` | Decoración en FeaturesGrid, Hero side |
| `Cubiertos 1.svg` | **Disponible, underutilizado** — usar en CodePreview o docs side decoration |
| `renderizado-3d-icono-entrega 1.svg` | GettingStarted, "signature moment" futuro en Hero |
| `Patron.svg` | Watermark en CTAFooter (existente), extensible a 404 y empty states |

### Reglas de uso

- Assets de fondo: opacity `0.05–0.12` light, `0.03–0.08` dark
- Assets de señal (inline, foreground): opacity 1
- Rotación ligera (-15° a +15°) da dinamismo; mayor rotación confunde
- Nunca stretch/distort — respetar aspect ratio

---

## 7. Componentes canónicos

### Callout (`src/components/docs/Callout.astro`)

Tipos y uso:

- `info` (azul): neutro, info adicional. Heading en azul, body neutral.
- `warning` (ámbar): advertencias suaves. "Ojo con…". Heading ámbar, body neutral.
- `danger` (rojo): **críticos**. Errores que rompen la integración si se ignoran. Heading rojo, body neutral.
- **tip** (yellow) — *a agregar*: consejos positivos ("Pro tip", "Recomendamos"). Heading yellow, body neutral.

### EndpointCard

Siempre usar para documentar un endpoint REST. Método en badge colorizado (GET/POST/PUT/DELETE/PATCH). Path monospace. Description una frase directa en voice B. Response code expandible.

### TabbedCode

Siempre para code samples multi-lenguaje (Node/Python/C#/PHP). No duplicar blocks.

---

## 8. Don'ts globales

- **No mezclar voice A y voice B en la misma sección**
- **No usar los 3 colores brand (red/yellow/orange) como peers en la misma composición** — siempre uno dominante
- **No headings H1 sin tracking-tight o tracking-tighter**
- **No text-yellow-* sobre fondo claro** — WCAG AA falla
- **No animaciones sin guard de `prefers-reduced-motion`**
- **No emojis en reference docs** (schemas, endpoint tables, error codes)
- **No mezclar inglés y español en un mismo string** — cada idioma tiene su dict en `src/i18n/`
- **No hardcodear `/docs` en links** de componentes compartidos — usar `getRelativeLocaleUrl(locale, path)`

---

## 9. Checklist antes de mergear UI

- [ ] Textos agregados/modificados están en `src/i18n/es.ts` Y `src/i18n/en.ts`
- [ ] Voice correcta según contexto (A vs B)
- [ ] Colores usan tokens BipBip, no hex literal
- [ ] Jerarquía de color respetada (red / yellow / orange con roles)
- [ ] Animaciones nuevas tienen guard `prefers-reduced-motion`
- [ ] Links internos usan `getRelativeLocaleUrl`
- [ ] Assets de marca usados respetan rangos de opacity
- [ ] Typography scale respetada (H1-H4 con weights/tracking correctos)
- [ ] Dark mode contrastado (WCAG AA mínimo)

---

*Última actualización: 2026-04-20*
