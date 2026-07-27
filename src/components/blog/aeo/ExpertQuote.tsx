import React from"react";
import NextImage from"next/image";
import { FaQuoteLeft } from"react-icons/fa";

interface ExpertQuoteProps {
    quote: string;
    author: string;
    role: string;
    image?: string;
}

export default function ExpertQuote({ quote, author, role, image }: ExpertQuoteProps) {
    return (
        <div className="expert-quote my-12 relative">
            <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-primary p-3 text-primary-foreground shadow-lg">
                <FaQuoteLeft className="h-5 w-5" />
            </div>

            <div className="content-panel relative p-8 pt-10 shadow-lg shadow-primary/5">
                <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-serif text-2xl leading-none text-primary">&quot;</span>
                </div>
                <blockquote className="text-xl text-foreground font-medium leading-relaxed italic mb-6">
                    {quote}
                </blockquote>

                <div className="flex items-center gap-4 border-t border-[var(--border-color)] pt-6">
                    {image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                            <NextImage
                                src={image}
                                alt={author}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                            {author.charAt(0)}
                        </div>
                    )}

                    <div>
                        <cite className="not-italic font-bold text-foreground block">
                            {author}
                        </cite>
                        <span className="text-sm text-muted-foreground font-medium">
                            {role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
