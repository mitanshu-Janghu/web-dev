import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/mp4-to-mp3", label: "MP4 to MP3" },
      { href: "/pdf-to-word", label: "PDF to Word" },
      { href: "/image-to-pdf", label: "Image to PDF" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/#security", label: "Security" },
      { href: "/#workflow", label: "How it works" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="surface-panel grid gap-8 rounded-[2.25rem] px-6 py-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <p className="font-display text-3xl text-ink">{siteConfig.name}</p>
            <p className="max-w-md text-sm leading-7 text-ink/70">
              {siteConfig.legalName} builds premium-feeling conversion workflows for creators, operators, and teams who need fast file utility without a bloated interface.
            </p>
            <div className="rounded-[1.5rem] border border-ink/10 bg-mist px-4 py-4 text-sm text-ink/70">
              Support:{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-ink">
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/50">{column.title}</p>
              <div className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-ink/70 transition hover:text-ink">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Built for a fast free tier with a clear upgrade path for Pro and Teams.</p>
        </div>
      </div>
    </footer>
  );
}
