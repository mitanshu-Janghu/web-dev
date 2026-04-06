export type ToolSlug = "mp4-to-mp3" | "pdf-to-word" | "image-to-pdf";

export type ToolDefinition = {
  slug: ToolSlug;
  name: string;
  shortLabel: string;
  description: string;
  accept: string;
  heading: string;
  keywords: string[];
  acceptedFormatsLabel: string;
  outputLabel: string;
};

export const tools: ToolDefinition[] = [
  {
    slug: "mp4-to-mp3",
    name: "MP4 to MP3 Converter",
    shortLabel: "MP4 to MP3",
    description:
      "Upload an MP4 file and extract crisp MP3 audio in seconds with a fast web-based MP4 to MP3 converter.",
    accept: "video/mp4,.mp4",
    heading: "Convert MP4 to MP3 Online",
    keywords: ["mp4 to mp3 converter", "extract audio from mp4", "video to mp3"],
    acceptedFormatsLabel: "Accepts .mp4 files up to 10MB",
    outputLabel: "Download MP3",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word Converter",
    shortLabel: "PDF to Word",
    description:
      "Turn PDF files into editable Word documents with a clean PDF to Word converter built for quick document workflows.",
    accept: "application/pdf,.pdf",
    heading: "Convert PDF to Word Online",
    keywords: ["pdf to word converter", "pdf to docx", "editable word document"],
    acceptedFormatsLabel: "Accepts .pdf files up to 10MB",
    outputLabel: "Download DOCX",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF Converter",
    shortLabel: "Image to PDF",
    description:
      "Combine a single image into a polished PDF with this simple image to PDF converter for JPG, PNG, and WebP files.",
    accept: "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp",
    heading: "Convert Image to PDF Online",
    keywords: ["image to pdf converter", "jpg to pdf", "png to pdf"],
    acceptedFormatsLabel: "Accepts .png, .jpg, .jpeg, and .webp files up to 10MB",
    outputLabel: "Download PDF",
  },
];

export function getTool(slug: ToolSlug) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    throw new Error(`Unknown tool slug: ${slug}`);
  }

  return tool;
}
