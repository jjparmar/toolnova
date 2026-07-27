"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { formatDisplayDate, formatReadTime } from "@/lib/format";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  priority?: boolean;
}

const categoryColors: Record<string, string> = {
  "AI Tools": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Productivity: "bg-green-500/10 text-green-600 border-green-500/20",
  "Content Creation": "bg-primary/10 text-primary border-primary/20",
  Business: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Education: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  Technology: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  "Study Tips": "bg-violet-500/10 text-violet-700 border-violet-500/20",
  "Writing Tips": "bg-pink-500/10 text-pink-700 border-pink-500/20",
  "PDF & Productivity": "bg-rose-500/10 text-rose-700 border-rose-500/20",
  Career: "bg-amber-500/10 text-amber-800 border-amber-500/20",
};

export function BlogCard({
  post,
  featured = false,
  priority = false,
}: BlogCardProps) {
  const categoryColor =
    categoryColors[post.category] ||
    "bg-accent text-primary border-primary/20";

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article
        className={`surface-card h-full overflow-hidden p-0 ${
          featured ? "md:flex" : ""
        }`}
      >
        <div
          className={`relative bg-muted ${
            featured
              ? "aspect-[4/3] md:aspect-auto md:w-2/5"
              : "aspect-[16/9]"
          }`}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.imageAlt || post.title}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 40vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority || featured}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-sky-500/10" />
          )}
          <div className="absolute left-4 top-4">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${categoryColor}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        <div
          className={`flex flex-col p-6 ${featured ? "md:w-3/5 md:p-8" : ""}`}
        >
          <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              <span>{formatReadTime(post.readTime)}</span>
            </div>
          </div>

          <h2
            className={`mb-3 line-clamp-2 font-bold text-foreground transition-colors group-hover:text-primary ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h2>

          <p
            className={`mb-4 flex-grow leading-relaxed text-muted-foreground ${
              featured ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-xs font-bold text-white">
                {(post.author || "TN")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <span className="line-clamp-1">{post.author}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
              Read more
              <ArrowRight className="h-4 w-4" aria-hidden />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
