import { env } from "@/lib/env";

export const siteConfig = {
  name: "Next.js Frontend Starter",
  shortName: "Frontend Starter",
  description:
    "Production-ready Next.js frontend template with React Hook Form, TanStack Query, TanStack Table, Sonner, and Tailwind CSS.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/og.png`,
  author: {
    name: "Developer Team",
    url: "https://github.com",
  },
  creator: "Developer Team",
  keywords: [
    "Next.js",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "Frontend Starter",
    "Clean Architecture",
    "App Router",
    "TanStack Query",
    "Zod Validation",
    "SEO Optimized",
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  locale: "id_ID",
} as const;

export type SiteConfig = typeof siteConfig;
