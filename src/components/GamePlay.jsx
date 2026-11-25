import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Award, Check, X, Sparkles, Trophy, Users, ChevronRight } from 'lucide-react';

const DEFAULT_QUESTIONS = [
  {
    id: 101,
    type: 'Quiz',
    timeLimit: 20,
    points: 'Standard',
    question: 'Which planet in our solar system is known as the Red Planet?',
    answers: [
      { text: 'Mars', correct: true, color: 'bg-red-500', symbol: '▲', label: 'Red' },
      { text: 'Venus', correct: false, color: 'bg-blue-600', symbol: '◆', label: 'Blue' },
      { text: 'Jupiter', correct: false, color: 'bg-amber-500', symbol: '●', label: 'Yellow' },
      { text: 'Saturn', correct: false, color: 'bg-emerald-600', symbol: '■', label: 'Green' },
    ]
  },
  {
    id: 102,
    type: 'True/False',
    timeLimit: 15,
    points: 'Standard',
    question: 'Venus is the hottest planet in our solar system, even though Mercury is closer to the Sun.',
    answers: [
      { text: 'True', correct: true, color: 'bg-emerald-600', symbol: '▲', label: 'True' },
      { text: 'False', correct: false, color: 'bg-red-500', symbol: '◆', label: 'False' },
    ]
  },
  {
    id: 103,
    type: 'Quiz',
    timeLimit: 25,
    points: 'Double',
    question: 'What is the name of the supermassive black hole located at the center of our Milky Way galaxy?',
    answers: [
      { text: 'Sagittarius A*', correct: true, color: 'bg-red-500', symbol: '▲', label: 'Red' },
      { text: 'Andromeda X', correct: false, color: 'bg-blue-600', symbol: '◆', label: 'Blue' },
      { text: 'Event Horizon-1', correct: false, color: 'bg-amber-500', symbol: '●', label: 'Yellow' },
      { text: 'Centaurus B', correct: false, color: 'bg-emerald-600', symbol: '■', label: 'Green' },
    ]
  }
];

