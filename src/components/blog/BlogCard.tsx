'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

const categoryColors: Record<string, string> = {
    'AI Tools': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'Productivity': 'bg-green-500/10 text-green-600 border-green-500/20',
    'Content Creation': 'bg-primary/10 text-primary border-primary/20',
    'Business': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    'Education': 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    'Technology': 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
    const categoryColor = categoryColors[post.category] || 'bg-slate-500/10 text-slate-600 border-slate-500/20';

    return (
        <Link href={`/blog/${post.slug}`} className="group">
            <article className={`h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 ${featured ? 'md:flex' : ''}`}>
                {/* Image */}
                <div className={`relative bg-gradient-to-br from-slate-100 to-slate-50 ${featured ? 'md:w-2/5 aspect-[4/3] md:aspect-auto' : 'aspect-[16/9]'}`}>
                    {post.coverImage && post.coverImage !== '' ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">📄</div>
                        </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${categoryColor}`}>
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={`p-6 flex flex-col ${featured ? 'md:w-3/5 md:p-8' : ''}`}>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime} min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className={`font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className={`text-slate-600 leading-relaxed mb-4 flex-grow ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
                        {post.excerpt}
                    </p>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                                {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
