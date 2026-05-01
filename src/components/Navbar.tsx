"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-dark-900/96 backdrop-blur-xl border-b border-slate-border/40 shadow-lg shadow-black/30"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-blue-secondary flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M3 21V7L10 16.5L14 11L18 16.5L25 7V21H21.5V15L18 20L14 15L10 20L6.5 15V21H3Z" fill="white" />
                <circle cx="25" cy="6" r="2.5" fill="#FF934E" />
              </svg>
            </div>
            <div>
              <span className="font-black text-lg leading-none tracking-tight">
                <span className="text-white">Nova</span>
                <span className="text-orange-primary">Stack</span>
              </span>
              <div className="text-[8px] tracking-[0.25em] text-slate-text font-semibold uppercase leading-none mt-0.5">
                Africa
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                  pathname === link.href
                    ? "text-orange-primary border-b-2 border-orange-primary"
                    : "text-slate-text hover:text-white"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-primary group text-sm">
              Book a Call
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-text hover:text-white transition-colors">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-900/98 backdrop-blur-xl border-t border-slate-border/30">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-orange-primary border-l-2 border-orange-primary pl-3"
                    : "text-slate-text hover:text-white"
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center text-sm">
                Book a Consultation <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
