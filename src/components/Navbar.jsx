import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Sparkles, Play } from 'lucide-react';

export default function Navbar({ onHostClick, onJoinClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0F071E]/80 backdrop-blur-xl border-b border-brand-cardBorder/60 shadow-2xl py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-violet to-brand-lime flex items-center justify-center shadow-lg shadow-brand-violet/30 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-brand-dark fill-brand-lime" />
          </div>
          <span className="font-heading text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
            Brain<span className="text-brand-lime">Blitz</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 bg-white/[0.03] border border-white/10 px-8 py-2.5 rounded-full backdrop-blur-md">
          <a href="#discover" className="text-sm font-medium text-slate-300 hover:text-brand-lime transition-colors">Discover</a>
          <a href="#modes" className="text-sm font-medium text-slate-300 hover:text-brand-lime transition-colors flex items-center gap-1">
            Game Modes <span className="bg-brand-violet/40 text-brand-lime text-[10px] px-1.5 py-0.5 rounded-full font-bold">HOT</span>
          </a>
          <a href="#teachers" className="text-sm font-medium text-slate-300 hover:text-brand-lime transition-colors">For Teachers</a>
          <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-brand-lime transition-colors">Pricing</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onJoinClick}
            className="text-sm font-heading font-bold text-slate-200 hover:text-white px-4 py-2 transition-colors"
          >
            Join Game
          </button>
          <button 
            onClick={onHostClick}
            className="btn-tactile-violet flex items-center gap-2 text-sm py-2.5 px-5 shadow-tactile-violet"
          >
            <Play className="w-4 h-4 fill-white" />
            Host a game
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0F071E]/95 backdrop-blur-2xl border-b border-brand-cardBorder p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <a 
            href="#discover" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            Discover
          </a>
          <a 
            href="#modes" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5 flex items-center justify-between"
          >
            Game Modes
            <span className="bg-brand-violet/40 text-brand-lime text-xs px-2 py-0.5 rounded-full font-bold">HOT</span>
          </a>
          <a 
            href="#teachers" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            For Teachers
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            Pricing
          </a>
          <div className="flex flex-col gap-3 pt-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onJoinClick(); }}
              className="w-full py-3 rounded-xl bg-white/10 text-white font-heading font-bold text-center"
            >
              Join Game
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onHostClick(); }}
              className="w-full btn-tactile-violet text-center py-3 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Host a game
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
