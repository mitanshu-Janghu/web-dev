import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Read the terms of service for ${siteConfig.name}.`,
};

const sections = [
  {
    title: "Service scope",
    body:
      "File Converter Pro provides browser-based file conversion tools. The free tier is offered on an as-available basis, while future paid tiers may include higher limits, cleaner workflows, and premium support.",
  },
  {
    title: "Acceptable use",
    body:
      "You agree not to upload unlawful content, abuse system limits, attempt to disrupt conversions, or use the service in ways that threaten system stability or security.",
  },
  {
    title: "No warranty",
    body:
      "Conversions are provided without guarantees of uninterrupted availability, perfect formatting retention, or fitness for a particular purpose. Users should verify outputs before relying on them in important workflows.",
  },
  {
    title: "Commercial terms",
    body:
      "Paid features, if enabled later, may be governed by separate billing, renewal, and cancellation terms. Enterprise or team agreements may supersede these standard terms where applicable.",
  },
];

export default function TermsPage() {
  return (
    <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="surface-panel rounded-[2.25rem] px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Legal</p>
          <h1 className="mt-3 font-display text-5xl text-ink">Terms of Service</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
            These terms describe the rules for using {siteConfig.name} and the boundaries of the free and future premium offerings.
          </p>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="surface-panel rounded-[2rem] px-7 py-7">
            <h2 className="font-display text-3xl text-ink">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
