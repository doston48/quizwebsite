import React from 'react';
import { Zap, Heart, Video, Camera, Code, Globe, MessageSquare, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090216] border-t border-white/10 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-violet to-brand-lime flex items-center justify-center shadow-lg shadow-brand-violet/30">
                <Zap className="w-6 h-6 text-brand-dark fill-brand-lime" />
              </div>
              <span className="font-heading text-2xl font-extrabold text-white">
                Brain<span className="text-brand-lime">Blitz</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              The premier gamified live quiz platform designed for 2026 classrooms. Host live trivia, tower defense battles, and solo quests that students love.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Globe">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Video">
                <Video className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Camera">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Code">
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#modes" className="hover:text-white transition-colors">Classic Blitz</a></li>
              <li><a href="#modes" className="hover:text-white transition-colors">Tower Defense</a></li>
              <li><a href="#modes" className="hover:text-white transition-colors">Team Battle</a></li>
              <li><a href="#modes" className="hover:text-white transition-colors">Solo Quests</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Quiz Maker</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">For Teachers</h4>
            <ul className="space-y-2.5">
              <li><a href="#teachers" className="hover:text-white transition-colors">Teacher Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Common Core Quizzes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety & COPPA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">District Licensing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars & Training</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">About BrainBlitz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers <span className="bg-brand-violet/40 text-brand-lime text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">We're Hiring</span></a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 BrainBlitz Inc. All rights reserved. Made with <Heart className="w-3.5 h-3.5 text-brand-lime inline mx-1 fill-brand-lime" /> for classrooms worldwide.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
