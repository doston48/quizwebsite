import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "BrainBlitz completely transformed my 8th-grade science classes. The Tower Defense mode has even the most reluctant students begging to stay after school to review vocabulary!",
      author: "Sarah Jenkins",
      role: "Middle School Science Teacher",
      school: "Austin Independent School District",
      rating: 5,
      avatar: "SJ"
    },
    {
      quote: "The AI quiz generator is an absolute game-changer. I pasted our history textbook chapter PDF and had an engaging 25-question live battle royale ready in 15 seconds.",
      author: "Marcus Vance",
      role: "High School AP History Teacher",
      school: "Seattle Public Schools",
      rating: 5,
      avatar: "MV"
    },
    {
      quote: "As an instructional technology coach, I've seen every gamification tool out there. BrainBlitz is faster, smoother, and students love the tactile 3D rewards.",
      author: "Elena Rostova",
      role: "District EdTech Specialist",
      school: "Boston Public Schools",
      rating: 5,
      avatar: "ER"
    },
  ];

  return (
    <section className="py-24 bg-[#0F071E] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-lime/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Loved by Educators</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hear from teachers crushing it in class
          </h2>
          <p className="text-slate-300 text-lg">
            Join thousands of educators who have turned their classrooms into legendary arenas of knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-brand-cardDark border border-brand-cardBorder rounded-3xl p-8 flex flex-col justify-between relative shadow-xl hover:border-brand-violet/60 transition-all group"
            >
              <div className="absolute top-6 right-6 text-brand-violet/30 group-hover:text-brand-violet/60 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-base leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-violet to-brand-lime flex items-center justify-center font-heading font-extrabold text-brand-dark text-lg shadow-md">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-white text-base">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-brand-lime font-medium">
                    {rev.role}
                  </p>
                  <p className="text-xs text-slate-400">
                    {rev.school}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
