import { getBusinessPlanSubmissions } from "@/app/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface BusinessPlan {
  summary: string;
  problem: string;
  solution: string;
  market: { size: string; targets: string[] };
  revenue: { model: string; streams: string[] };
  risks: string[];
  steps: { title: string; detail: string; done: boolean }[];
}

export default async function PlansPage() {
  const submissions = await getBusinessPlanSubmissions();

  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Admin
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">Business Plan Submissions</h1>
          <p className="text-sm text-muted-foreground">{submissions.length} total</p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-black/5 bg-black/2 p-10 text-center dark:border-white/10 dark:bg-white/5">
          <p className="text-muted-foreground">No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub) => {
            const plan = sub.plan_json as BusinessPlan;
            const date = new Date(sub.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={sub.id}
                className="rounded-xl border border-black/5 bg-black/2 p-6 dark:border-white/10 dark:bg-white/5"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    {sub.llc_name && (
                      <p className="font-mono text-base font-semibold text-[#0e7490] dark:text-[#A8F1F7]">
                        {sub.llc_name}
                      </p>
                    )}
                    <div className="mt-1 flex flex-wrap gap-2">
                      {sub.industry && (
                        <span className="rounded-full border border-black/10 px-2 py-0.5 text-xs text-muted-foreground dark:border-white/10">
                          {sub.industry}
                        </span>
                      )}
                      {sub.target_customers && (
                        <span className="rounded-full border border-black/10 px-2 py-0.5 text-xs text-muted-foreground dark:border-white/10">
                          {sub.target_customers}
                        </span>
                      )}
                      {sub.revenue_model && (
                        <span className="rounded-full border border-black/10 px-2 py-0.5 text-xs text-muted-foreground dark:border-white/10">
                          {sub.revenue_model}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{date}</span>
                </div>

                {/* Agent purpose */}
                <p className="mb-4 text-sm text-black/70 dark:text-white/70">{sub.agent_purpose}</p>

                {/* Plan summary */}
                <div className="mb-4 rounded-lg border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">Summary</p>
                  <p className="text-sm text-black/80 dark:text-white/80">{plan.summary}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Market */}
                  <div className="rounded-lg border border-black/5 p-3 dark:border-white/10">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">Market</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{plan.market?.size}</p>
                  </div>

                  {/* Revenue */}
                  <div className="rounded-lg border border-black/5 p-3 dark:border-white/10">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">Revenue</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{plan.revenue?.model}</p>
                  </div>
                </div>

                {/* Steps preview */}
                {plan.steps && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Implementation Steps
                    </p>
                    <ol className="space-y-1">
                      {plan.steps.map((step, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-xs text-black/60 dark:text-white/60">
                          <span className="shrink-0 font-medium text-neutral-400">{i + 1}.</span>
                          <span className={step.done ? "text-[#0e7490] dark:text-[#A8F1F7]" : ""}>{step.title}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <p className="mt-3 text-right text-[10px] text-neutral-400 font-mono">id: {sub.id}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
