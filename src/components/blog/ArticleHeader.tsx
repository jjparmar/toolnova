import { Author } from "@/data/authors";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { formatDisplayDate, formatReadTime } from "@/lib/format";

interface ArticleHeaderProps {
  title: string;
  description: string;
  author: Author;
  publishedDate: string;
  modifiedDate?: string;
  readingTime?: number | string;
  category?: string;
}

export function ArticleHeader({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  readingTime,
  category,
}: ArticleHeaderProps) {
  const readLabel =
    typeof readingTime === "number"
      ? formatReadTime(readingTime)
      : formatReadTime(readingTime);

  return (
    <header className="mb-2 md:mb-4">
      {category && (
        <div className="mb-4">
          <span className="section-kicker">{category}</span>
        </div>
      )}

      <h1 className="font-heading mb-4 max-w-4xl text-[1.85rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.65rem]">
        {title}
      </h1>

      <p className="mb-7 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-[var(--border-color)] bg-card/70 px-4 py-3.5 shadow-sm sm:px-5">
        <Link
          href={`/author/${author.slug}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-sm font-bold text-white shadow-md shadow-violet-500/25">
            {author.image ||
              author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-foreground">{author.name}</span>
              {author.credentials && (
                <span className="text-xs text-muted-foreground">
                  · {author.credentials}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{author.role}</p>
          </div>
        </Link>

        <div className="hidden h-8 w-px bg-border sm:block" aria-hidden />

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary/80" aria-hidden />
            <time dateTime={publishedDate}>
              {formatDisplayDate(publishedDate)}
            </time>
          </div>

          {modifiedDate && modifiedDate !== publishedDate && (
            <div className="text-xs">
              Updated{" "}
              <time dateTime={modifiedDate}>
                {formatDisplayDate(modifiedDate)}
              </time>
            </div>
          )}

          {readLabel && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary/80" aria-hidden />
              <span>{readLabel}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
