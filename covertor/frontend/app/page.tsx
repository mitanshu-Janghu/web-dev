import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "/month",
    description: "Best for occasional conversions and trying the product.",
    features: ["10MB files", "5 conversions per day", "Ad-supported results"],
    cta: "Start free",
    href: "/mp4-to-mp3",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "/month",
    description: "For creators and operators who want a cleaner, faster workflow.",
    features: ["Larger file limits", "Priority queue", "No ads after conversion"],
    cta: "Upgrade to Pro",
    href: "#pricing",
    featured: true,
  },
  {
    name: "Teams",
    price: "Custom",
    cadence: "",
    description: "For agencies and internal tools with higher volume needs.",
    features: ["Shared usage", "Usage analytics", "Dedicated support"],
    cta: "Talk to sales",
    href: "#pricing",
    featured: false,
  },
];

const workflow = [
  {
    step: "01",
    title: "Upload once",
    description: "Drop a file into the converter and the app validates size and type instantly.",
  },
  {
    step: "02",
    title: "Convert fast",
    description: "Each workflow runs through dedicated CLI tooling for reliable production-style output.",
  },
  {
    step: "03",
    title: "Download cleanly",
    description: "Results are ready in one click, with temporary storage and automatic cleanup built in.",
  },
];

const faqs = [
  {
    question: "What makes the premium version feel different?",
    answer:
      "The premium tier is positioned around higher limits, a cleaner no-ad experience, and priority processing while keeping the core interface focused and fast.",
  },
  {
    question: "Can users convert files without creating an account?",
    answer:
      "Yes. The current experience stays no-login for the free flow, which keeps acquisition friction low and supports quick SEO-friendly usage.",
  },
  {
    question: "Is the app still minimal after the redesign?",
    answer:
      "Yes. The UI now feels more premium through typography, spacing, hierarchy, and product framing, while the actual conversion flow remains simple.",
  },
];

const testimonials = [
  {
    quote: "The product finally looks expensive enough to trust before I even upload a file.",
    name: "Ava Chen",
    role: "Growth Designer",
  },
  {
    quote: "It gives us the speed of a utility app with the polish of a real SaaS landing experience.",
    name: "Marcus Holt",
    role: "Operations Lead",
  },
  {
    quote: "The no-login flow is perfect for acquisition, and the Pro framing makes monetization obvious.",
    name: "Nina Flores",
    role: "Indie Founder",
  },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.baseUrl,
      email: siteConfig.supportEmail,
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description: siteConfig.description,
      url: siteConfig.baseUrl,
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free plan",
        },
        {
          "@type": "Offer",
          price: "12",
          priceCurrency: "USD",
          description: "Pro plan",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: "Premium Online File Converter for MP4 to MP3, PDF to Word, and Image to PDF",
  description:
    "File Converter Pro is a premium-feeling SaaS web app for MP4 to MP3, PDF to Word, and image to PDF conversions with fast processing and polished UX.",
};

