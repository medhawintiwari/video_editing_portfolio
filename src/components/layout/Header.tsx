"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { usePathname } from "next/navigation";
import { LiquidButton } from "@/components/ui/liquid-metal-button";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled || mobileMenuOpen
            ? "py-4 bg-bg-primary/80 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => setMobileMenuOpen(false)} className="z-50 relative">
            <Logo size="sm" showText={true} layout="horizontal" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 mr-4">
              {navLinks.map((link) => {
                const href =
                  isHome || !link.href.startsWith("#")
                    ? link.href
                    : `/${link.href}`;

                return (
                  <Link 
                    key={link.label} 
                    href={href}
                    className="px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            
            <Link href="#contact" className="hidden lg:block">
               <LiquidButton size="sm" className="rounded-full">
                 Book Now
               </LiquidButton>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white z-50 relative p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-bg-primary/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out-expo md:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col space-y-6 text-center">
          {navLinks.map((link, i) => {
            const href =
              isHome || !link.href.startsWith("#")
                ? link.href
                : `/${link.href}`;
            return (
              <Link
                key={link.label}
                href={href}
                className={`text-3xl font-heading font-bold text-white transition-all duration-500 delay-${i * 100} ${
                  mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } hover:text-blue-electric`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className={`mt-8 transition-all duration-500 delay-300 ${
             mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
             <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
               <LiquidButton size="lg" className="w-full">
                 Start a Project
               </LiquidButton>
             </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
