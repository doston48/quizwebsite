import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Users, Trophy, Play, Gamepad2, Check, RotateCcw } from 'lucide-react';

export default function Hero({ onHostGame }) {
  // Steps: 'pin' | 'nickname' | 'avatar' | 'waiting'
  const [step, setStep] = useState('pin');
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const inputRefs = useRef([]);

  const blitzers = [
    { emoji: '🦊', name: 'Firefox Blitz', rarity: 'Common', color: 'from-orange-500/20 border-orange-500/50 text-orange-400' },
    { emoji: '⚡', name: 'Volt Rabbit', rarity: 'Common', color: 'from-amber-500/20 border-amber-500/50 text-amber-400' },
    { emoji: '👾', name: 'Pixel Alien', rarity: 'Common', color: 'from-purple-500/20 border-purple-500/50 text-purple-400' },
    { emoji: '🐉', name: 'Neon Dragon', rarity: 'Rare', color: 'from-blue-500/20 border-blue-500/50 text-blue-400' },
    { emoji: '🦖', name: 'Cyber Rex', rarity: 'Rare', color: 'from-emerald-500/20 border-emerald-500/50 text-emerald-400' },
    { emoji: '🦄', name: 'Stellar Unicorn', rarity: 'Rare', color: 'from-pink-500/20 border-pink-500/50 text-pink-400' },
    { emoji: '🤖', name: 'Quantum Bot', rarity: 'Epic', color: 'from-indigo-500/20 border-indigo-500/50 text-indigo-300' },
    { emoji: '🦁', name: 'Laser Lion', rarity: 'Epic', color: 'from-amber-600/20 border-amber-600/50 text-amber-300' },
    { emoji: '🦅', name: 'Plasma Eagle', rarity: 'Epic', color: 'from-cyan-500/20 border-cyan-500/50 text-cyan-300' },
    { emoji: '👑', name: 'Apex Monarch', rarity: 'Legendary', color: 'from-yellow-500/30 border-yellow-400 text-yellow-300 shadow-yellow-500/20' },
    { emoji: '🧙‍♂️', name: 'Wizard Byte', rarity: 'Legendary', color: 'from-violet-600/30 border-violet-400 text-violet-300' },
    { emoji: '🚀', name: 'Hyper Comet', rarity: 'Legendary', color: 'from-rose-500/30 border-rose-400 text-rose-300' },
  ];

  // Handle PIN input change
  const handlePinChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...pinDigits];
    newDigits[index] = digit;
    setPinDigits(newDigits);
    setError(false);

    // Auto-advance to next box
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 filled, auto validate
    if (newDigits.every(d => d !== '')) {
      validateAndProceed(newDigits.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateAndProceed = (fullPin) => {
    // Rule: Any PIN starting with 1 is valid; any other PIN shakes boxes and shows error
    if (fullPin.startsWith('1')) {
      setError(false);
      setStep('nickname');
    } else {
      setError(true);
      setErrorMessage("Hmm, we can't find that game");
      // Reset after shake
      setTimeout(() => {
        setPinDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 500);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const fullPin = pinDigits.join('');
    if (fullPin.length < 6) {
      setError(true);
      setErrorMessage("Please enter all 6 digits");
      return;
    }
    validateAndProceed(fullPin);
  };

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    setStep('avatar');
  };

  const handleAvatarSelect = (idx) => {
    setSelectedAvatar(idx);
  };

  const handleFinalJoin = () => {
    setStep('waiting');
  };

  const handleReset = () => {
    setStep('pin');
    setPinDigits(['', '', '', '', '', '']);
    setNickname('');
    setSelectedAvatar(0);
    setError(false);
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

          {/* Right Column: Interactive Join Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(124,58,237,0.3)] border-4 border-brand-violet/20 relative group">
              
              {/* Floating decorative badge */}
              <div className="absolute -top-4 -right-4 bg-brand-lime text-brand-dark font-heading font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg rotate-3 animate-bounce z-20">
                ⚡ LIVE JOIN
              </div>

              {/* STEP 1: GAME PIN (6 boxes) */}
              {step === 'pin' && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet mb-2">
                      <Gamepad2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
                      Join a Game
                    </h3>
                    <p className="text-slate-500 text-xs">
                      Enter the 6-digit Game PIN (Try starting with <span className="font-bold text-brand-violet">1</span>, e.g. 123456)
                    </p>
                  </div>

                  <form onSubmit={handlePinSubmit} className="space-y-6">
                    <div className={`flex justify-between gap-1.5 sm:gap-2 ${error ? 'animate-shake' : ''}`}>
                      {pinDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => inputRefs.current[idx] = el}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handlePinChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-11 h-14 sm:w-12 sm:h-16 text-center font-heading text-2xl font-extrabold rounded-2xl border-2 transition-all outline-none ${
                            error 
                              ? 'border-red-500 bg-red-50 text-red-600' 
                              : digit 
                                ? 'border-brand-violet bg-brand-violet/5 text-brand-violet' 
                                : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-brand-violet'
                          }`}
                        />
                      ))}
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs text-center font-bold animate-pulse">
                        {errorMessage}
                      </p>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold text-lg py-4 rounded-2xl shadow-tactile-violet transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Enter Game
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>

                  <div className="pt-4 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-xs">
                      Teacher?{' '}
                      <button onClick={onHostGame} className="text-brand-violet font-bold hover:underline">
                        Host a free session
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: NICKNAME */}
              {step === 'nickname' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-lime/20 flex items-center justify-center text-brand-lime mb-2">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
                      Pick a Nickname
                    </h3>
                    <p className="text-slate-500 text-xs">
                      What should your classmates call you in the arena?
                    </p>
                  </div>

                  <form onSubmit={handleNicknameSubmit} className="space-y-5">
                    <div>
                      <input 
                        type="text"
                        required
                        autoFocus
                        maxLength="15"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="e.g. NinjaScholar"
                        className="w-full bg-slate-100 border-2 border-slate-200 focus:border-brand-violet text-slate-900 font-heading text-xl font-bold text-center py-4 rounded-2xl outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold text-lg py-4 rounded-2xl shadow-tactile-violet transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Next: Choose Avatar
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: AVATAR PICKER (Blitzers) */}
              {step === 'avatar' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-center space-y-1">
                    <h3 className="font-heading text-xl font-extrabold text-slate-900 tracking-tight">
                      Choose Your Blitzer
                    </h3>
                    <p className="text-slate-500 text-xs">
                      Select your legendary emoji character
                    </p>
                  </div>

                  {/* 12 Grid of Blitzers */}
                  <div className="grid grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
                    {blitzers.map((blitzer, idx) => {
                      const isSelected = selectedAvatar === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAvatarSelect(idx)}
                          className={`relative p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-brand-violet/15 border-brand-violet shadow-[0_0_20px_rgba(124,58,237,0.4)] scale-105' 
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-3xl mb-1">{blitzer.emoji}</span>
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md border ${blitzer.color}`}>
                            {blitzer.rarity}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    type="button"
                    onClick={handleFinalJoin}
                    className="w-full bg-brand-lime text-brand-dark font-heading font-extrabold text-lg py-3.5 rounded-2xl shadow-tactile-lime transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Join Game! ({nickname})
                    <Check className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              )}

              {/* STEP 4: WAITING SCREEN */}
              {step === 'waiting' && (
                <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in duration-300">
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                    {/* Pulsing glow background */}
                    <div className="absolute inset-0 rounded-full bg-brand-violet/30 animate-ping opacity-75" />
                    
                    {/* Pulsing avatar */}
                    <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-violet to-brand-lime flex items-center justify-center text-5xl shadow-2xl animate-pulse-avatar border-4 border-white">
                      {blitzers[selectedAvatar].emoji}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-lime/20 text-brand-dark font-heading font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                      Lobby Connected
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
                      You're in, {nickname}! 🎉
                    </h3>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">
                      See your name and blitzer on the big screen? Waiting for the teacher to launch the match...
                    </p>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-violet transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try another PIN or start over
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
