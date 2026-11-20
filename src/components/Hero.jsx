import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Users, Trophy, Play, Gamepad2 } from 'lucide-react';

export default function Hero({ onJoinGame, onHostGame }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!pin || pin.length < 4) {
      setError(true);
      return;
    }
    setError(false);
    onJoinGame(pin);
  };

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center bg-[#0F071E] bg-grain overflow-hidden">
      {/* Gradient Mesh & Glowing Blobs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-brand-violet/30 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-brand-lime/15 blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none animate-float-delayed" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Next-Gen Classroom Gamification • 2026 Edition</span>
            </div>

            {/* Huge Confident Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              Make learning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-purple-400 to-brand-lime drop-shadow-[0_0_35px_rgba(124,58,237,0.5)]">
                a game.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Ignite classroom engagement with live trivia, immersive quests, and lightning-fast quizzes. Join over 500,000 teachers turning lessons into legendary victories.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={onHostGame}
                className="btn-tactile-lime w-full sm:w-auto text-base flex items-center justify-center gap-3 px-8 py-4 shadow-tactile-lime"
              >
                <Play className="w-5 h-5 fill-brand-dark" />
                Host a Free Game
              </button>
              <a 
                href="#modes"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-heading font-bold px-8 py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <Gamepad2 className="w-5 h-5 text-brand-violet" />
                Explore Modes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust metrics */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-lime" />
                <span>COPPA & FERPA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-violet" />
                <span>50M+ Students Engaged</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>#1 Gamified Learning Tool</span>
              </div>
            </div>

          </div>

          {/* Right Column: White Card with Game PIN Input */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_25px_60px_-15px_rgba(124,58,237,0.3)] border-4 border-brand-violet/20 relative group">
              
              {/* Floating decorative badge */}
              <div className="absolute -top-4 -right-4 bg-brand-lime text-brand-dark font-heading font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg rotate-3 animate-bounce">
                ⚡ INSTANT JOIN
              </div>

              <div className="text-center space-y-3 mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet mb-2 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                  Join a Game
                </h3>
                <p className="text-slate-600 text-sm">
                  Enter the 6-digit Game PIN provided by your teacher or host.
                </p>
              </div>

              <form onSubmit={handleJoinSubmit} className="space-y-5">
                <div>
                  <input 
                    type="text" 
                    maxLength="6"
                    value={pin}
                    onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError(false); }}
                    placeholder="e.g. 482 910"
                    className={`w-full bg-slate-100 border-2 ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-brand-violet'} text-slate-900 font-heading text-3xl font-extrabold tracking-widest text-center py-4 rounded-2xl outline-none transition-all placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-normal`}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2 text-center font-medium animate-shake">
                      Please enter a valid Game PIN
                    </p>
                  )}
                </div>

                {/* Tactile 3D Enter Button */}
                <button 
                  type="submit"
                  className="w-full bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold text-lg py-4 rounded-2xl shadow-tactile-violet transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  Enter Game
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-xs">
                  Are you an educator?{' '}
                  <button 
                    onClick={onHostGame}
                    className="text-brand-violet font-bold hover:underline"
                  >
                    Host a quiz for free
                  </button>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
