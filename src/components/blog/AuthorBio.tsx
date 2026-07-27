'use client';

import { Calendar, Clock } from 'lucide-react';

interface AuthorBioProps {
    name: string;
    date: string;
    readingTime: number;
    category: string;
}

export function AuthorBio({ name, date, readingTime, category }: AuthorBioProps) {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="flex flex-wrap items-center gap-4 py-4 border-b border-[var(--border-color)]">
            {/* Author Avatar & Name */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d946ef] flex items-center justify-center text-white font-bold text-sm">
                    {initials}
                </div>
                <div>
                    <div className="font-semibold font-heading text-foreground">{name}</div>
                    <div className="text-sm text-muted-foreground">Content Writer</div>
                </div>
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-8 bg-border" />

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </time>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    {category}
                </span>
            </div>
        </div>
    );
}
