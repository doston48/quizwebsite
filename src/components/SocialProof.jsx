import React from 'react';
import { Award, Star, Globe2, Users2, Sparkles } from 'lucide-react';

export default function SocialProof() {
  const stats = [
    { value: '500K+', label: 'Active Teachers', icon: Users2, color: 'text-brand-lime' },
    { value: '50M+', label: 'Students Engaged', icon: Star, color: 'text-amber-400' },
    { value: '150+', label: 'Countries Worldwide', icon: Globe2, color: 'text-brand-violet' },
    { value: '99.9%', label: 'Teacher Satisfaction', icon: Award, color: 'text-emerald-400' },
  ];

  return (
    <section className="py-16 bg-[#090216] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-lime" />
            Trusted by top schools and districts worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 text-center hover:border-brand-violet/50 transition-all group hover:bg-white/[0.04]"
              >
                <div className={`w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
