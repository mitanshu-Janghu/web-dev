const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "File Converter Pro",
  legalName: "File Converter Pro, Inc.",
  tagline: "Premium online file conversion for modern teams.",
  description:
    "File Converter Pro is a premium-feeling SaaS web app for MP4 to MP3, PDF to Word, and image to PDF conversions with polished UX and fast processing.",
  baseUrl,
  supportEmail: "support@fileconverterpro.app",
  salesEmail: "sales@fileconverterpro.app",
  navLinks: [
    { href: "/#tools", label: "Tools" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ],
};
