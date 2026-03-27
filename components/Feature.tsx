"use client";

import { Building2, Phone, Sparkles, Mail } from "lucide-react";
import { motion } from "motion/react";
import { FEATURES } from "@/app/lib/constants";

const iconMap = {
  building: Building2,
  phone: Phone,
  landmark: Sparkles,
  mail: Mail,
} as const;

export default function FeaturesSection() {
  return (
    <section
      className="w-full overflow-hidden py-16 md:py-24 lg:py-32 dark:bg-white/[0.02]"
      id="features"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-5xl lg:text-6xl dark:text-neutral-50">
            Business in a Box.
          </h2>
          <p className="mx-auto max-w-[600px] text-lg text-neutral-500 md:text-xl dark:text-neutral-400">
            LLC + Phone + Bank + Email. Everything your agent needs to operate. $499 all-in.
          </p>
          <p className="mx-auto max-w-[520px] text-sm text-neutral-500 italic">
            We called it &ldquo;Business in a Box&rdquo; because &ldquo;Everything Your Agent
            Needs to Sue and Be Sued&rdquo; didn&apos;t test well.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="group rounded-2xl border border-black/5 border-dashed p-2 transition-all hover:border-[#A8F1F7]/30 dark:border-white/10"
                initial={{ opacity: 0, y: 20 }}
                key={feature.title}
                transition={{
                  delay: 0.05 + index * 0.05,
                  duration: 0.3,
                }}
              >
                <a
                  href={feature.href}
                  {...(feature.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block h-full"
                >
                  {/* Inner Card */}
                  <div className="relative flex h-full flex-col gap-4 rounded-xl border border-black/5 bg-black/3 p-8 transition-all duration-300 group-hover:border-[#A8F1F7]/20 group-hover:bg-[#A8F1F7]/5 dark:border-white/10 dark:bg-white/10 dark:group-hover:border-[#A8F1F7]/20 dark:group-hover:bg-[#A8F1F7]/5">
                    {/* Price Badge */}
                    <span className="absolute top-6 right-6 rounded-full border border-[#A8F1F7]/20 bg-[#A8F1F7]/10 px-2.5 py-0.5 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
                      {feature.price}
                    </span>

                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#A8F1F7]/20 bg-[#A8F1F7]/10">
                      <Icon className="h-8 w-8 text-[#0e7490] dark:text-[#A8F1F7]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold tracking-tighter text-black/80 dark:text-white/80">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed tracking-tighter text-black/60 dark:text-white/60">
                      {feature.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
