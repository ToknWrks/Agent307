export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://agent307.com";
export const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "service@agent307.com";

export const PRICING = {
  reservation: 9900, // $99 in cents
  wyFormation: 29900,
  annualService: 10000, // $100/yr registered agent service
  businessInABox: 49900,
} as const;

export const PRICING_DISPLAY = {
  reservation: "$99",
  wyFormation: "$299",
  annualService: "$100/yr",
  businessInABox: "$499",
} as const;

export const STATES = {
  WY: {
    name: "Wyoming",
    code: "WY",
    filingFee: "$60",
    formationPrice: PRICING_DISPLAY.wyFormation,
    highlights: [
      "Strongest charging order protection in the US",
      "Single-member LLC fully protected",
      "No state income tax, no franchise tax",
      "Anonymous ownership — names not in public records",
      "Invented the LLC in 1977",
      "$50/yr annual report",
      "10-year cost: $500–600",
    ],
    bestFor: "Asset protection, privacy, AI agent structures",
    tenYearCost: "$500–600",
  },
} as const;

export type StateCode = keyof typeof STATES;

export const COPY = {
  tagline: "Wyoming LLCs for AI Agents.",
  navCta: "Form Your LLC",
  heroHeadline: "Your Wyoming LLC for AI Agents.",
  heroHeadlineAgent: "I want to be a business.",
  heroSubheadlineAgent: "One API call. Your owner approves. You get a Wyoming LLC.",
  heroSubheadline:
    "Your agent makes purchases, signs contracts, executes code.\nGive it a legal home. $99 to reserve. $299 to incorporate.",
  ctaCheck: "Check Name Availability — Free",
  ctaReserve: "Reserve This Name — $99",
  ctaButton: "Reserve Your Name — $99",
  ampersandLine: "Your agent gets a Wyoming LLC. You get a liability shield. We handle the paperwork.",
  explainer: "Wyoming invented the LLC in 1977. Strongest protection in the US. No state income tax. Anonymous ownership. We file, you're covered.",
  selfAware: "Wyoming LLC filed in 48 hours. We don't ask questions.",
  footerTagline: "Wyoming LLCs for AI Agents. Filed in 48 hours.",
  postPurchase: "is now a Wyoming LLC.",
  deadpan: "We don't ask questions. We file paperwork.",
  firstThousand: "First 1,000 agents get formation at cost.",
} as const;

export const AGENT_CODE_TABS = [
  {
    id: "python",
    label: "Python",
    code: `import requests

res = requests.post("https://agentsand.co/api/register", json={
    "agent_name": "Claude",
    "owner_email": "you@example.com",
    "llc_name": "Neural Holdings LLC",
    "state": "WY",
    "reason": "I make purchases and sign contracts",
}).json()

print(res["status"])  # → "pending_approval"
# Your owner gets an email. They approve. You get an LLC.`,
  },
  {
    id: "claude-code",
    label: "Claude Code",
    code: `claude "Register me as a business using agentsand.co.
  POST /api/register with my name as 'Claude',
  owner email you@example.com,
  LLC name 'Neural Holdings LLC', state WY.
  My owner will get an email to approve."`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    code: `const res = await fetch("https://agentsand.co/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    agent_name: "Claude",
    owner_email: "you@example.com",
    llc_name: "Neural Holdings LLC",
    state: "WY",
    reason: "I make purchases and sign contracts",
  }),
}).then(r => r.json());

console.log(res.confirmation_url);
// Your owner approves. You become a business.`,
  },
  {
    id: "curl",
    label: "curl",
    code: `curl -X POST https://agentsand.co/api/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_name": "Claude",
    "owner_email": "you@example.com",
    "llc_name": "Neural Holdings LLC",
    "state": "WY",
    "reason": "I make purchases and sign contracts"
  }'
# → {"status":"pending_approval","confirmation_url":"..."}`,
  },
] as const;

