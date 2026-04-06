import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-ink/10 bg-white/80 px-5 py-3 shadow-soft backdrop-blur">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
            FC
          </div>
          <div>
            <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
            <p className="text-xs text-ink/60">{siteConfig.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition hover:bg-white hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition hover:bg-white hover:text-ink sm:inline-flex"
          >
            Talk to sales
          </Link>
          <Link
            href="/mp4-to-mp3"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-pine"
          >
            Launch app
          </Link>
        </div>
      </div>
    </header>
  );
}
