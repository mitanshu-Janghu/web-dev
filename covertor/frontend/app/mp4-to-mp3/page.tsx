import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

const tool = getTool("mp4-to-mp3");

export const metadata: Metadata = {
  title: "MP4 to MP3 Converter Online",
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: "/mp4-to-mp3",
  },
  openGraph: {
    title: `${tool.name} | ${siteConfig.name}`,
    description: tool.description,
    url: `${siteConfig.baseUrl}/mp4-to-mp3`,
  },
};

export default function Mp4ToMp3Page() {
  return <ToolPage tool={tool} />;
}
