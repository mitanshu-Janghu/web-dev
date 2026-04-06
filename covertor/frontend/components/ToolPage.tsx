import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UploadBox } from "@/components/UploadBox";
import { siteConfig } from "@/lib/site";
import { ToolDefinition } from "@/lib/tools";

type ToolPageProps = {
  tool: ToolDefinition;
};

export function ToolPage({ tool }: ToolPageProps) {
  const toolSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        description: tool.description,
        url: `${siteConfig.baseUrl}/${tool.slug}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tool.name,
            item: `${siteConfig.baseUrl}/${tool.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative overflow-hidden px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <JsonLd data={toolSchema} />
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-6xl rounded-full bg-[radial-gradient(circle_at_top,rgba(255,122,0,0.18),transparent_60%)] blur-3xl" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition hover:text-ink"
          >
            <span className="rounded-full border border-ink/10 px-3 py-1">Home</span>
            <span>File Converter Pro</span>
          </Link>
          <p className="text-sm text-ink/60">Free plan: 10MB and 5 conversions daily. Pro removes ads and raises limits.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-panel space-y-6 rounded-[2.25rem] p-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-pine/20 bg-pine/10 px-4 py-1 text-sm font-semibold text-pine">
                {tool.shortLabel}
              </div>
              <div className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
                Premium-ready flow
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                {tool.heading}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink/75">{tool.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-ink/10 bg-mist px-4 py-5">
                <p className="text-sm font-semibold text-ink">Fast processing</p>
                <p className="mt-2 text-sm text-ink/70">Upload, convert, and download from a premium single-screen flow.</p>
              </div>
              <div className="rounded-[1.75rem] border border-ink/10 bg-mist px-4 py-5">
                <p className="text-sm font-semibold text-ink">Secure uploads</p>
                <p className="mt-2 text-sm text-ink/70">Validated file types, safe command execution, auto cleanup.</p>
              </div>
              <div className="rounded-[1.75rem] border border-ink/10 bg-mist px-4 py-5">
                <p className="text-sm font-semibold text-ink">Monetization ready</p>
                <p className="mt-2 text-sm text-ink/70">Free users see ad inventory while Pro users can be sold a cleaner path.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[1.75rem] border border-dashed border-ink/20 bg-sand/30 px-5 py-5 text-sm text-ink/70">
                <span className="font-semibold text-ink">SEO keywords:</span> {tool.keywords.join(", ")}
              </div>
              <div className="premium-subtle rounded-[1.75rem] px-5 py-5 text-sm text-ink/75">
                <p className="font-semibold text-ink">Premium positioning</p>
                <p className="mt-2 leading-7">
                  This tool page now frames the converter like a paid product, with clearer value, trust, and upgrade opportunities.
                </p>
              </div>
            </div>
          </div>

          <UploadBox tool={tool} />
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <article className="surface-panel rounded-[2rem] px-6 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Free</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Quick conversions</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              Keep the barrier to entry low with the current no-login experience and ad-supported results.
            </p>
          </article>
          <article className="premium-card rounded-[2rem] px-6 py-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Pro</p>
            <h2 className="mt-4 font-display text-3xl text-white">Cleaner workspace</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Remove ads, raise limits, and offer a more premium post-conversion experience for paying users.
            </p>
          </article>
          <article className="surface-panel rounded-[2rem] px-6 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Trust</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Safer by default</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              Safe filenames, limited uploads, and scheduled cleanup keep the premium polish backed by practical safeguards.
            </p>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="surface-panel rounded-[2rem] px-6 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Business fit</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Designed for search traffic and paid upgrades</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              This page is structured to convert high-intent SEO traffic first, then introduce a premium plan with better limits and a cleaner post-conversion flow.
            </p>
          </article>
          <article className="surface-panel rounded-[2rem] px-6 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Operational promise</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Fast, temporary, and simple</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              Users upload, convert, and download in one session. Files are temporary, validation is enforced, and the experience stays usable on desktop and mobile.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
