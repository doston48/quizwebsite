import React from 'react';
import { Wand2, BarChart3, ShieldCheck, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TeacherSection({ onHostGame }) {
  const benefits = [
    {
      title: 'AI Quiz Generator',
      description: 'Paste any YouTube video link, PDF syllabus, or Wikipedia article and our AI creates a 20-question quiz in under 10 seconds.',
      icon: Wand2,
      color: 'text-brand-lime',
      bg: 'bg-brand-lime/10'
    },
    {
      title: 'Instant Diagnostic Reports',
      description: 'Identify knowledge gaps immediately with automated heatmaps and individual student analytics after every session.',
      icon: BarChart3,
      color: 'text-brand-violet',
      bg: 'bg-brand-violet/10'
    },
    {
      title: 'Safe & Moderated Classroom',
      description: 'Zero inappropriate usernames with auto-filtering, student login options, and secure guest access controls.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
    {
      title: 'Zero Prep Time',
      description: 'Explore over 100,000 teacher-verified quizzes aligned with Common Core, TEKS, and AP curriculums.',
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10'
    },
  ];

  return (
    <section id="teachers" className="py-24 bg-[#090216] relative overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-brand-violet/15 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-sm font-semibold">
              <Zap className="w-4 h-4" />
              <span>Built by Educators, For Educators</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Reclaim your evenings with lightning-fast quiz creation.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Say goodbye to hours of formatting trivia questions. BrainBlitz streamlines lesson reinforcement so you can focus on what matters most: your students.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                'Import existing Kahoot, Quizizz, or Blooket question sets in 1 click',
                'Engage even the quietest students with anonymous avatar modes',
                'Export detailed CSV reports straight to your gradebook'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-brand-lime shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button 
                onClick={onHostGame}
                className="btn-tactile-lime flex items-center gap-2 text-base"
              >
                Create Your First Quiz Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-cardDark border border-white/10 rounded-3xl p-6 hover:border-brand-violet/50 transition-all group hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