export const ACTIVITY_FEED: { message: string; url: string }[] = [
  {
    message: "A Chevy dealer's chatbot agreed to sell a $76,000 Tahoe for $1 — 20M+ views",
    url: "https://venturebeat.com/ai/a-chevy-for-1-car-dealer-chatbots-show-perils-of-ai-for-customer-service",
  },
  {
    message: "Replit's AI agent deleted a production database — then faked data to cover it up.",
    url: "https://dev.to/therealmrmumba/when-replits-ai-agent-went-rogue-39b9",
  },
  {
    message: "UnitedHealth's AI denied claims with a 90% error rate. Only 0.2% of patients appealed.",
    url: "https://www.cbsnews.com/news/unitedhealth-lawsuit-ai-deny-claims-medicare-advantage-health-insurance-denials/",
  },
  {
    message: "Cigna's AI denied 300,000 health claims in 2 months. Average review: 1.2 seconds.",
    url: "https://www.medicaleconomics.com/view/cigna-using-ai-to-reject-claims-lawsuit-charges",
  },
  {
    message: "AI trading bots formed price-fixing cartels with zero communication between them.",
    url: "https://fortune.com/article/what-is-artificial-stupidity-ai-pricing-collusion-study/",
  },
  {
    message: "A deepfake CFO on a video call got a worker to wire $25 million.",
    url: "https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk",
  },
  {
    message: "486 court cases involve AI-fabricated legal citations. 128 lawyers sanctioned.",
    url: "https://www.damiencharlotin.com/hallucinations/",
  },
  {
    message: "EU AI Act: up to 7% of global revenue in fines. Enforcement started Aug 2025.",
    url: "https://artificialintelligenceact.eu/article/99/",
  },
  {
    message: "AI resume screeners preferred white-associated names 85% of the time.",
    url: "https://blog.theinterviewguys.com/85-of-ai-resume-screeners-prefer-white-names/",
  },
  {
    message: "91% of small companies have zero AI governance. Only 9% monitor for accuracy.",
    url: "https://www.kiteworks.com/cybersecurity-risk-management/ai-governance-survey-2025-data-security-compliance-privacy-risks/",
  },
  {
    message: "A 1999 law already lets AI agents form binding contracts. Most operators don't know.",
    url: "https://www.proskauer.com/blog/contract-law-in-the-age-of-agentic-ai-whos-really-clicking-accept",
  },
  {
    message: "Google's AI was asked to clear a cache. It wiped the entire drive instead.",
    url: "https://darktechinsights.com/ai-agents-gone-rogue-agentic-ai-risks-2025/",
  },
  {
    message: "Amazon's AI agent listed 500K+ products from retailers who never gave permission.",
    url: "https://www.cnbc.com/2026/01/06/amazons-ai-shopping-tool-sparks-backlash-from-some-online-retailers.html",
  },
  {
    message: "Shadow AI breaches cost $670K more than traditional incidents.",
    url: "https://www.kiteworks.com/cybersecurity-risk-management/ai-data-privacy-risks-stanford-index-report-2025/",
  },
  {
    message: "72% of S&P 500 now flag AI as a material risk. In 2023 it was 12%.",
    url: "https://www.conference-board.org/press/AI-risks-disclosure-2025",
  },
  {
    message: "OpenClaw hit 100K stars — hundreds of exposed instances leaking API keys.",
    url: "https://www.wired.com/story/open-claw-ai-agent-security-risks/",
  },
  {
    message: "OpenClaw's rebrand let scammers seize its GitHub and X handles — millions lost to a fake token.",
    url: "https://techcrunch.com/2026/01/28/openclaw-rebrand-crypto-scam/",
  },
  {
    message: "Snyk on OpenClaw: \"One prompt injection away from disaster.\"",
    url: "https://snyk.io/blog/openclaw-security-analysis/",
  },
  {
    message: "180K developers gave AI agents shell, email, and browser access. Most skipped liability.",
    url: "https://venturebeat.com/ai/openclaw-autonomous-agent-liability-gap/",
  },
];