export default function GamePlay({ quizTitle = 'Deep Space Exploration', questions = DEFAULT_QUESTIONS, totalPlayers = 8, onEndGame }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = questions[currentIndex] || DEFAULT_QUESTIONS[0];

  const [timeLeft, setTimeLeft] = useState(currentQ.timeLimit);
  const [userAnswer, setUserAnswer] = useState(null); // index 0..3
  const [isRevealed, setIsRevealed] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [scores, setScores] = useState({ user: 0, streak: 0 });

  // Simulated answer distribution for results chart
  const [distribution, setDistribution] = useState([]);

  // Reset timer & state when question changes
  useEffect(() => {
    setTimeLeft(currentQ.timeLimit);
    setUserAnswer(null);
    setIsRevealed(false);
    setAnsweredCount(0);
    setDistribution([]);
  }, [currentIndex, currentQ]);

  // Countdown timer effect
  useEffect(() => {
    if (isRevealed) return;

    if (timeLeft <= 0) {
      handleReveal();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleReveal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRevealed]);

  // Simulate fake players answering progressively
  useEffect(() => {
    if (isRevealed) return;

    const interval = setInterval(() => {
      setAnsweredCount(prev => {
        if (prev < totalPlayers) {
          return prev + Math.floor(Math.random() * 2) + 1;
        }
        return totalPlayers;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isRevealed, totalPlayers]);

  // Auto-reveal if all players have answered
  useEffect(() => {
    if (!isRevealed && answeredCount >= totalPlayers) {
      handleReveal();
    }
  }, [answeredCount, totalPlayers, isRevealed]);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    // Generate random distribution for answers based on totalPlayers
    const numAnswers = currentQ.answers.length;
    const counts = Array(numAnswers).fill(0);
    let remaining = totalPlayers;

    // Give correct answer the majority
    const correctIdx = currentQ.answers.findIndex(a => a.correct);
    const correctVotes = Math.max(1, Math.floor(totalPlayers * 0.6));
    counts[correctIdx >= 0 ? correctIdx : 0] = correctVotes;
    remaining -= correctVotes;

    // Distribute remaining votes randomly
    for (let i = 0; i < remaining; i++) {
      const randIdx = Math.floor(Math.random() * numAnswers);
      counts[randIdx]++;
    }
    setDistribution(counts);

    // Update user score if correct
    if (userAnswer !== null && currentQ.answers[userAnswer]?.correct) {
      setScores(prev => ({
        user: prev.user + (currentQ.points === 'Double' ? 2000 : 1000),
        streak: prev.streak + 1
      }));
    } else if (userAnswer !== null) {
      setScores(prev => ({ ...prev, streak: 0 }));
    }
  };

  const handleSelectAnswer = (idx) => {
    if (isRevealed || userAnswer !== null) return;
    setUserAnswer(idx);
    setAnsweredCount(prev => Math.min(totalPlayers, prev + 1));
  };

  // Keyboard shortcuts 1-4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isRevealed || userAnswer !== null) return;
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= currentQ.answers.length) {
        handleSelectAnswer(keyNum - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed, userAnswer, currentQ]);

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz finished, return home or show leaderboard
      onEndGame();
    }
  };

  // SVG Circular Countdown calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / currentQ.timeLimit;
  const strokeDashoffset = circumference - progress * circumference;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="min-h-screen bg-[#0F071E] text-white flex flex-col font-sans select-none relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-brand-violet/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 px-8 py-4 flex items-center justify-between border-b border-white/10 bg-[#0F071E]/80 backdrop-blur-md">
        <button 
          onClick={onEndGame}
          className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        {/* Question Counter & Quiz Title */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-brand-lime font-extrabold">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <h2 className="font-heading font-extrabold text-sm text-slate-300 truncate max-w-sm">{quizTitle}</h2>
        </div>

        {/* Circular SVG Countdown Ring & Score */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-brand-cardDark border border-brand-cardBorder">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-heading font-extrabold text-white text-sm">{scores.user} pts</span>
          </div>

          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="5"
                className="text-white/10 fill-none"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={`fill-none transition-all duration-1000 ${isUrgent ? 'text-red-500' : 'text-brand-lime'}`}
              />
            </svg>
            <div className={`absolute font-heading font-black text-base ${isUrgent ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}
            </div>
          </div>
        </div>
      </header>

      {/* Main Gameplay Area */}
      <main className="relative z-10 flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between">
        
        {/* Question Box (Big text at the top) */}
        <div className="bg-gradient-to-br from-brand-cardDark/95 to-[#14082C]/95 border border-brand-cardBorder/90 rounded-3xl p-8 lg:p-10 shadow-2xl text-center relative backdrop-blur-xl">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-xs font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {currentQ.points === 'Double' ? '2x Double Points' : 'Standard Points'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold">
              {currentQ.type}
            </span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white mt-4 leading-tight max-w-4xl mx-auto">
            {currentQ.question}
          </h1>
        </div>

        {/* 4 Big Answer Tiles (Grid) or Results Bar Chart */}
        <div className="my-8">
          {!isRevealed ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {currentQ.answers.map((ans, idx) => {
                const isSelected = userAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`${ans.color} rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-2xl transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
                      isSelected ? 'ring-4 ring-white scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.6)]' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-black/20 flex items-center justify-center font-heading font-black text-xl text-white shadow-inner">
                      {ans.symbol}
                    </div>

                    <div className="flex-grow px-12 text-left">
                      <span className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide">
                        {ans.text}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold text-white/80">
                      {idx + 1}
                    </div>

                    {isSelected && (
                      <div className="absolute inset-0 bg-white/10 pointer-events-none flex items-center justify-end pr-6">
                        <div className="w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center shadow-lg font-bold">
                          ✓
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Results & Bar Chart View */
            <div className="bg-brand-cardDark/90 border border-brand-cardBorder rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                    userAnswer !== null && currentQ.answers[userAnswer]?.correct ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {userAnswer !== null && currentQ.answers[userAnswer]?.correct ? '🎉' : '❌'}
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-white">
                      {userAnswer !== null && currentQ.answers[userAnswer]?.correct ? 'Correct! Well done.' : userAnswer === null ? 'Time Out! No answer selected.' : 'Incorrect! Better luck next time.'}
                    </h3>
                    <p className="text-xs text-slate-400">Answer results and distribution</p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="btn-tactile-lime py-3 px-6 text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Final Results'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bar Chart Distribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {currentQ.answers.map((ans, idx) => {
                  const count = distribution[idx] || 0;
                  const percentage = totalPlayers > 0 ? Math.round((count / totalPlayers) * 100) : 0;
                  const isCorrect = ans.correct;

                  return (
                    <div 
                      key={idx}
                      className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                        isCorrect 
                          ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.2)]' 
                          : 'bg-white/[0.02] border-white/10 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-xl ${ans.color} flex items-center justify-center font-bold text-sm text-white`}>
                            {ans.symbol}
                          </span>
                          <span className="font-heading font-bold text-sm text-white truncate max-w-[120px]">
                            {ans.text}
                          </span>
                        </div>
                        {isCorrect && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                            Correct ✓
                          </span>
                        )}
                      </div>

                      {/* Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>{count} players</span>
                          <span className="font-bold text-white">{percentage}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isCorrect ? 'bg-emerald-500' : 'bg-brand-violet'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-lime" />
            <span>Answers submitted: <strong className="text-white">{answeredCount}</strong> / {totalPlayers} players</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Shortcut keys: Press <strong className="text-brand-lime">1</strong>–<strong className="text-brand-lime">4</strong> to answer</span>
            {!isRevealed && (
              <button
                onClick={handleReveal}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition-colors cursor-pointer"
              >
                Skip Timer & Reveal
              </button>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
