import { Metadata } from"next";
import Link from"next/link";
import {
  getToolSchema,
  getHowToSchema,
  getFAQSchema,
  schemaToJsonLd,
} from"@/lib/schema";
import { generateBreadcrumbSchema } from"@/lib/seo-advanced";
import { RelatedTools } from"@/components/RelatedTools";
import { ToolRichContent } from"@/components/ToolRichContent";
import ImageCropClient from"./client";

const faqs = [
  {
    question:"How do I crop part of an image online?",
    answer:"Upload your image, drag the selection box over the area you want, use the corner handles to refine the size, then click Apply crop and Download. Everything runs in your browser.",
  },
  {
    question:"Can I lock the aspect ratio while cropping?",
    answer:"Yes. Choose presets like 1:1, 4:3, 16:9, or 9:16. Free mode lets you select any rectangle.",
  },
  {
    question:"Is my image uploaded to a server?",
    answer:"No. Cropping is processed entirely in your browser. Your file is not uploaded to ToolNova servers.",
  },
  {
    question:"What formats can I export?",
    answer:"PNG, JPG, and WebP are supported as export formats.",
  },
];

const steps = [
  {
    step: 1,
    title:"Upload image",
    desc:"Drop a JPG, PNG, or WebP file into the crop tool.",
  },
  {
    step: 2,
    title:"Select region",
    desc:"Drag the crop box and resize with corner/edge handles. Optionally lock an aspect ratio.",
  },
  {
    step: 3,
    title:"Apply & download",
    desc:"Apply the crop, preview the result, and download the cropped file.",
  },
];

const benefits = [
  {
    title:"Pixel-accurate selection",
    desc:"Visual selection plus X/Y/width/height controls for precise crops.",
  },
  {
    title:"Social aspect ratios",
    desc:"One-click 1:1, 16:9, 9:16 and more for posts and thumbnails.",
  },
  {
    title:"Private by design",
    desc:"No account, no server upload — ideal for sensitive screenshots.",
  },
  {
    title:"Free forever",
    desc:"Unlimited crops in the browser with no watermarks.",
  },
];

export const metadata: Metadata = {
  title:"Crop Image Online Free – Select Area & Download | ToolNova",
  description:"Crop any part of an image online free. Drag to select the region, lock aspect ratios (1:1, 16:9), and download PNG/JPG/WebP. Private browser crop tool — no signup.",
  keywords: ["crop image online free","image crop tool select area","crop photo free no signup","crop image 1:1 16:9","browser image cropper",
  ],
  alternates: { canonical:"https://www.toolnovahub.com/tools/image-crop" },
  openGraph: {
    title:"Crop Image Online Free | ToolNova",
    description:"Drag-select any region and crop images free in your browser. No upload, no watermark.",
    url:"https://www.toolnovahub.com/tools/image-crop",
    type:"website",
  },
};

export default function ImageCropPage() {
  const description ="Free online image cropper with interactive selection. Choose any region, lock aspect ratios, and download the result — processed privately in your browser.";

  const toolSchema = getToolSchema("Crop Image",
    description,"https://www.toolnovahub.com/tools/image-crop",
  );
  const howToSchema = getHowToSchema("How to crop an image online free",
    description,
    steps.map((s) => ({
      name: s.title,
      text: s.desc,
      url:`https://www.toolnovahub.com/tools/image-crop#step-${s.step}`,
    })),
  );
  const faqSchema = getFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name:"Home", url:"https://www.toolnovahub.com" },
    { name:"Tools", url:"https://www.toolnovahub.com/tools" },
    {
      name:"Image & PDF Tools",
      url:"https://www.toolnovahub.com/tools/image-pdf-tools",
    },
    { name:"Crop Image", url:"https://www.toolnovahub.com/tools/image-crop" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <ImageCropClient />
      <ToolRichContent
        title="Crop Image"
        description={description}
        steps={steps}
        benefits={benefits}
        faq={faqs}
      />
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Related tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tools/resize-image" className="underline underline-offset-4">
            Resize Image
          </Link>
          <Link
            href="/tools/image-compressor"
            className="underline underline-offset-4"
          >
            Image Compressor
          </Link>
          <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">
            All image & PDF tools
          </Link>
        </div>
      </section>
      <RelatedTools currentTool="image-crop" category="Image" />
    </>
  );
}
