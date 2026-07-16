"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLink, FaCheck } from"react-icons/fa";
import { useState } from"react";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex gap-3">
            <a
                href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
            >
                <FaFacebookF className="text-sm" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
                aria-label="Share on Twitter"
            >
                <FaTwitter className="text-sm" />
            </a>
            <a
                href={`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                aria-label="Share on LinkedIn"
            >
                <FaLinkedinIn className="text-sm" />
            </a>
            <button
                onClick={handleCopy}
                className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                aria-label="Copy link"
            >
                {copied ? <FaCheck className="text-sm text-green-600" /> : <FaLink className="text-sm" />}
            </button>
        </div>
    );
}
