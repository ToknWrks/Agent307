import { CheckCircle, Circle } from "lucide-react";

interface TodoItem {
  label: string;
  detail: string;
  done: boolean;
}

interface TodoGroup {
  title: string;
  items: TodoItem[];
}

function getSetupStatus(): TodoGroup[] {
  const env = process.env;

  return [
    {
      title: "AI Business Plan",
      items: [
        {
          label: "Set ANTHROPIC_API_KEY in .env.local",
          detail: "Get your API key at console.anthropic.com. Powers the AI business plan generator at /business-plan.",
          done: !!env.ANTHROPIC_API_KEY,
        },
      ],
    },
    {
      title: "Database (Neon)",
      items: [
        {
          label: "Create a Neon project at neon.tech",
          detail: "Free tier is fine for getting started.",
          done: !!env.DATABASE_URL,
        },
        {
          label: "Set DATABASE_URL in .env.local",
          detail: "Copy the connection string from your Neon dashboard.",
          done: !!env.DATABASE_URL,
        },
        {
          label: "Run the DB schema",
          detail:
            "Tables needed: leads, reservations, registration_requests. See app/lib/db.ts for column shapes.",
          done: !!env.DATABASE_URL,
        },
      ],
    },
    {
      title: "Email (Resend)",
      items: [
        {
          label: "Create a Resend account at resend.com",
          detail: "Verify your sending domain so emails don't land in spam.",
          done: !!env.RESEND_API_KEY,
        },
        {
          label: "Set RESEND_API_KEY in .env.local",
          detail: "Found under API Keys in the Resend dashboard.",
          done: !!env.RESEND_API_KEY,
        },
        {
          label: "Set NOTIFICATION_EMAIL in .env.local",
          detail: "This is where new lead and purchase alerts are sent.",
          done: !!env.NOTIFICATION_EMAIL,
        },
      ],
    },
    {
      title: "Stripe",
      items: [
        {
          label: "Set STRIPE_SECRET_KEY in .env.local",
          detail: "Found under Developers → API Keys in your Stripe dashboard.",
          done: !!env.STRIPE_SECRET_KEY,
        },
        {
          label: "Create a Reservation price ($99) and set STRIPE_PRICE_RESERVATION",
          detail: "Create a one-time product in Stripe and copy the price ID (price_...).",
          done: !!env.STRIPE_PRICE_RESERVATION,
        },
        {
          label: "Create a Wyoming Formation price and set STRIPE_PRICE_WY_FORMATION",
          detail: "One-time product for Wyoming LLC formation.",
          done: !!env.STRIPE_PRICE_WY_FORMATION,
        },
        {
          label: "Create a Delaware Formation price and set STRIPE_PRICE_DE_FORMATION",
          detail: "One-time product for Delaware LLC formation.",
          done: !!env.STRIPE_PRICE_DE_FORMATION,
        },
        {
          label: "Create Annual Service subscription price ($100/yr) and set STRIPE_PRICE_ANNUAL_SERVICE",
          detail: "Create a recurring annual product in Stripe. Copy the price ID (price_...).",
          done: !!env.STRIPE_PRICE_ANNUAL_SERVICE,
        },
        {
          label: "Set STRIPE_WEBHOOK_SECRET in .env.local",
          detail:
            "Run `stripe listen --forward-to localhost:3001/api/webhook` locally to get the secret.",
          done: !!env.STRIPE_WEBHOOK_SECRET,
        },
        {
          label: "Set CRON_SECRET in .env.local and Vercel env vars",
          detail: "Random string used to secure the /api/cron/annual-reminders endpoint. Generate with: openssl rand -hex 32",
          done: !!env.CRON_SECRET,
        },
      ],
    },
    {
      title: "Registered Agent Service Setup",
      items: [
        {
          label: "Form your Wyoming registered agent LLC",
          detail: "File Articles of Organization on wyobiz.wyo.gov ($60). This is the entity that will appear on all customer filings.",
          done: false,
        },
        {
          label: "Register as a Commercial Registered Agent with Wyoming SOS",
          detail: "Required to provide registered agent services commercially. File at wyobiz.wyo.gov — $100/year.",
          done: false,
        },
        {
          label: "Confirm your Wyoming physical address with your registered agent",
          detail: "Must be a physical address (no P.O. boxes). Someone must be available during business hours to receive legal documents.",
          done: !!env.REGISTERED_AGENT_ADDRESS,
        },
      ],
    },
    {
      title: "Formation Documents",
      items: [
        {
          label: "Set REGISTERED_AGENT_NAME in .env.local",
          detail: "Your name or business name that will appear as registered agent on formation docs.",
          done: !!env.REGISTERED_AGENT_NAME,
        },
        {
          label: "Set REGISTERED_AGENT_ADDRESS in .env.local",
          detail: "A physical Wyoming address (no P.O. boxes). Required by Wyoming SOS.",
          done: !!env.REGISTERED_AGENT_ADDRESS,
        },
        {
          label: "Set ORGANIZER_NAME in .env.local",
          detail: "The person or company signing the Articles of Organization as organizer.",
          done: !!env.ORGANIZER_NAME,
        },
      ],
    },
    {
      title: "LLC Name Check",
      items: [
        {
          label: "Set COBALT_API_KEY (optional)",
          detail:
            "Primary name availability source. Falls back to OpenCorporates if not set.",
          done: !!env.COBALT_API_KEY,
        },
        {
          label: "Set OPENCORPORATES_API_KEY (optional)",
          detail: "Fallback name availability source if Cobalt is not configured.",
          done: !!env.OPENCORPORATES_API_KEY,
        },
      ],
    },
    {
      title: "Branding & Site",
      items: [
        {
          label: "Set NEXT_PUBLIC_SITE_URL in .env.local",
          detail: "Your production domain, e.g. https://yourdomain.com.",
          done: !!env.NEXT_PUBLIC_SITE_URL && env.NEXT_PUBLIC_SITE_URL !== "https://agentsand.co",
        },
        {
          label: "Update copy and pricing in app/lib/constants.ts",
          detail: "FAQ text, state data, pricing tiers, and site-wide copy all live here.",
          done: false,
        },
      ],
    },
  ];
}

export default function AdminPage() {
  const groups = getSetupStatus();
  const allItems = groups.flatMap((g) => g.items);
  const doneCount = allItems.filter((i) => i.done).length;
  const totalCount = allItems.length;
  const pct = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tighter mb-1">Setup Checklist</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {doneCount} of {totalCount} steps complete ({pct}%)
      </p>

      <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full mb-8">
        <div
          className="h-1.5 bg-[#A8F1F7] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  {item.done ? (
                    <CheckCircle className="mt-0.5 shrink-0 w-4 h-4 text-[#A8F1F7]" />
                  ) : (
                    <Circle className="mt-0.5 shrink-0 w-4 h-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className={item.done ? "line-through text-muted-foreground text-sm" : "text-sm"}>
                      {item.label}
                    </p>
                    {!item.done && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
