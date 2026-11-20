import React, { useRef } from 'react';
import { Flame, ChevronLeft, ChevronRight, Play, User, HelpCircle } from 'lucide-react';

export default function TrendingQuizzes({ onJoinGame }) {
  const scrollRef = useRef(null);

  const quizzes = [
    {
      title: 'AP Biology: Cell Division & Genetics',
      questions: 20,
      plays: '142.5K',
      creator: 'Dr. Evelyn Reed',
      avatar: 'ER',
      cover: 'from-purple-600 to-indigo-700',
      tag: 'Science'
    },
    {
      title: 'World History: Ancient Empires & Trade',
      questions: 15,
      plays: '98.2K',
      creator: 'Prof. Marcus Vance',
      avatar: 'MV',
      cover: 'from-amber-500 to-orange-600',
      tag: 'History'
    },
    {
      title: 'Algebra II: Quadratic Masterclass',
      questions: 12,
      plays: '210.8K',
      creator: 'Samantha Wu',
      avatar: 'SW',
      cover: 'from-brand-violet to-pink-600',
      tag: 'Mathematics'
    },
    {
      title: 'AP Human Geography: Urbanization',
      questions: 25,
      plays: '76.4K',
      creator: 'Liam O’Connor',
      avatar: 'LO',
      cover: 'from-emerald-600 to-teal-700',
      tag: 'Geography'
    },
    {
      title: 'Chemistry 101: Periodic Table Showdown',
      questions: 18,
      plays: '315.0K',
      creator: 'Dr. Aris Thorne',
      avatar: 'AT',
      cover: 'from-blue-600 to-cyan-600',
      tag: 'Science'
    },
    {
      title: 'English Lit: Shakespearean Tragedies',
      questions: 14,
      plays: '89.1K',
      creator: 'Clara Oswald',
      avatar: 'CO',
      cover: 'from-rose-600 to-purple-700',
      tag: 'Literature'
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="discover" className="py-24 bg-[#090216] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Scroll Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/25 border border-brand-violet/40 text-brand-lime text-sm font-semibold">
              <Flame className="w-4 h-4 text-brand-lime fill-brand-lime animate-pulse" />
              <span>Trending Quizzes</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Most popular in classrooms today
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-brand-violet hover:border-brand-violet transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-brand-violet hover:border-brand-violet transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Scroll Row */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {quizzes.map((quiz, idx) => (
            <div 
              key={idx}
              className="min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-start bg-brand-cardDark border border-brand-cardBorder rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-brand-violet/60 hover:shadow-[0_20px_40px_rgba(124,58,237,0.25)] transition-all"
            >
              {/* Colorful Cover Area */}
              <div className={`h-40 bg-gradient-to-br ${quiz.cover} p-6 relative flex flex-col justify-between overflow-hidden`}>
                <div className="absolute inset-0 bg-grain opacity-40" />
                
                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-black/30 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    {quiz.tag}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {quiz.questions} Qs
                  </span>
                </div>

                {/* Play Button on Hover overlay */}
                <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <button 
                    onClick={() => onJoinGame('849201')}
                    className="btn-tactile-lime flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform text-sm px-6 py-3"
                  >
                    <Play className="w-4 h-4 fill-brand-dark" />
                    Host or Play
                  </button>
                </div>

                {/* Bottom Stats on Cover */}
                <div className="relative z-10 text-white/90 text-xs font-semibold flex items-center gap-2">
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    ⚡ {quiz.plays} plays
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                <h3 className="font-heading font-extrabold text-xl text-white line-clamp-2 group-hover:text-brand-lime transition-colors">
                  {quiz.title}
                </h3>

                {/* Creator info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-violet/30 border border-brand-violet/50 flex items-center justify-center font-heading font-bold text-white text-xs">
                      {quiz.avatar}
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 font-medium">{quiz.creator}</p>
                      <p className="text-[10px] text-slate-500">Verified Creator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
