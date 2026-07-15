'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

interface BlogHeroProps {
    post: BlogPost;
}

export function BlogHero({ post }: BlogHeroProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative mx-auto max-w-[1200px] px-6 py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2">
                            <span className="px-4 py-1.5 bg-primary/20 text-teal-200 text-sm font-semibold rounded-full border border-primary/30">
                                {post.category}
                            </span>
                            <span className="text-teal-200/60 text-sm">Featured article</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {post.title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                            {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-blue-600/25"
                        >
                            Read Full Article
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Featured Image */}
                    <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/25 to-sky-500/20 shadow-2xl">
                            {post.coverImage && post.coverImage !== '' ? (
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-8xl opacity-30">📝</div>
                                </div>
                            )}
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-sky-500/20 blur-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
