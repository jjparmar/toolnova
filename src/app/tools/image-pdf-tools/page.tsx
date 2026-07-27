import Link from 'next/link';
import { getCategoryAEO } from '@/lib/global-aeo-content';
import { generateFAQPageSchema, generateBreadcrumbListSchema, CATEGORY_BREADCRUMBS } from '@/lib/seo-worldclass';
import {
    Image as ImageIcon,
    ArrowRight,
    FileText,
    Merge,
    Scissors,
    ImagePlus,
    Shrink,
    ArrowRightLeft
} from 'lucide-react';

export const metadata = {
    title: 'Image & PDF Tools - Merge, Split, Compress & Convert | ToolNova',
    description: 'Free image and PDF tools: merge, split, reorder pages with thumbnails, crop, resize, compress, convert JPG/PNG. Private browser tools.',
    alternates: { canonical: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
    openGraph: {
        title: 'Image & PDF Tools - Merge, Split, Compress & Convert | ToolNova',
        description: 'Use free image and PDF tools to merge, split, compress, and convert files instantly.',
        url: 'https://www.toolnovahub.com/tools/image-pdf-tools',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image & PDF Tools | ToolNova',
        description: 'Merge, split, compress, and convert image/PDF files for free.',
    },
};

const tools = [
    { name: 'Merge PDF', slug: 'merge-pdf', description: 'Combine multiple PDFs into one file', icon: Merge },
    { name: 'Split PDF', slug: 'split-pdf', description: 'Extract pages, pick pages, or ZIP all', icon: Scissors },
    { name: 'Compress PDF', slug: 'compress-pdf', description: 'Shrink PDF size for email & portals', icon: Shrink },
    { name: 'Reorder PDF', slug: 'reorder-pdf', description: 'Drag thumbnails to rearrange pages', icon: FileText },
    { name: 'Image to PDF', slug: 'image-to-pdf', description: 'Convert images to PDF documents', icon: ImagePlus },
    { name: 'Image Compressor', slug: 'image-compressor', description: 'Reduce image file size (batch)', icon: Shrink },
    { name: 'Crop Image', slug: 'image-crop', description: 'Select region, rotate, flip & crop', icon: ImageIcon },
    { name: 'Resize Image', slug: 'resize-image', description: 'Resize images by pixels or percentage', icon: ImageIcon },
    { name: 'JPG to PNG', slug: 'jpg-to-png', description: 'Convert JPG images to PNG format', icon: ArrowRightLeft },
    { name: 'PNG to JPG', slug: 'png-to-jpg', description: 'Convert PNG images to JPG format', icon: ArrowRightLeft },
];

export default function ImagePDFToolsPage() {
    const aeoContent = getCategoryAEO('image-pdf-tools');
    const faqSchema = generateFAQPageSchema(aeoContent.faqs);
    const breadcrumbSchema = generateBreadcrumbListSchema(CATEGORY_BREADCRUMBS['image-pdf-tools']);

    return (
        <div className="min-h-screen w-full bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="mx-auto max-w-[1100px] px-6 py-10">
                <div className="mb-10 text-center">
                    <div className="section-kicker mb-4">
                        <ImageIcon className="h-4 w-4" />
                        {tools.length} free tools · Browser-private
                    </div>
                    <h1 className="font-heading mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                      Image &amp; PDF tools
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                        Merge, split, compress, crop, convert, and optimize files — processed in your browser for privacy. Free, unlimited, no account.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
                        <Link
                          href="/tools/compress-pdf"
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-semibold text-primary"
                        >
                          Compress PDF
                        </Link>
                        <Link
                          href="/tools/merge-pdf"
                          className="rounded-full border border-border bg-card px-3 py-1.5 font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
                        >
                          Merge PDF
                        </Link>
                        <Link
                          href="/tools/image-compressor"
                          className="rounded-full border border-border bg-card px-3 py-1.5 font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
                        >
                          Compress images
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="surface-card group flex flex-col p-5"
                        >
                            <div className="tool-icon mb-4 bg-gradient-to-br from-[#E5322D] to-[#c42824] transition-transform group-hover:scale-105">
                                <tool.icon className="h-6 w-6" strokeWidth={1.75} />
                            </div>
                            <h3 className="font-heading mb-1.5 text-lg font-bold text-foreground group-hover:text-primary">
                              {tool.name}
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-muted-foreground">{tool.description}</p>
                            <div className="flex items-center gap-1 text-sm font-bold text-primary">
                              Open tool
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pillar content — SEO / AdSense depth */}
                <section className="content-panel mt-20 max-w-4xl mx-auto prose prose-neutral prose-lg p-7 md:p-10">
                    <h2>Free image &amp; PDF tools that run in your browser</h2>
                    <p>
                        ToolNova&apos;s image and PDF utilities are built for students and professionals who need
                        reliable document workflows without installing desktop software. Merge handouts for class,
                        compress screenshots for email, convert slides to PDF for portals, and resize images for
                        web — with client-side processing wherever possible so files stay private.
                    </p>
                    <h3>Recommended document workflow</h3>
                    <ol>
                        <li>Crop a region with <Link href="/tools/image-crop">Crop Image</Link>, then compress or resize with <Link href="/tools/image-compressor">Image Compressor</Link> / <Link href="/tools/resize-image">Resize Image</Link>.</li>
                        <li>Convert photos to PDF with <Link href="/tools/image-to-pdf">Image to PDF</Link>.</li>
                        <li>Combine chapters or appendices with <Link href="/tools/merge-pdf">Merge PDF</Link>.</li>
                        <li>Extract pages when you only need a section with <Link href="/tools/split-pdf">Split PDF</Link>.</li>
                    </ol>
                    <h3>When to use each format</h3>
                    <ul>
                        <li><strong>PDF</strong> — multi-page submissions, print, stable layout across devices</li>
                        <li><strong>JPG</strong> — photos and large camera images (smaller files)</li>
                        <li><strong>PNG</strong> — screenshots, logos, and transparency</li>
                    </ul>
                    <p>
                        Guides:{" "}
                        <Link href="/blog/how-to-compress-a-pdf-to-1mb-online">Compress a PDF to 1MB</Link>
                        {" · "}
                        <Link href="/blog/merge-pdf-without-losing-formatting">Merge without losing formatting</Link>
                        {" · "}
                        <Link href="/blog/compress-images-for-web-speed">Compress images for web speed</Link>
                        {" · "}
                        <Link href="/blog/jpg-png-pdf-workflow-guide">JPG / PNG / PDF workflow</Link>
                    </p>
                </section>

                {aeoContent.faqs?.length > 0 && (
                    <section className="mt-16 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Image &amp; PDF FAQ</h2>
                        <div className="space-y-4">
                            {aeoContent.faqs.map((f, i) => (
                                <div key={i} className="surface-card-quiet rounded-xl p-5">
                                    <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="mt-10 p-6 bg-green-50 rounded-2xl border border-green-200">
                    <p className="text-center text-green-700 font-medium">
                        🔒 All files are processed locally in your browser - nothing is uploaded to any server.
                    </p>
                </div>
            </div>

            {/* Rich Editorial Content to satisfy Google AdSense High-Quality / Thin Content policies */}
            <section className="content-panel mx-auto mt-12 max-w-4xl p-7 md:p-10 prose prose-neutral prose-lg">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-6">
                    Modern Document Management and Web Asset Optimization
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    In today's digital environment, managing documents and digital media files efficiently is a core professional requirement. However, files are often too large for email attachments, upload portals, or web publishing. Addressing these limitations requires robust tools that optimize file sizes and convert formats while maintaining strict data privacy standards. Using local, browser-based utilities is the safest and most efficient way to handle files.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Maximizing Page Load Speeds with Smart Image Compression
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    High-resolution images are essential for modern web design, but they are also the primary cause of slow page loading. Search engines prioritize fast-loading websites, making image optimization critical for Search Engine Optimization (SEO). An Image Compressor reduces the file size of images by removing unnecessary metadata and optimizing pixel data, without causing visible quality loss. For developers and web editors, converting images from older formats to highly optimized formats (such as JPG to PNG, or PNG to JPG) ensures compatibility and faster loading across different devices and browsers.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Managing Complex Document Workflows: Merging and Splitting PDFs
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Portable Document Format (PDF) files are the standard for professional business documents due to their consistency across operating systems. However, editing them can be difficult. Combining multiple independent documents—such as invoices, resume sections, or research papers—into a single file is simplified with a Merge PDF utility. Conversely, extracting specific pages from a large document or dividing a massive ebook into smaller chapters is achieved using a Split PDF tool. Having these utilities readily available in a browser eliminates the need to buy and install heavy desktop software.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Local and Privacy-First Processing: Why Client-Side Execution Matters
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    A major concern when uploading private documents to online converters is data security. Standard online tools upload files to third-party servers, exposing sensitive personal or financial information to data breaches. ToolNova addresses this risk by executing file processing—including merging, splitting, and converting—directly in the user's browser whenever possible. Because your files never leave your device, your private data remains completely secure. For server-side tools, we enforce encryption in transit and delete all files immediately after processing.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Cross-Format Conversions: PNG, JPG, and PDF Best Practices
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Different file formats serve different visual and structural purposes. JPG files are ideal for complex photographs because they support millions of colors while maintaining small file sizes. PNG files are preferred for graphic designs, logos, and screenshots that require transparent backgrounds and sharp borders. Converting between these formats is necessary when adjusting files for different publishing platforms. Additionally, converting multiple reference images into a single PDF document makes it easier to share portfolios, receipts, or notes, ensuring the layout remains identical for every recipient.
                </p>
            </section>

            <section className="mx-auto max-w-[1200px] px-6 pb-12">
                <h2 className="text-xl font-semibold mb-3">Explore more categories</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/tools" className="underline underline-offset-4">All tools</Link>
                    <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
                    <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
                    <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
                    <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
                    <Link href="/blog" className="underline underline-offset-4">Blog</Link>
                </div>
            </section>
        </div>
    );
}
