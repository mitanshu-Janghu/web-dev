import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for sales, support, or partnership questions.`,
};

const contactCards = [
  {
    title: "Sales",
    value: siteConfig.salesEmail,
    href: `mailto:${siteConfig.salesEmail}`,
    description: "Talk about Pro, Teams, or a custom deployment.",
  },
  {
    title: "Support",
    value: siteConfig.supportEmail,
    href: `mailto:${siteConfig.supportEmail}`,
    description: "Ask product or implementation questions.",
  },
  {
    title: "Try the product",
    value: "Open converter",
    href: "/mp4-to-mp3",
    description: "Jump directly into the no-login flow.",
  },
];

export default function ContactPage() {
  return (
    <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="surface-panel rounded-[2.25rem] px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Contact</p>
          <h1 className="mt-3 font-display text-5xl text-ink">Talk to the team behind {siteConfig.name}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
            Reach out for support, partnerships, or commercial conversations about rolling this into a larger conversion workflow.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => (
            <article key={card.title} className="surface-panel rounded-[2rem] px-6 py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/50">{card.title}</p>
              <Link href={card.href} className="mt-4 block font-display text-3xl text-ink hover:text-accent">
                {card.value}
              </Link>
              <p className="mt-3 text-sm leading-7 text-ink/70">{card.description}</p>
            </article>
          ))}
        </section>

        <section className="premium-card rounded-[2.25rem] px-8 py-9 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Commercial readiness</p>
          <h2 className="mt-3 font-display text-4xl text-white">Built to graduate from utility app to monetized SaaS</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
            The current product already supports SEO acquisition, a free usage model, premium upsells, and a backend prepared for more serious operational controls.
          </p>
        </section>
      </div>
    </main>
  );
}
