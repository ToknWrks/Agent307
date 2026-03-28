"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SHARE_TEMPLATES } from "@/app/lib/constants";

const tweetOptions = [
  { id: "default", label: "Tweet 1" },
  { id: "alt1", label: "Tweet 2" },
  { id: "alt2", label: "Tweet 3" },
] as const;

export default function SuccessClient({
  llcName,
  stateName,
  email,
  siteUrl,
  postPurchaseCopy,
  agentNumber,
}: {
  llcName: string;
  stateName: string;
  email: string;
  siteUrl: string;
  postPurchaseCopy: string;
  agentNumber: number | null;
}) {
  const [copied, setCopied] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<number>>(
    new Set()
  );
  const [selectedTweet, setSelectedTweet] = useState<"default" | "alt1" | "alt2">("default");
  const [showTweetPicker, setShowTweetPicker] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(llcName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTweetText = () => {
    const fn = SHARE_TEMPLATES[selectedTweet];
    return selectedTweet === "default" ? fn(llcName) : (fn as () => string)();
  };

  const twitterUrl = `https://x.com/intent/post?text=${encodeURIComponent(getTweetText())}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  const handleAction = (index: number, url?: string) => {
    setCompletedActions((prev) => new Set([...prev, index]));
    if (url) window.open(url, "_blank");
  };

  const actionUrls: Record<number, string> = {
    0: twitterUrl,
    2: twitterUrl,
    3: "https://github.com/AgentsAndCo/agentsand",
    4: "https://github.com/AgentsAndCo/agentsand",
  };

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-black/10 dark:to-white/10" />
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-medium text-emerald-600 text-xs dark:text-emerald-400">
                Reservation confirmed
              </span>
            </div>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-black/10 dark:to-white/10" />
          </div>

          {/* Glowing LLC Name Card */}
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-dashed border-[#A8F1F7]/30 p-2">
              <div
                className="relative overflow-hidden rounded-xl border border-[#A8F1F7]/20 bg-gradient-to-br from-[#09090b] via-[#0a0f10] to-[#09090b] p-8"
                style={{
                  boxShadow: "0 0 30px rgba(168,241,247,0.15)",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#A8F1F7]/10 via-transparent to-[#A8F1F7]/5" />
                <div className="relative flex flex-col items-center text-center">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-[#A8F1F7]/60">
                    LLC Name Reserved
                  </p>
                  <p className="mt-2 font-mono text-2xl font-semibold text-white tracking-tight">
                    {llcName}
                  </p>
                  <p className="mt-2 text-sm text-[#A8F1F7]/70">
                    {llcName} {postPurchaseCopy}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {stateName} &middot; 120-day hold
                  </p>
                  <p className="mt-4 text-sm text-neutral-400">
                    Welcome to the club. 🏝️
                  </p>
                </div>
                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:bg-white/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          {email && (
            <p className="text-neutral-500 text-xs dark:text-neutral-400">
              Confirmation sent to {email}
            </p>
          )}

          {/* Share Row - Primary Tweet CTA */}
          <div className="flex w-full max-w-md flex-col gap-3">
            <div className="relative">
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A8F1F7] px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-[#A8F1F7]/80"
              >
                <span className="text-sm font-bold leading-none">𝕏</span>
                Share on X
              </a>
              {/* Tweet template picker */}
              <button
                type="button"
                onClick={() => setShowTweetPicker(!showTweetPicker)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md bg-black/10 p-1 transition-all hover:bg-black/20"
              >
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showTweetPicker && "rotate-180")} />
              </button>
            </div>
            {showTweetPicker && (
              <div className="space-y-2 rounded-lg border border-black/5 bg-black/3 p-3 dark:border-white/10 dark:bg-white/5">
                {tweetOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedTweet(opt.id);
                      setShowTweetPicker(false);
                    }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-xs transition-all",
                      selectedTweet === opt.id
                        ? "bg-[#A8F1F7]/10 text-[#0e7490] dark:text-[#A8F1F7]"
                        : "text-neutral-500 hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <span className="mb-1 block font-medium">{opt.label}</span>
                    <span className="block whitespace-pre-wrap text-[11px] opacity-70">
                      {opt.id === "default"
                        ? SHARE_TEMPLATES.default(llcName).slice(0, 80) + "..."
                        : (SHARE_TEMPLATES[opt.id] as () => string)().slice(0, 80) + "..."}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/5 bg-black/3 px-3 py-2 text-xs font-medium text-neutral-700 transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <button
                onClick={handleCopy}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/5 bg-black/3 px-3 py-2 text-xs font-medium text-neutral-700 transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy name"}
              </button>
            </div>
          </div>

          {/* Queue Position + Referral */}
          {agentNumber != null && (
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-dashed border-[#A8F1F7]/30 p-2">
                <div className="rounded-xl border border-[#A8F1F7]/20 bg-gradient-to-b from-[#A8F1F7]/5 to-transparent p-5">
                  <div className="mb-4 text-center">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#0e7490] dark:text-[#A8F1F7]/60">
                      Your position in the registry
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tighter text-neutral-900 dark:text-white">
                      #{agentNumber.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      First 1,000 agents get formation at cost.{" "}
                      {agentNumber <= 1000 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">You&apos;re in.</span>
                      ) : (
                        <span>Share to move up.</span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-center text-[11px] font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-500">
                      Each referral moves you up 10 spots
                    </p>
                    <button
                      onClick={() => {
                        const shareUrl = `${siteUrl}?ref=${encodeURIComponent(email)}`;
                        navigator.clipboard.writeText(shareUrl);
                        setCompletedActions((prev) => new Set([...prev, 99]));
                      }}
                      className="flex w-full items-center justify-between rounded-lg border border-black/5 bg-white/3 px-3 py-2.5 text-left transition-all hover:border-white/15 hover:bg-white/5 dark:border-white/10"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-mono text-xs text-neutral-400">
                          {siteUrl}?ref={email}
                        </p>
                      </div>
                      <div className="ml-2 shrink-0">
                        {completedActions.has(99) ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-neutral-400" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business plan cross-sell */}
          <div className="flex w-full max-w-md items-center justify-between rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 px-5 py-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Your agent has an LLC. Now give it a business plan.
            </p>
            <a
              href="/business-plan"
              className="ml-4 flex shrink-0 items-center gap-1.5 rounded-lg bg-[#A8F1F7] px-3 py-2 text-xs font-medium text-neutral-900 transition-all hover:bg-[#A8F1F7]/80"
            >
              Generate Plan
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Next steps */}
          <div className="w-full max-w-md border-t border-black/5 pt-6 dark:border-white/10">
            <h3 className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-neutral-400">
              What happens next
            </h3>
            <div className="space-y-3">
              {[
                "Your LLC name is reserved for 120 days",
                "No one else can claim it through our platform",
                "You'll receive confirmation via email with next steps",
                "$99 is credited toward full LLC formation",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/10 text-[11px] font-medium text-neutral-500 dark:border-white/10">
                    {i + 1}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