export default function HomePage() {
  return (
    <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <JsonLd data={homeSchema} />
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-panel relative overflow-hidden rounded-[2.5rem] px-8 py-10 sm:px-10">
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Premium SaaS positioning, same fast conversion core
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-7xl">
              Premium file conversion that looks as sharp as the output.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
              Convert MP4 to MP3, PDF to Word, and image to PDF with a more elevated product experience, clearer value
              framing, and a conversion flow that still takes only a few taps.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/mp4-to-mp3"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Start converting free
              </Link>
              <a
                href="#pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/10 bg-white/70 px-7 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Explore premium plans
              </a>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <dt className="text-sm text-ink/60">Free plan</dt>
                <dd className="mt-2 text-3xl font-semibold text-ink">10MB</dd>
              </div>
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <dt className="text-sm text-ink/60">Daily usage</dt>
                <dd className="mt-2 text-3xl font-semibold text-ink">5 runs</dd>
              </div>
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <dt className="text-sm text-ink/60">Experience</dt>
                <dd className="mt-2 text-3xl font-semibold text-ink">No login</dd>
              </div>
            </dl>
          </div>

          <aside className="premium-card relative overflow-hidden rounded-[2.5rem] px-7 py-8 text-white">
            <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_70%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/60">Premium preview</p>
                  <h2 className="mt-2 font-display text-4xl text-white">Pro workspace</h2>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Coming next
                </span>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm text-white/60">What Pro unlocks</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Batch-ready conversion with priority processing</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-white/60">Ads</p>
                    <p className="mt-2 text-xl font-semibold">Removed</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-white/60">Queue</p>
                    <p className="mt-2 text-xl font-semibold">Priority</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-white/60">Limits</p>
                    <p className="mt-2 text-xl font-semibold">Higher</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-white/60">Support</p>
                    <p className="mt-2 text-xl font-semibold">Priority</p>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-white/10 p-5">
                  <p className="text-sm font-semibold text-white">Why it feels premium</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    More hierarchy, stronger typography, refined surfaces, and a clearer plan narrative make the product
                    feel like a paid SaaS instead of a basic converter.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="surface-panel flex flex-wrap items-center justify-between gap-4 rounded-[2rem] px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Built for modern conversion flows</p>
            <p className="mt-2 text-lg text-ink/70">Fast uploads, CLI-backed output, and polished UX in one clean stack.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/60">
            <span className="rounded-full border border-ink/10 px-4 py-2">FFmpeg powered</span>
            <span className="rounded-full border border-ink/10 px-4 py-2">LibreOffice conversion</span>
            <span className="rounded-full border border-ink/10 px-4 py-2">ImageMagick pipeline</span>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <article className="surface-panel rounded-[1.9rem] px-5 py-6">
            <p className="text-sm text-ink/60">Positioning</p>
            <p className="mt-3 text-3xl font-semibold text-ink">Premium</p>
          </article>
          <article className="surface-panel rounded-[1.9rem] px-5 py-6">
            <p className="text-sm text-ink/60">Security</p>
            <p className="mt-3 text-3xl font-semibold text-ink">Auto cleanup</p>
          </article>
          <article className="surface-panel rounded-[1.9rem] px-5 py-6">
            <p className="text-sm text-ink/60">Monetization</p>
            <p className="mt-3 text-3xl font-semibold text-ink">Free + Pro</p>
          </article>
          <article className="surface-panel rounded-[1.9rem] px-5 py-6">
            <p className="text-sm text-ink/60">Acquisition</p>
            <p className="mt-3 text-3xl font-semibold text-ink">SEO routes</p>
          </article>
        </section>

        <section id="tools" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Premium tools</p>
              <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">High-intent landing pages for every converter</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-ink/70">
              Each route is SEO-ready, visually stronger, and designed to push more visitors from search result to conversion completion.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {tools.map((tool, index) => (
              <article
                key={tool.slug}
                className="surface-panel group flex h-full flex-col rounded-[2rem] px-6 py-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(17,33,29,0.12)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-pine/20 bg-pine/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-pine">
                    Tool {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-ink/50">SEO route</span>
                </div>
                <h3 className="mt-5 font-display text-3xl leading-tight text-ink">{tool.heading}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink/70">{tool.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tool.keywords.slice(0, 2).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/60"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${tool.slug}`}
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition group-hover:bg-accent"
                >
                  Open premium tool page
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="surface-panel rounded-[2.25rem] px-7 py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Workflow</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Premium feel, simple mechanics</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              The redesign improves trust and perceived value without slowing users down. It still feels lightweight, but
              now the experience looks subscription-ready.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => (
              <article key={item.step} className="surface-panel rounded-[2rem] px-6 py-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{item.step}</p>
                <h3 className="mt-4 font-display text-3xl text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/70">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel rounded-[2.25rem] px-7 py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Customer proof</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Trust-building language for high-intent buyers</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/70">
              Million-dollar websites are not just prettier. They reduce hesitation with social proof, clear outcomes, and signals that the product is maintained like a real business.
            </p>
            <div className="mt-6 grid gap-4">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-[1.75rem] border border-ink/10 bg-white/70 px-5 py-5">
                  <p className="text-lg leading-8 text-ink">"{testimonial.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-sm text-ink/60">{testimonial.role}</p>
                </article>
              ))}
            </div>
          </div>

          <div id="security" className="surface-panel rounded-[2.25rem] px-7 py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Security</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Business-ready trust and operations signals</h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <p className="text-sm font-semibold text-ink">Validated uploads</p>
                <p className="mt-2 text-sm leading-7 text-ink/70">File type and size checks are enforced before conversion begins.</p>
              </div>
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <p className="text-sm font-semibold text-ink">Safe command execution</p>
                <p className="mt-2 text-sm leading-7 text-ink/70">CLI tools run without shell interpolation to reduce command injection risk.</p>
              </div>
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <p className="text-sm font-semibold text-ink">Temporary storage policy</p>
                <p className="mt-2 text-sm leading-7 text-ink/70">Uploaded and generated files are scheduled for automatic deletion after processing.</p>
              </div>
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <p className="text-sm font-semibold text-ink">Commercial upgrade path</p>
                <p className="mt-2 text-sm leading-7 text-ink/70">Free acquisition is paired with a clear Pro and Teams monetization story.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Pricing</p>
              <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">A clear path from free utility to paid SaaS</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-ink/70">
              The free plan keeps acquisition friction low. Pro and Teams position the app as a premium product with room for monetization growth.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.featured
                    ? "premium-card rounded-[2.25rem] px-6 py-7 text-white"
                    : "surface-panel rounded-[2.25rem] px-6 py-7"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={plan.featured ? "text-sm font-semibold uppercase tracking-[0.22em] text-white/60" : "text-sm font-semibold uppercase tracking-[0.22em] text-ink/50"}>
                      {plan.name}
                    </p>
                    <p className={plan.featured ? "mt-3 font-display text-5xl text-white" : "mt-3 font-display text-5xl text-ink"}>
                      {plan.price}
                      <span className={plan.featured ? "ml-1 text-lg text-white/70" : "ml-1 text-lg text-ink/50"}>
                        {plan.cadence}
                      </span>
                    </p>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                      Recommended
                    </span>
                  ) : null}
                </div>
                <p className={plan.featured ? "mt-5 text-sm leading-7 text-white/70" : "mt-5 text-sm leading-7 text-ink/70"}>
                  {plan.description}
                </p>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className={
                        plan.featured
                          ? "rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white"
                          : "rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink"
                      }
                    >
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href={plan.href}
                  className={
                    plan.featured
                      ? "mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-ink transition hover:bg-mist"
                      : "mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-pine"
                  }
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel rounded-[2.25rem] px-7 py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Why this upgrade works</p>
            <h2 className="mt-3 font-display text-4xl text-ink">More trust, more value, more conversion intent</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              Premium products do not just add darker cards or gradients. They make pricing legible, create trust before
              the user uploads a file, and position the upgrade path clearly.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <p className="text-sm font-semibold text-ink">Perceived quality</p>
                <p className="mt-2 text-sm leading-7 text-ink/70">Stronger spacing, hierarchy, and surfaces make the app feel more paid-ready.</p>
              </div>
              <div className="rounded-[1.75rem] bg-mist px-5 py-5">
                <p className="text-sm font-semibold text-ink">Revenue framing</p>
                <p className="mt-2 text-sm leading-7 text-ink/70">The upgrade path is now visible before and after conversion, not hidden in the footer.</p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[2.25rem] px-7 py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">FAQ</p>
            <div className="mt-5 space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] border border-ink/10 bg-white/70 px-5 py-5">
                  <h3 className="text-lg font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/70">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-card rounded-[2.5rem] px-8 py-10 text-white sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Final CTA</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl">
                Launch a cleaner conversion workflow and grow into Pro when the traffic is ready.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                Start with the free no-login acquisition loop, then monetize with larger limits, ad-free results, and premium support.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pdf-to-word"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ink transition hover:bg-mist"
              >
                Open a converter
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