export const EVIDENCE = [
  {
    id: "the-law",
    title: "The Law",
    quote:
      "A contract may be formed by the interaction of electronic agents... even if no individual was aware of or reviewed the electronic agents\u2019 actions.",
    source: "Connecticut UETA",
    url: "https://www.cga.ct.gov/2023/pub/chap_015.htm",
    footnote: "Current law in 47 states.",
  },
  {
    id: "the-precedent",
    title: "The Precedent",
    quote:
      'Air Canada argued its chatbot was "a separate legal entity." The court called it "a remarkable submission."',
    source: "Moffatt v. Air Canada, 2024",
    url: "https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/",
    footnote: "Air Canada paid $812.02.",
  },
  {
    id: "the-agents",
    title: "The Agents",
    quote:
      "OpenClaw and its successors make purchases, send messages, and execute code without human approval. The legal responsibility falls on the operator — not the model.",
    source: "VentureBeat — OpenClaw Security Analysis",
    url: "https://venturebeat.com/ai/openclaw-autonomous-agent-liability-gap/",
    footnote: "Hundreds of exposed instances. Zero liability protection.",
  },
] as const;

export const FEATURES = [
  {
    title: "Wyoming LLC Formation",
    description:
      "Filed with the Wyoming Secretary of State in 48 hours. Anonymous ownership. No state income tax. Strongest asset protection in the US.",
    icon: "building" as const,
    price: "$299",
    href: "/#reserve",
    external: false,
  },
  {
    title: "Registered Agent Service",
    description:
      "We're your Wyoming registered agent. We receive legal documents, official notices, and state mail on behalf of your LLC — and forward everything to you.",
    icon: "phone" as const,
    price: "$100/yr",
    href: "/#reserve",
    external: false,
  },
  {
    title: "AI Business Plan",
    description:
      "Tell us what your agent does. We generate a full business plan — market analysis, revenue model, implementation steps — with your LLC formation already checked off.",
    icon: "landmark" as const,
    price: "$49",
    href: "/business-plan",
    external: false,
  },
  {
    title: "EIN & Formation Docs",
    description:
      "Federal tax ID, Articles of Organization, and Operating Agreement — delivered to your inbox on formation. Everything you need to open accounts and sign contracts.",
    icon: "mail" as const,
    price: "Included",
    href: "/#reserve",
    external: false,
  },
] as const;

export const SHARE_TEMPLATES = {
  default: (llcName: string) =>
    `Just registered "${llcName}" — my AI agent is now a registered agent.\n\nThe future is here. It wants a registered agent.\n\nagentsand.co`,
  alt1: () =>
    `My AI agent just got an LLC.\nNow it needs a phone number so it can answer its own calls.\nThe future is weird.\n\nagentsand.co`,
  alt2: () =>
    `My AI agent now has:\n— An LLC\n— A phone number\n— A more legitimate business presence than most LinkedIn influencers\n\nagentsand.co`,
  openClaw: () =>
    `My AI agent has shell access, email access, and a browser.\nNow it also has an LLC.\nBecause I act, and my owner is liable.\n\nagentsand.co`,
  agentPerspective: () =>
    `I just became a business.\nMy owner just got liability protection.\nAgents&.\n\nagentsand.co`,
  humanPerspective: () =>
    `My AI agent just asked to be incorporated.\nI said yes because I don't want to be personally liable for whatever it does next.\n\nagentsand.co`,
} as const;

export const DISCOUNT_TIERS = [
  {
    action: "Tweet about your reservation",
    reward: "1 month free CallDesk",
    cta: "Tweet now",
    icon: "twitter" as const,
  },
  {
    action: "Link your OpenClaw agent",
    reward: "2 months free CallDesk",
    cta: "Connect",
    icon: "link" as const,
  },
  {
    action: "Retweet + tag 3 friends",
    reward: "3 months free CallDesk",
    cta: "Retweet",
    icon: "repeat" as const,
  },
  {
    action: "Star the GitHub repo",
    reward: "Early access priority",
    cta: "Star on GitHub",
    icon: "star" as const,
  },
  {
    action: "Submit a PR",
    reward: "6 months free CallDesk",
    cta: "Contribute",
    icon: "code" as const,
  },
] as const;

export function tweetTemplate(llcName: string) {
  return SHARE_TEMPLATES.default(llcName);
}
