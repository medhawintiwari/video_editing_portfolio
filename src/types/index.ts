export interface VideoProject {
  slug: string;
  title: string;
  client: string;
  category: "Commercials" | "Music Videos" | "Short Film" | "Social Reels";
  year: number;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  role: string;
  software: string[];
  tags: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  heroHeadline: string[];
  heroSubtitle: string;
  about: string[];
  philosophy: string;
  email: string;
  phone?: string;
  location: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    vimeo?: string;
  };
  skills: SkillGroup[];
  stats: StatItem[];
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  proficiency: number; // 0-100
  icon?: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
