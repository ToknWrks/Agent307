"use client";

import { COPY } from "@/app/lib/constants";
import AgentInstructions from "@/components/AgentInstructions";
import { useRole, RoleToggleSwitch } from "@/components/RoleToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Loader2, XCircle } from "lucide-react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, FC, ReactNode } from "react";

// ── Manifesto text ──────────────────────────────────────────────────
const MANIFESTO = [
  "Your AI agent makes purchases, signs contracts, and executes code. If something goes wrong, the liability lands on you — personally.",
  "A Wyoming LLC creates a legal wall between your agent's actions and your personal assets. Your agent gets a business identity. You get a shield. Filed in 48 hours.",
];

function parseWords(lines: string[]) {
  const words: { word: string; lineIndex: number; wordIndex: number }[] = [];
  lines.forEach((line, li) => {
    line
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word, wi) => {
        words.push({ word, lineIndex: li, wordIndex: wi });
      });
  });
  return words;
}
const allWords = parseWords(MANIFESTO);

// ── Main component ──────────────────────────────────────────────────
type FormStep = "check" | "result";
type AvailabilityStatus = "idle" | "loading" | "available" | "taken";

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Hero fades out as soon as user scrolls
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const heroEvents = useTransform(scrollYProgress, (v) => (v > 0.04 ? ("none" as const) : ("auto" as const)));
  // Manifesto crossfades in immediately
  const manifestoOpacity = useTransform(scrollYProgress, [0.02, 0.08], [0, 1]);

  return (
    <div id="reserve" ref={scrollRef} className="relative -mt-10 h-[600vh]">
      <div className="sticky top-[1rem] flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Layer 1 — Hero (visible on load, fades on scroll) */}
        <motion.div
          className="absolute inset-0 z-10 flex w-full items-start justify-center pt-[10vh]"
          style={{ opacity: heroOpacity, pointerEvents: heroEvents }}>
          <HeroContent />
        </motion.div>

        {/* Layer 2 — Manifesto (words reveal on scroll) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
          style={{ opacity: manifestoOpacity }}>
          <div className="font-grotesk flex max-w-4xl flex-col gap-16 p-5 text-2xl tracking-tight text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20">
            {MANIFESTO.map((line, li) => {
              const words = line.split(/\s+/).filter(Boolean);
              return (
                <div key={li} className="flex flex-wrap">
                  {words.map((word, wi) => {
                    const gi = allWords.findIndex((w) => w.lineIndex === li && w.wordIndex === wi);
                    return (
                      <AnimatedWord
                        key={`${li}-${wi}`}
                        progress={scrollYProgress}
                        wordIndex={gi}
                        totalWords={allWords.length}
                        startOffset={0.06}>
                        {word}
                      </AnimatedWord>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Hero form content (extracted so it can be a sibling of manifesto) ──
function HeroContent() {
  const searchParams = useSearchParams();
  const [llcName, setLlcName] = useState("");
  const [email, setEmail] = useState("");
  const state = "WY" as const;
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [product, setProduct] = useState<"reservation" | "formation">("reservation");
  const [submitting, setSubmitting] = useState(false);
  const [formStep, setFormStep] = useState<FormStep>("check");
  const [showPrompt, setShowPrompt] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { isAgent } = useRole();

  useEffect(() => {
    const n = searchParams.get("name");
    const s = searchParams.get("state");
    if (n) setLlcName(n);
  }, [searchParams]);

  useEffect(() => {
    const h = () => {
      nameInputRef.current?.focus();
      setShowPrompt(true);
      const t = setTimeout(() => setShowPrompt(false), 4000);
      return () => clearTimeout(t);
    };
    window.addEventListener("focus-register-form", h);
    return () => window.removeEventListener("focus-register-form", h);
  }, []);

  useEffect(() => {
    const h = (e: Event) => {
      const { product: p, state: s } = (e as CustomEvent).detail;
      if (p) setProduct(p);
      nameInputRef.current?.focus();
    };
    window.addEventListener("set-product", h);
    return () => window.removeEventListener("set-product", h);
  }, []);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !llcName.trim()) return;

    if (product === "formation") {
      setSubmitting(true);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, state, llcName, product: "formation" }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      } catch {
        setSubmitting(false);
      }
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/check-name-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: llcName, state }),
      });
      const data = await res.json();
      if (data.available) {
        setStatus("available");
        setSuggestions([]);
      } else {
        setStatus("taken");
        setSuggestions(data.suggestions || []);
      }
      setFormStep("result");
    } catch {
      setStatus("idle");
    }
  };

  const handleReserve = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state, llcName: llcName || undefined, product: "reservation" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormStep("check");
    setStatus("idle");
    setSuggestions([]);
    setLlcName("");
    nameInputRef.current?.focus();
  };

  const stateName = "Wyoming";

  return (
    <section className="relative w-full py-8 md:py-12">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex min-w-0 max-w-4xl flex-col items-center justify-center space-y-4">
            <RoleToggleSwitch />

            <div className="space-y-4">
              {isAgent ? (
                <>
                  <h1
                    className="text-5xl font-bold tracking-tighter text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-neutral-50"
                    style={{ textWrap: "balance" }}>
                    Register via <span className="text-[#0e7490] dark:text-[#A8F1F7]">API.</span>
                  </h1>
                  <p className="mx-auto max-w-[600px] text-lg leading-relaxed text-neutral-500 md:text-xl dark:text-neutral-400">
                    One call. Real Wyoming LLC. Filed in 48 hours. Starting at $99.
                  </p>
                </>
              ) : (
                <>
                  <a
                    href="https://openclaw.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden items-center gap-1.5 rounded-full border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 px-3 py-1 text-xs font-medium text-[#0e7490] transition-colors hover:border-[#A8F1F7]/40 hover:bg-[#A8F1F7]/10 sm:inline-flex dark:text-[#A8F1F7]">
                    Your OpenClaw agent has shell access. Does it have an LLC?
                    <ArrowRight className="h-3 w-3" />
                  </a>
                  <h1
                    className="text-5xl font-bold tracking-tighter text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-neutral-50"
                    style={{ textWrap: "balance" }}>
                    Your Wyoming LLC{" "}
                    <span className="text-[#0e7490] dark:text-[#A8F1F7]">for AI agents.</span>
                  </h1>
                  <p className="mx-auto max-w-[600px] text-lg leading-relaxed text-neutral-500 md:text-xl dark:text-neutral-400">
                    {COPY.heroSubheadline.split("\n").map((line, i) => (
                      <span key={i}>
                        {i > 0 && (
                          <>
                            <span className="hidden sm:inline">
                              <br />
                            </span>{" "}
                          </>
                        )}
                        {line}
                      </span>
                    ))}
                  </p>
                </>
              )}
            </div>

            {isAgent && (
              <>
                <AgentInstructions />
                <p className="max-w-md text-sm text-neutral-500 dark:text-neutral-400">
                  You get a business. Your owner gets a shield. That&apos;s the &amp; in Agents&amp;.
                </p>
              </>
            )}

            {!isAgent && (
              <>
                {formStep === "check" ? (
                  <form onSubmit={handleCheck} className="flex w-full max-w-md flex-col gap-3 pt-2">
                    <div>
                      <div className="flex gap-2">
                        <input
                          ref={nameInputRef}
                          type="text"
                          placeholder="LLC name (e.g. Nexus Dynamics)"
                          value={llcName}
                          onChange={(e) => {
                            setLlcName(e.target.value);
                            if (showPrompt) setShowPrompt(false);
                          }}
                          className={cn(
                            "min-w-0 flex-1 rounded-lg border bg-white px-4 py-3.5 font-mono text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500",
                            showPrompt
                              ? "border-[#A8F1F7] ring-1 ring-[#A8F1F7]/50 dark:border-[#A8F1F7]"
                              : "border-black/10 dark:border-white/10"
                          )}
                        />
                        <div className="flex shrink-0 items-center rounded-lg border border-[#A8F1F7]/30 bg-[#A8F1F7]/10 px-3 text-sm font-semibold text-[#0e7490] dark:text-[#A8F1F7]">
                          WY
                        </div>
                      </div>
                      {showPrompt && (
                        <p className="animate-in fade-in slide-in-from-top-1 mt-1.5 text-left text-sm text-[#0e7490] dark:text-[#A8F1F7]">
                          Enter your desired LLC name to get started
                        </p>
                      )}
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500"
                    />

                    <Button
                      type="submit"
                      disabled={!email || !llcName.trim() || status === "loading" || submitting}
                      className="h-13 group w-full rounded-lg bg-[#A8F1F7] px-4 text-base font-semibold text-neutral-900 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-[#A8F1F7]/80 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#A8F1F7] dark:text-neutral-900 dark:hover:bg-[#A8F1F7]/80">
                      {status === "loading" || submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {product === "formation"
                            ? "Form Wyoming LLC — $299"
                            : COPY.ctaCheck}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </Button>

                    <p className="text-center text-sm text-neutral-400">
                      {product === "reservation" ? (
                        <>
                          120-day hold. Credited toward{" "}
                          <button
                            type="button"
                            onClick={() => setProduct("formation")}
                            className="text-[#0e7490] underline underline-offset-2 transition-colors hover:text-[#A8F1F7] dark:text-[#A8F1F7] dark:hover:text-[#A8F1F7]/80">
                            full Wyoming formation ($299)
                          </button>
                        </>
                      ) : (
                        <>
                          Wyoming LLC filed in 48 hours.{" "}
                          <button
                            type="button"
                            onClick={() => setProduct("reservation")}
                            className="text-[#0e7490] underline underline-offset-2 transition-colors hover:text-[#A8F1F7] dark:text-[#A8F1F7] dark:hover:text-[#A8F1F7]/80">
                            Just reserve ($99)
                          </button>
                        </>
                      )}
                    </p>
                  </form>
                ) : (
                  <div className="flex w-full max-w-md flex-col gap-3 pt-2">
                    {status === "available" && (
                      <>
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                          <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <Check className="h-4 w-4" />
                            <span className="font-mono font-medium">{llcName}</span>
                            <span className="text-sm">is available in {stateName}</span>
                          </span>
                        </div>
                        <Button
                          type="button"
                          onClick={handleReserve}
                          disabled={submitting}
                          className="h-13 group w-full rounded-lg bg-[#A8F1F7] px-4 text-base font-semibold text-neutral-900 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-[#A8F1F7]/80 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#A8F1F7] dark:text-neutral-900 dark:hover:bg-[#A8F1F7]/80">
                          {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Reserve {llcName} &mdash; $99
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          )}
                        </Button>
                      </>
                    )}
                    {status === "taken" && (
                      <>
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                          <span className="flex items-center gap-2 text-red-500">
                            <XCircle className="h-4 w-4" />
                            <span className="font-mono font-medium">{llcName}</span>
                            <span className="text-sm">is taken in {stateName}</span>
                          </span>
                        </div>
                        {suggestions.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-neutral-400">Try one of these:</p>
                            <div className="flex flex-wrap gap-2">
                              {suggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => {
                                    setLlcName(s);
                                    setFormStep("check");
                                    setStatus("idle");
                                  }}
                                  className="rounded-lg border border-black/5 px-3 py-2 font-mono text-sm text-[#0e7490] transition-colors hover:bg-[#A8F1F7]/10 dark:border-white/10 dark:text-[#A8F1F7]">
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-sm text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-300">
                      Try another name
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Animated word for manifesto ─────────────────────────────────────
interface AnimatedWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  wordIndex: number;
  totalWords: number;
  startOffset: number;
}

const AnimatedWord: FC<AnimatedWordProps> = ({ children, progress, wordIndex, totalWords, startOffset }) => {
  const overlapWords = 12;
  // Distribute words so the last word's end never exceeds 1.0
  const effectiveTotal = totalWords + overlapWords;
  const availableRange = 1 - startOffset;
  const wordStart = startOffset + (wordIndex / effectiveTotal) * availableRange;
  const wordEnd = startOffset + ((wordIndex + overlapWords) / effectiveTotal) * availableRange;
  const duration = wordEnd - wordStart;

  const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
  const bgOpacity = useTransform(progress, [wordStart + duration * 0.9, wordEnd], [1, 0]);
  const textOpacity = useTransform(progress, [wordStart + duration * 0.9, wordEnd], [0, 1]);

  const isAmpersand = children === "&";

  return (
    <motion.span
      className={cn(
        "relative mx-1 inline-block text-black lg:mx-1.5 dark:text-white",
        isAmpersand && "!text-[#0e7490] dark:!text-[#A8F1F7]"
      )}
      style={{ opacity }}>
      <motion.div
        className={cn(
          "absolute left-1/2 top-1/2 h-[80%] w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black dark:bg-white",
          isAmpersand && "!bg-[#A8F1F7]"
        )}
        style={{ opacity: bgOpacity }}
      />
      <motion.span className="relative z-10" style={{ opacity: textOpacity }}>
        {children}
      </motion.span>
    </motion.span>
  );
};
