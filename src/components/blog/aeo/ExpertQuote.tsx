import React from "react";
import NextImage from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

interface ExpertQuoteProps {
    quote: string;
    author: string;
    role: string;
    image?: string;
}

export default function ExpertQuote({ quote, author, role, image }: ExpertQuoteProps) {
    return (
        <div className="expert-quote my-12 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full shadow-lg">
                <FaQuoteLeft className="w-5 h-5" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 pt-10 shadow-lg shadow-purple-900/5 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-purple-600 dark:text-purple-400 font-serif leading-none">&quot;</span>
                </div>
                <blockquote className="text-xl text-slate-800 font-medium leading-relaxed italic mb-6">
                    {quote}
                </blockquote>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    {image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                            <NextImage
                                src={image}
                                alt={author}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                            {author.charAt(0)}
                        </div>
                    )}

                    <div>
                        <cite className="not-italic font-bold text-slate-900 block">
                            {author}
                        </cite>
                        <span className="text-sm text-slate-500 font-medium">
                            {role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
