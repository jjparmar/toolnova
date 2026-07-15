import { Author } from '@/data/authors';
import Link from 'next/link';
import { Calendar, User, Clock } from 'lucide-react';

interface ArticleHeaderProps {
    title: string;
    description: string;
    author: Author;
    publishedDate: string;
    modifiedDate?: string;
    readingTime?: number;
    category?: string;
}

export function ArticleHeader({
    title,
    description,
    author,
    publishedDate,
    modifiedDate,
    readingTime,
    category
}: ArticleHeaderProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <header className="mb-12">
            {/* Category Badge */}
            {category && (
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                        {category}
                    </span>
                </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {description}
            </p>

            {/* Author & Meta Info */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-200 dark:border-slate-800">
                {/* Author */}
                <Link
                    href={`/author/${author.slug}`}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                        {author.image}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{author.name}</span>
                            {author.credentials && (
                                <span className="text-xs text-muted-foreground">• {author.credentials}</span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{author.role}</p>
                    </div>
                </Link>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(publishedDate)}</span>
                    </div>

                    {modifiedDate && modifiedDate !== publishedDate && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs">Updated: {formatDate(modifiedDate)}</span>
                        </div>
                    )}

                    {readingTime && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{readingTime} min read</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
