import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the privacy policy for ${siteConfig.name}.`,
};

const sections = [
  {
    title: "Information we process",
    body:
      "We process uploaded files temporarily so conversions can complete. We also process basic request metadata such as IP-based rate limiting signals and operational logs required to run the service.",
  },
  {
    title: "File retention",
    body:
      "Uploaded and converted files are intended for temporary storage only and are scheduled for cleanup after processing windows expire. This service is not designed as permanent cloud storage.",
  },
  {
    title: "Security practices",
    body:
      "We use file validation, size limits, safe command execution patterns, and temporary storage rules to reduce risk during processing. No service can promise absolute security, so avoid uploading highly sensitive files unless you control the deployment environment.",
  },
  {
    title: "Contact",
    body: `For privacy questions, contact ${siteConfig.supportEmail}.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="surface-panel rounded-[2.25rem] px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">Legal</p>
          <h1 className="mt-3 font-display text-5xl text-ink">Privacy Policy</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
            This page outlines how {siteConfig.legalName} handles temporary files, operational data, and service-related processing for {siteConfig.name}.
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
