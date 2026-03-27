import type { LucideIcon } from "lucide-react";
import { FileText, Github, Mail, MapPin, Shield, Sparkles } from "lucide-react";

export type NavigationItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

export type NavigationCategory = {
  name: string;
  items: NavigationItem[];
};

export type NavigationMenu = {
  name: string;
  href?: string;
  items?: NavigationItem[];
  categories?: NavigationCategory[];
};

export const NAVIGATION_ITEMS: NavigationMenu[] = [
  {
    name: "Services",
    categories: [
      {
        name: "Wyoming LLC",
        items: [
          { name: "Form Your LLC — $299", href: "/form-wyoming-llc", icon: Shield },
          { name: "Registered Agent — $100/yr", href: "/registered-agent", icon: MapPin },
          { name: "EIN & Formation Docs", href: "/ein-formation-docs", icon: Mail },
        ],
      },
      {
        name: "Business Plan",
        items: [
          { name: "AI Business Plan", href: "/business-plan", icon: Sparkles },
        ],
      },
    ],
  },
  {
    name: "Pricing",
    href: "/#pricing",
  },
  {
    name: "Company",
    categories: [
      {
        name: "Legal",
        items: [
          { name: "Terms", href: "/terms", icon: FileText },
          { name: "Privacy", href: "/privacy", icon: Shield },
        ],
      },
      {
        name: "Open Source",
        items: [
          { name: "GitHub", href: "https://github.com/ToknWrks/Agent307", icon: Github },
        ],
      },
    ],
  },
];
