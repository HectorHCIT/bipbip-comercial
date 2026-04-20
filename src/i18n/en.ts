export const ui = {
  nav: {
    guide: 'Guide',
    webhook: 'Webhook',
    restApi: 'REST API',
    portal: 'Portal',
    changelog: 'Changelog',
    searchShort: 'Search...',
  },
  footer: {
    integrationHeader: 'Integration',
    supportHeader: 'Support',
    connectHeader: 'Connect',
    guideLink: 'Integration guide',
    webhookLink: 'Webhook spec',
    restApiLink: 'REST API reference',
    portalLink: 'Portal (Self-service)',
    termsLink: 'Terms of service',
  },
  search: {
    placeholder: 'Search pages, guide, endpoints...',
    shortcutNavigate: '↑↓ Navigate',
    shortcutOpen: '↵ Open',
    shortcutClose: 'esc Close',
    emptyState: 'No results for',
    groupPages: 'Pages',
    groupDocs: 'Documentation',
    groupEndpoints: 'API Endpoints',
    groupChangelog: 'Changelog',
  },
  notFound: {
    title: 'This route got lost on the way',
    subtitle: "Looks like this endpoint does not exist. The driver's GPS got tangled.",
    backHome: 'Back to home',
    readGuide: 'Read the guide',
  },
  hero: {
    headline: 'Integrate your POS with',
    typewriter: ['BipBip', 'HMAC webhooks', 'the REST API', 'the order lifecycle'],
    typewriterAriaLabel: 'BipBip, HMAC webhooks, the REST API, the order lifecycle',
    subtitle:
      'Two API contracts and a step-by-step guide. Your POS receives orders via HMAC-signed webhooks, confirms them via REST, and advances the status until delivery.',
    statContracts: 'API contracts',
    statLanguages: 'Languages supported',
    statHmacBits: 'HMAC-SHA bits',
    ctaReadGuide: 'Read the guide',
  },
  features: {
    sectionTitle: 'Three resources, one integration',
    sectionSubtitle:
      'Integrating with BipBip is made up of two complementary API contracts and a step-by-step guide that ties them together.',
    // Resource cards
    webhookBadge: 'Outbound · You implement it',
    webhookTitle: 'Webhook spec',
    webhookDesc:
      'BipBip sends every new order to your POS via <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono text-bipbip-red dark:text-bipbip-yellow">POST /v1/order/{remoteId}</code>. Verify the HMAC signature and respond with <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono">200 OK</code>.',
    webhookCta: 'View reference →',
    restApiBadge: 'Inbound · You call it',
    restApiTitle: 'REST API reference',
    restApiDesc:
      'Your POS calls BipBip to accept, reject, advance the status and query orders. Authenticate with <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono">X-Bipbip-Api-Key</code> and send an <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-[11px] font-mono">Idempotency-Key</code> on every mutation.',
    restApiCta: 'View reference →',
    guideBadge: 'Guide · Learn how to integrate',
    guideTitle: 'Integration guide',
    guideDesc:
      'Step-by-step quickstart with real code in 4 languages, HMAC verification with tested samples, troubleshooting and a complete glossary of contract terms.',
    guideCta: 'Read the guide →',
    // Feature highlight row
    highlightTitle: 'Designed for reliable integrations',
    hmacTitle: 'HMAC-SHA256 signature',
    hmacDesc:
      'Every webhook is signed with HMAC-SHA256 over {timestamp}.{rawBody}. Reject requests older than 5 minutes to block replays.',
    deliveryTitle: 'At-least-once delivery',
    deliveryDesc:
      'Every attempt carries the same X-Bipbip-Delivery-Id. Dedupe on that UUID and tolerate retries without creating duplicate orders.',
    idempotencyTitle: 'Idempotency-Key required',
    idempotencyDesc:
      'Send a unique UUID per logical attempt on every REST mutation. 24h cache, safe retries without side effects.',
    samplesTitle: 'Samples in 4 languages',
    samplesDesc:
      'Node.js, Python, C# and PHP. All use stdlib only — no external dependencies. Copy-paste and go.',
    stateMachineTitle: 'Clear state machine',
    stateMachineDesc:
      'Pending → Accepted → Preparing → Ready → HandedOver. Rejected and Cancelled are terminal. No ambiguity.',
    versioningTitle: 'Path-based versioning',
    versioningDesc:
      'Everything runs under /v1/. When v2 lands you can run both in parallel while you migrate — no surprise breaking changes.',
  },
  codePreview: {
    badge: 'Security',
    title: 'Verify every webhook with HMAC',
    paragraphHtml:
      'BipBip signs every request with HMAC-SHA256 over <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1.5 py-0.5 text-sm font-mono text-bipbip-red dark:text-bipbip-yellow">{timestamp}.{rawBody}</code>. Capture the raw bytes, validate the timestamp (max. 300s skew) and compare in constant time.',
    bullet1: 'Standard library only — no external dependencies',
    bullet3Html:
      'Capture the raw body before <code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-xs font-mono">JSON.parse</code>',
    cta: 'Read the full HMAC guide',
  },
  gettingStarted: {
    title: 'The 4 steps to go live',
    subtitle:
      'From "I have my credentials" to "I received and confirmed my first order" without help from the BipBip team.',
    steps: [
      {
        title: 'Implement the webhook',
        desc: 'Expose POST /v1/order/{remoteId} on your POS. Capture the raw body before parsing the JSON.',
      },
      {
        title: 'Verify the HMAC signature',
        desc: 'Recompute HMAC-SHA256 over {timestamp}.{rawBody} and compare in constant time.',
      },
      {
        title: 'Respond with remoteOrderId',
        desc: 'Return HTTP 200 with { "remoteOrderId": "..." }. Without that field BipBip will retry.',
      },
      {
        title: 'Accept via REST API',
        desc: 'Call POST /api/v1/Orders/{orderKey}/accept with X-Bipbip-Api-Key and Idempotency-Key.',
      },
    ],
    calloutTitle: 'Before you start',
    calloutSubtitle: 'BipBip hands you these during onboarding',
    prereqHmac: 'HMAC Secret (one per account)',
    prereqApiKey: 'API Key (<code class="rounded bg-neutral-100 dark:bg-surface-dark-elevated px-1 py-0.5 text-xs font-mono">X-Bipbip-Api-Key</code>)',
    prereqRemoteId: 'remoteId (one per store)',
    prereqBaseUrl: 'Registered base URL (public)',
  },
  ctaFooter: {
    title: 'Ready to integrate your POS with BipBip?',
    subtitle: 'Coordinate with the team to get your credentials and kick off the pilot in production.',
    readGuide: 'Read the guide',
  },
} as const;
