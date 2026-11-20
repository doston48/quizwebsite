import React from 'react';
import { Play, LogIn, Trophy, Sparkles, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onHostGame, onJoinGame }) {
  const steps = [
    {
      number: '01',
      title: 'Host a Game',
      description: 'Choose from 100,000+ teacher quizzes or generate a custom AI quiz in seconds. Pick your battle mode (Classic or Tower Defense).',
      icon: Play,
      color: 'bg-brand-violet text-white',
      badge: 'For Teachers'
    },
    {
      number: '02',
      title: 'Students Join',
      description: 'Project the 6-digit Game PIN on your classroom board. Students instantly join from any phone, tablet, or laptop with zero sign-up required.',
      icon: LogIn,
      color: 'bg-brand-lime text-brand-dark font-extrabold',
      badge: 'Instant Access'
    },
    {
      number: '03',
      title: 'Play & Win',
      description: 'Experience high-octane trivia battles, climb the live podium, and review instant diagnostic heatmaps after class.',
      icon: Trophy,
      color: 'bg-amber-500 text-brand-dark font-extrabold',
      badge: 'Engaged Learning'
    },
  ];

  return (
    <section className="py-24 bg-[#0F071E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How BrainBlitz Works
          </h2>
          <p className="text-slate-300 text-lg">
            From zero prep to full classroom engagement in under 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-brand-cardDark border-2 border-brand-cardBorder rounded-3xl p-8 relative flex flex-col justify-between group hover:border-brand-violet transition-all shadow-xl"
              >
                {/* Step number badge */}
                <div className="absolute -top-5 left-8 bg-brand-violet text-white font-heading font-extrabold text-sm px-4 py-1.5 rounded-2xl shadow-lg border border-white/10">
                  STEP {step.number}
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-lime">
                  <span>Zero setup required</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-violet/30 via-purple-900/40 to-brand-lime/20 border border-brand-violet/40 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-40" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to ignite your classroom?
            </h3>
            <p className="text-slate-200 text-base">
              Join hundreds of thousands of educators making learning unforgettable today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button 
                onClick={onHostGame}
                className="btn-tactile-lime w-full sm:w-auto px-8 py-4 text-base"
              >
                Host Your First Game
              </button>
              <button 
                onClick={() => onJoinGame('482910')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-heading font-bold px-8 py-4 rounded-2xl border border-white/20 transition-all"
              >
                Join with Game PIN
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
