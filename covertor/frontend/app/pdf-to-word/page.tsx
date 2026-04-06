import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

const tool = getTool("pdf-to-word");

export const metadata: Metadata = {
  title: "PDF to Word Converter Online",
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: "/pdf-to-word",
  },
  openGraph: {
    title: `${tool.name} | ${siteConfig.name}`,
    description: tool.description,
    url: `${siteConfig.baseUrl}/pdf-to-word`,
  },
};

export default function PdfToWordPage() {
  return <ToolPage tool={tool} />;
}
