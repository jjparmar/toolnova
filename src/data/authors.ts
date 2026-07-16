export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  specialties: string[];
  profileUrl?: string;
}

export const EDITORIAL_AUTHOR: Author = {
  slug:"editorial-team",
  name:"ToolNova Editorial Team",
  role:"Editorial Team",
  bio:"ToolNova articles are written and reviewed by the ToolNova editorial team. We focus on practical, transparent guidance for AI tools, productivity workflows, study resources, and document utilities.",
  image:"TN",
  credentials:"ToolNova Editorial",
  specialties: ["AI Tools","Study Workflows","Writing Tools","PDF and Image Utilities","Productivity",
  ],
  profileUrl:"https://www.toolnovahub.com/author/editorial-team",
};

export const authors: Author[] = [EDITORIAL_AUTHOR];

export function getAuthor(_slug: string): Author {
  return EDITORIAL_AUTHOR;
}

export function getAllAuthors(): Author[] {
  return authors;
}
