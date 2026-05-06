import React from 'react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full bg-[#f5ece7]/60 border-t border-primary/5 text-primary py-20 relative overflow-hidden">
      <div className="container mx-auto max-w-(--container-max) px-gutter relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity block mb-6"
            >
              Rooted
            </Link>
            <p className="font-sans text-sm leading-relaxed text-primary/70 max-w-xs">
              Curating high-end botanical companions and modern plant-care objects for a mindful home. Sourced sustainably, packaged eco-consciously.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-primary/40">Shop</h4>
            <ul className="space-y-4 font-sans text-xs font-medium text-primary/70">
              <li><Link href="/products" className="hover:text-secondary transition-colors">All Plants</Link></li>
              <li><Link href="/products?category=rare" className="hover:text-secondary transition-colors">Rare Botanicals</Link></li>
              <li><Link href="/products?category=easy-care" className="hover:text-secondary transition-colors">Easy Care</Link></li>
              <li><Link href="/products?category=pet-friendly" className="hover:text-secondary transition-colors">Pet-Friendly</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-primary/40">Resources</h4>
            <ul className="space-y-4 font-sans text-xs font-medium text-primary/70">
              <li><Link href="#" className="hover:text-secondary transition-colors">Plant Care 101</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Light Guide</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Watering Indicators</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Our Sustainability Promise</Link></li>
            </ul>
          </div>

          {/* Boutique Visit Column */}
          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-primary/40">Boutique</h4>
            <ul className="space-y-4 font-sans text-xs font-medium text-primary/70">
              <li className="leading-relaxed">
                <span className="block font-bold text-primary mb-1">Rooted Soho</span>
                120 Green Street, Berlin, BE
              </li>
              <li className="leading-relaxed">
                <span className="block font-bold text-primary mb-1">Hours</span>
                Mon — Sun : 10:00 AM — 7:00 PM
              </li>
              <li>
                <a href="mailto:hello@rootedboutique.com" className="hover:text-secondary transition-colors block">
                  hello@rootedboutique.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary/40 text-center md:text-left">
              © {new Date().getFullYear()} Rooted Boutique. All rights reserved.
            </p>
            <span className="hidden md:inline text-primary/20 text-[10px] font-sans">|</span>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary/40 text-center md:text-left">
              Designed & Engineered by{' '}
              <a 
                href="https://eren.works" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-secondary transition-colors underline underline-offset-4 decoration-primary/20 hover:decoration-secondary font-bold"
              >
                Can Eren
              </a>
            </p>
          </div>
          <div className="flex gap-8 font-sans text-[10px] uppercase tracking-[0.2em] text-primary/50">
            <Link href="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Subtle organic design element */}
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/2 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  )
}
