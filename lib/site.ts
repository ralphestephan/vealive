// lib/site.ts
export const SITE = {
  name: "VeaLive360 — Smart Living",
  brand: "VeaLive",
  tagline: "You dream it, we make it.",
  baseUrl: "https://vealive360.com",
  description:
    "You dream it, we make it. VeaLive builds local, secure smart homes with self-built solutions and DIY 3D-printed automation, curated for your space. “360” is our Home Dome and full-home view—comfort, safety, and energy in sync.",
  keywords: [
    "smart home Beirut",
    "home automation Lebanon",
    "IoT integrator",
    "smart lighting",
    "smart climate",
    "home security",
    "VeaLive360",
  ],
  ogImage: "/images/og/vealive360-og.png", // export a 1200x630 image here
  socials: {
    twitter: "@VeaLive360",
    instagram: "vealive360",
  },
  org: {
    legalName: "VeaLive",
    url: "https://vealive360.com",
    logo: "/images/logo.png",
    sameAs: [
      "https://twitter.com/VeaLive360",
      "https://www.instagram.com/vealive360",
    ],
  },
  contact: {
    email: "sales@vealive360.com",
    phone: "+961 81 632 241",
  },
} as const;
