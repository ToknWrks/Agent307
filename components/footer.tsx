"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Name Reservation — $99", href: "#pricing" },
      { name: "Wyoming LLC — $299", href: "#pricing" },
      { name: "Registered Agent — $99/yr", href: "#pricing" },
      { name: "Business-in-a-Box — $499", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
      { name: "GitHub", href: "https://github.com/ToknWrks/Agent307" },
      { name: "Why Wyoming", href: "#why-wyoming" },
    ],
  },
];

export function Footer() {
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full overflow-hidden bg-white py-12 md:py-16 dark:bg-black/3">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl rounded-2xl border border-black/5 border-dashed p-2 dark:border-white/10">
          <div className="rounded-xl border border-black/5 bg-black/3 p-6 md:p-8 dark:border-white/10 dark:bg-white/10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Brand Section */}
              <div className="space-y-3 lg:col-span-2">
                <Link
                  className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                  href="/"
                >
                  <span className="font-bold text-2xl text-black tracking-tighter transition-colors dark:text-white">
                    Agent307
                  </span>
                </Link>
                <p className="max-w-xs text-black/60 text-sm tracking-tighter dark:text-white/60">
                  Wyoming LLCs for AI Agents.
                </p>
                <p className="max-w-xs text-black/40 text-xs tracking-tighter dark:text-white/40">
                  Filed in 48 hours. We don&apos;t ask questions.
                </p>
              </div>

              {/* Links Sections */}
              {footerLinks.map((section) => (
                <div className="space-y-3" key={section.title}>
                  <h3 className="font-medium text-black/80 text-sm tracking-tighter dark:text-white/80">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          className="text-black/60 text-sm tracking-tighter transition-colors hover:text-black/80 dark:text-white/60 dark:hover:text-white/80"
                          href={link.href}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-8 border-black/5 border-t pt-6 dark:border-white/10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium text-black/80 text-sm tracking-tighter dark:text-white/80">
                    Stay in the loop
                  </h3>
                  <p className="text-black/60 text-sm tracking-tighter dark:text-white/60">
                    Get notified when we launch new services.
                  </p>
                </div>
                <form className="space-y-2" onSubmit={handleEmailSubmit}>
                  <div className="flex gap-2">
                    <Input
                      autoComplete="off"
                      className="h-9 flex-1 rounded-lg border-black/10 bg-black/5 px-3 text-sm tracking-tighter placeholder:text-black/40 focus:border-black/20 focus:ring-1 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:focus:border-white/20 dark:focus:ring-white/20 dark:placeholder:text-white/40"
                      name="email"
                      placeholder="Enter your email"
                      required
                      type="email"
                    />
                    <Button
                      className="group h-9 w-9 rounded-lg border border-black/10 border-dashed bg-black/5 p-0 text-black/80 transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                      type="submit"
                    >
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-6 flex flex-col justify-between gap-3 border-black/5 border-t pt-6 text-black/50 text-xs tracking-tighter sm:flex-row sm:items-center dark:border-white/10 dark:text-white/50">
              <div className="flex flex-col gap-1">
                <p>&copy; 2026 Agent307</p>
                <p className="text-sm text-black/30 dark:text-white/30">
                  Wyoming registered agent service
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  className="transition-colors hover:text-black/70 dark:hover:text-white/70"
                  href="/terms"
                >
                  Terms
                </Link>
                <Link
                  className="transition-colors hover:text-black/70 dark:hover:text-white/70"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
