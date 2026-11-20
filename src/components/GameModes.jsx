import React, { useState } from 'react';
import { Zap, Shield, Swords, Compass, Trophy, ArrowRight, Sparkles } from 'lucide-react';

export default function GameModes({ onHostGame }) {
  const [activeTab, setActiveTab] = useState(0);

  const modes = [
    {
      id: 'classic',
      name: 'Classic Blitz',
      tagline: 'Fast-paced live trivia with podium moments',
      description: 'The ultimate Kahoot-style live quiz experience. Questions pop up on the main screen while students race to answer on their own devices for maximum points and speed bonuses.',
      icon: Zap,
      color: 'from-purple-600 to-brand-violet',
      badgeColor: 'bg-brand-violet text-white',
      stats: 'Great for 5-15 min reviews',
      imageBg: 'bg-gradient-to-br from-purple-900/40 to-brand-violet/20'
    },
    {
      id: 'tower',
      name: 'Tower Defense',
      tagline: 'Strategy meets knowledge in an epic battle',
      description: 'Students answer trivia correctly to gather resources, build legendary towers, and defend their base against waves of whimsical monsters. Blooket-style engagement at its finest!',
      icon: Shield,
      color: 'from-brand-lime to-emerald-600',
      badgeColor: 'bg-brand-lime text-brand-dark font-extrabold',
      stats: 'Most popular with students',
      imageBg: 'bg-gradient-to-br from-lime-900/30 to-emerald-900/20'
    },
    {
      id: 'team',
      name: 'Team Battle Royale',
      tagline: 'Collaborative squads conquer the arena together',
      description: 'Divide the class into vibrant squads. Combine brainpower, coordinate power-ups, and climb the leaderboard as a unified force where every member contributes to victory.',
      icon: Swords,
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-500 text-white',
      stats: 'Fosters teamwork & communication',
      imageBg: 'bg-gradient-to-br from-blue-900/40 to-indigo-900/20'
    },
    {
      id: 'quest',
      name: 'Solo Quest Mode',
      tagline: 'Immersive storyline homework and self-paced play',
      description: 'Assign interactive story-driven quests for homework. Students explore magical worlds, unlock rare avatars, and master concepts at their own pace with adaptive AI hints.',
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-500 text-brand-dark font-extrabold',
      stats: 'Perfect for asynchronous homework',
      imageBg: 'bg-gradient-to-br from-amber-900/40 to-orange-900/20'
    },
  ];

  return (
    <section id="modes" className="py-24 bg-[#0F071E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Immersive Game Modes</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Choose your battlefield
          </h2>
          <p className="text-slate-300 text-lg">
            Switch between high-octane live showdowns and strategic solo quests instantly with the exact same quiz content.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {modes.map((mode, idx) => {
            const Icon = mode.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveTab(idx)}
                className={`p-5 rounded-3xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-brand-cardDark border-brand-violet shadow-[0_10px_30px_rgba(124,58,237,0.3)] scale-[1.02]' 
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-brand-violet text-white shadow-lg' : 'bg-white/5 text-slate-300'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${mode.badgeColor}`}>
                    {mode.id === 'tower' ? 'Viral' : mode.id === 'classic' ? 'Live' : 'New'}
                  </span>
                </div>
                <div>
                  <h3 className={`font-heading font-extrabold text-lg mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {mode.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {mode.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mode Spotlight Card */}
        <div className="bg-brand-cardDark border-2 border-brand-cardBorder rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-violet/20 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-lime text-xs font-bold">
                {modes[activeTab].stats}
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                {modes[activeTab].name}
              </h3>
              <p className="text-xl font-medium text-brand-lime">
                "{modes[activeTab].tagline}"
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                {modes[activeTab].description}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button 
                  onClick={onHostGame}
                  className="btn-tactile-violet flex items-center gap-2"
                >
                  Host {modes[activeTab].name}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`w-full h-72 sm:h-80 rounded-2xl ${modes[activeTab].imageBg} border border-white/10 flex items-center justify-center p-8 relative shadow-inner group`}>
                <div className="absolute inset-0 bg-grain opacity-50 rounded-2xl" />
                <div className="text-center relative z-10 space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-brand-lime shadow-2xl group-hover:scale-110 transition-transform">
                    {React.createElement(modes[activeTab].icon, { className: 'w-12 h-12' })}
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-white">
                    {modes[activeTab].name} Arena
                  </div>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Students join instantly with a 6-digit PIN on any phone, tablet, or laptop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
