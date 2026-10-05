import React from "react";
import Link from "next/link";
import { personalInfo } from "@/data/personal";
import { navLinks } from "@/data/navigation";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border-default pt-24 pb-12 section-dark relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-electric/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Column 1: Info (Spans 4) */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <Logo size="md" className="items-start [&>div]:items-start" />
            </div>
            <p className="text-text-secondary mb-8 max-w-sm text-lg leading-relaxed">
              {personalInfo.tagline}
            </p>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center text-white font-mono text-sm uppercase tracking-widest hover:text-blue-electric transition-colors"
            >
              {personalInfo.email}
              <span className="ml-3 p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-electric/10 group-hover:border-blue-electric/30 transition-colors">
                 <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Column 2: Navigation (Spans 2) */}
          <div className="lg:col-span-3 lg:col-start-7 flex flex-col space-y-4">
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-tertiary mb-4">Explore</h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  className="text-text-secondary hover:text-white transition-colors w-fit text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Social (Spans 2) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-tertiary mb-4">Social</h4>
            <nav className="flex flex-col space-y-3">
              {Object.entries(personalInfo.social).map(([platform, url]) => (
                url && (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-white transition-colors capitalize w-fit flex items-center text-sm group"
                  >
                    {platform}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                )
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border-default text-sm text-text-tertiary">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-mono text-xs uppercase tracking-widest">
            <span>Built with Next.js</span>
            <span className="hidden sm:inline text-border-hover">•</span>
            <span>Based in {personalInfo.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
