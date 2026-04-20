export const ui = {
  nav: {
    guide: 'Guía',
    webhook: 'Webhook',
    restApi: 'REST API',
    portal: 'Portal',
    changelog: 'Changelog',
    searchShort: 'Buscar...',
  },
  footer: {
    integrationHeader: 'Integración',
    supportHeader: 'Soporte',
    connectHeader: 'Conectar',
    guideLink: 'Guía de integración',
    webhookLink: 'Webhook Spec',
    restApiLink: 'REST API Reference',
    portalLink: 'Portal (Autogestión)',
    termsLink: 'Términos de uso',
  },
  search: {
    placeholder: 'Buscar páginas, guía, endpoints...',
    shortcutNavigate: '↑↓ Navegar',
    shortcutOpen: '↵ Abrir',
    shortcutClose: 'esc Cerrar',
    emptyState: 'Sin resultados para',
    groupPages: 'Páginas',
    groupDocs: 'Documentación',
    groupEndpoints: 'Endpoints API',
    groupChangelog: 'Changelog',
  },
  notFound: {
    title: 'Esta ruta se perdió en el camino',
    subtitle: 'Parece que este endpoint no existe. Al driver se le cruzó el GPS.',
    backHome: 'Volver al inicio',
    readGuide: 'Leer la guía',
  },
  hero: {
    headline: 'Integrá tu POS con',
    typewriter: ['BipBip', 'webhooks HMAC', 'la REST API', 'el ciclo de la orden'],
    typewriterAriaLabel: 'BipBip, webhooks HMAC, la REST API, el ciclo de la orden',
    subtitle:
      'Dos contratos de API y una guía paso a paso. Tu POS recibe órdenes vía webhook firmado con HMAC, las confirma por REST y avanza el estado hasta la entrega.',
    statContracts: 'Contratos API',
    statLanguages: 'Lenguajes soportados',
    statHmacBits: 'Bits HMAC-SHA',
    ctaReadGuide: 'Leer la guía',
  },
  features: {
    sectionTitle: 'Tres recursos, una integración',
    sectionSubtitle:
      'La integración con BipBip se compone de dos contratos de API complementarios y una guía paso a paso para unirlos.',
    // Resource cards
    webhookBadge: 'Outbound · Vos lo implementás',
    webhookTitle: 'Webhook Spec',
    webhookDesc:
      'BipBip envía cada orden nueva a tu POS vía <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono text-bipbip-red dark:text-bipbip-yellow">POST /v1/order/{remoteId}</code>. Verificá la firma HMAC y respondé <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono">200 OK</code>.',
    webhookCta: 'Ver referencia →',
    restApiBadge: 'Inbound · Vos la llamás',
    restApiTitle: 'REST API Reference',
    restApiDesc:
      'Tu POS llama a BipBip para aceptar, rechazar, avanzar el estado y consultar órdenes. Autenticá con <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono">X-Bipbip-Api-Key</code> y mandá un <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono">Idempotency-Key</code> en cada mutación.',
    restApiCta: 'Ver referencia →',
    guideBadge: 'Guía · Aprendé a integrar',
    guideTitle: 'Guía de integración',
    guideDesc:
      'Quickstart paso a paso con código real en 4 lenguajes, verificación HMAC con samples probados, troubleshooting y glosario completo de términos del contrato.',
    guideCta: 'Leer la guía →',
    // Feature highlight row
    highlightTitle: 'Diseñado para integraciones confiables',
    hmacTitle: 'Firma HMAC-SHA256',
    hmacDesc:
      'Cada webhook se firma con HMAC-SHA256 sobre {timestamp}.{rawBody}. Rechazá requests mayores a 5 minutos para bloquear replays.',
    deliveryTitle: 'Entrega at-least-once',
    deliveryDesc:
      'Cada intento lleva el mismo X-Bipbip-Delivery-Id. Deduplica con ese UUID y tolerá reintentos sin crear órdenes duplicadas.',
    idempotencyTitle: 'Idempotency-Key obligatoria',
    idempotencyDesc:
      'Mandá un UUID único por intento lógico en cada mutación REST. 24h de caché, reintentos seguros sin efectos dobles.',
    samplesTitle: 'Samples en 4 lenguajes',
    samplesDesc:
      'Node.js, Python, C# y PHP. Todos usan solo librería estándar — sin dependencias externas. Copy-paste y andá.',
    stateMachineTitle: 'Máquina de estados clara',
    stateMachineDesc:
      'Pending → Accepted → Preparing → Ready → HandedOver. Rejected y Cancelled son terminales. Sin ambigüedades.',
    versioningTitle: 'Versionado en el path',
    versioningDesc:
      'Todo corre bajo /v1/. Cuando llegue v2 podrás correrlas en paralelo mientras migrás — sin breaking changes sorpresivos.',
  },
  codePreview: {
    badge: 'Seguridad',
    title: 'Verificá cada webhook con HMAC',
    paragraphHtml:
      'BipBip firma cada request con HMAC-SHA256 sobre <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1.5 py-0.5 text-sm font-mono text-bipbip-red dark:text-bipbip-yellow">{timestamp}.{rawBody}</code>. Capturá los bytes crudos, validá el timestamp (máx. 300s de skew) y compará en tiempo constante.',
    bullet1: 'Solo librería estándar — sin dependencias externas',
    bullet3Html:
      'Capturá el raw body antes de <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-xs font-mono">JSON.parse</code>',
    cta: 'Ver la guía completa de HMAC',
  },
  gettingStarted: {
    title: 'Los 4 pasos para estar en vivo',
    subtitle:
      'De "tengo mis credenciales" a "recibí y confirmé mi primera orden" sin intervención del equipo BipBip.',
    steps: [
      {
        title: 'Implementá el webhook',
        desc: 'Exponé POST /v1/order/{remoteId} en tu POS. Capturá el raw body antes de parsear el JSON.',
      },
      {
        title: 'Verificá la firma HMAC',
        desc: 'Recomputá HMAC-SHA256 sobre {timestamp}.{rawBody} y comparalo en tiempo constante.',
      },
      {
        title: 'Respondé con remoteOrderId',
        desc: 'Devolvé HTTP 200 con { "remoteOrderId": "..." }. Sin ese campo BipBip reintenta.',
      },
      {
        title: 'Aceptá por REST API',
        desc: 'Llamá POST /api/v1/Orders/{orderKey}/accept con X-Bipbip-Api-Key e Idempotency-Key.',
      },
    ],
    calloutTitle: 'Antes de arrancar',
    calloutSubtitle: 'BipBip te entrega estos elementos durante el onboarding',
    prereqHmac: 'HMAC Secret (una por cuenta)',
    prereqApiKey: 'API Key (<code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-xs font-mono">X-Bipbip-Api-Key</code>)',
    prereqRemoteId: 'remoteId (uno por tienda)',
    prereqBaseUrl: 'Base URL registrada (pública)',
  },
  ctaFooter: {
    title: '¿Listo para integrar tu POS con BipBip?',
    subtitle: 'Coordiná con el equipo para recibir tus credenciales y arrancá el piloto en producción.',
    readGuide: 'Leer la guía',
  },
} as const;
