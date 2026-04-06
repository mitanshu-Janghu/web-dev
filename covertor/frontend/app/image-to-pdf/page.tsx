import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

const tool = getTool("image-to-pdf");

export const metadata: Metadata = {
  title: "Image to PDF Converter Online",
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: "/image-to-pdf",
  },
  openGraph: {
    title: `${tool.name} | ${siteConfig.name}`,
    description: tool.description,
    url: `${siteConfig.baseUrl}/image-to-pdf`,
  },
};

export default function ImageToPdfPage() {
  return <ToolPage tool={tool} />;
}
