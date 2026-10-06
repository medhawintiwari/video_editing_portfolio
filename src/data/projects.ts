import { VideoProject } from "@/types";

export const projects: VideoProject[] = [
  {
    slug: "sample-edit-new",
    title: "Losers To Winners",
    client: "@theskyfallfx",
    category: "Motivational",
    year: 2025,
    duration: "1:04",
    description: "losers to winners",
    thumbnail: "/images/projects/reel_latest.jpg",
    videoUrl: "https://www.instagram.com/reel/Ddy24dTzExx/?utm_source=ig_web_copy_link&stkn=NTc4MTIwNjQ2YQ==",
    role: "Editor & Motion Designer",
    software: ["After Effects", "CapCut"],
    tags: ["Reel", "Dynamic", "Viral"],
  },
  {
    slug: "sample-edit-1",
    title: "Samosa Edit",
    client: "@theskyfallfx",
    category: "Social Reels",
    year: 2024,
    duration: "0:15",
    description: "samosa edit ft. loser (tame impala)",
    thumbnail: "/images/projects/reel1.jpg",
    videoUrl: "https://www.instagram.com/reel/DcY0DZchXa-/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    role: "Editor & Motion Designer",
    software: ["After Effects", "CapCut"],
    tags: ["Reel", "Aesthetic", "Beat-Synced"],
  },
  {
    slug: "sample-edit-2",
    title: "We Don't Leave Because We Want To",
    client: "@theskyfallfx",
    category: "Social Reels",
    year: 2024,
    duration: "0:20",
    description: "we don't leave because we want to, but because we have to.",
    thumbnail: "/images/projects/reel2.jpg",
    videoUrl: "https://www.instagram.com/reel/Db8fX2TyqjE/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    role: "Editor & Colorist",
    software: ["After Effects"],
    tags: ["Reel", "Cinematic", "Hook"],
  },
  {
    slug: "sample-edit-3",
    title: "Mending [ A Stop Motion ]",
    client: "@theskyfallfx",
    category: "Social Reels",
    year: 2024,
    duration: "0:18",
    description: "mending. [ a stop motion ]",
    thumbnail: "/images/projects/reel3.jpg",
    videoUrl: "https://www.instagram.com/reel/Daat-Djp3z7/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    role: "Editor",
    software: ["After Effects", "CapCut"],
    tags: ["Reel", "Dynamic", "Viral"],
  },
];

export function getProjectBySlug(slug: string): VideoProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = [
  "All",
  "Commercials",
  "Music Videos",
  "Short Film",
  "Social Reels",
] as const;
