import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Users, QrCode, Sparkles, Volume2, Settings, ShieldCheck, Zap } from 'lucide-react';

const FAKE_PLAYERS_POOL = [
  { name: 'CosmicCoder', icon: '🚀', color: 'from-violet-600 to-indigo-600' },
  { name: 'PixelPanther', icon: '🐱', color: 'from-pink-600 to-rose-600' },
  { name: 'QuantumQuokka', icon: '⚡', color: 'from-amber-500 to-orange-600' },
  { name: 'NeonNinja', icon: '🥷', color: 'from-emerald-600 to-teal-600' },
  { name: 'CyberCheetah', icon: '🐆', color: 'from-blue-600 to-cyan-600' },
  { name: 'AstroAardvark', icon: '🌟', color: 'from-purple-600 to-violet-600' },
  { name: 'LaserLemur', icon: '🐒', color: 'from-lime-500 to-emerald-500' },
  { name: 'SuperSloth', icon: '🦥', color: 'from-indigo-600 to-blue-700' },
  { name: 'TurboTRex', icon: '🦖', color: 'from-red-600 to-rose-700' },
  { name: 'GalaxyGator', icon: '🐊', color: 'from-teal-600 to-emerald-700' },
  { name: 'PlasmaPanda', icon: '🐼', color: 'from-cyan-600 to-blue-600' },
  { name: 'VelocityViking', icon: '⚔️', color: 'from-rose-600 to-pink-700' },
  { name: 'MatrixMage', icon: '🧙‍♂️', color: 'from-fuchsia-600 to-purple-700' },
  { name: 'NovaPhoenix', icon: '🔥', color: 'from-orange-500 to-red-600' }
];

export default function Lobby({ quizTitle = 'Biology 101: Cell Division Masterclass', onBack, onStartGame }) {
  // Generate random 6-digit game PIN on mount
  const [gamePin] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  
  // Players state starting with 2 players
  const [players, setPlayers] = useState([
    { id: 1, name: 'CosmicCoder', icon: '🚀', color: 'from-violet-600 to-indigo-600' },
    { id: 2, name: 'PixelPanther', icon: '🐱', color: 'from-pink-600 to-rose-600' }
  ]);

  // Simulate new player joining every 1.5 seconds
  useEffect(() => {
    let index = 2;
    const interval = setInterval(() => {
      if (index < FAKE_PLAYERS_POOL.length) {
        const nextPlayer = {
          id: Date.now() + index,
          ...FAKE_PLAYERS_POOL[index]
        };
        setPlayers(prev => [...prev, nextPlayer]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const canStart = players.length >= 3;

  return (
    <div className="min-h-screen bg-[#0F071E] text-white flex flex-col font-sans relative overflow-hidden select-none">
      
      {/* Dark Gradient-Mesh Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-violet/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/10 bg-[#0F071E]/60 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </button>

        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-brand-lime font-extrabold">Host Game Lobby</span>
          <h2 className="font-heading font-extrabold text-lg text-white truncate max-w-md">{quizTitle}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Lobby</span>
          </div>
        </div>
      </header>

      {/* Main Lobby Content */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between">
        
        {/* Top Section: PIN & QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Center: Huge Game PIN */}
          <div className="lg:col-span-8 bg-gradient-to-br from-brand-cardDark/90 to-[#14082C]/90 border border-brand-cardBorder/80 rounded-3xl p-8 lg:p-10 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-violet/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-brand-lime" />
              <span>Join at play.brainblitz.com</span>
            </div>

            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Game PIN</p>
            
            {/* Huge PIN */}
            <div className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-widest text-brand-lime drop-shadow-[0_0_35px_rgba(163,230,53,0.4)] my-2">
              {gamePin.slice(0, 3)} {gamePin.slice(3)}
            </div>

            <p className="text-xs text-slate-400 mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping" />
              Waiting for players to join...
            </p>
          </div>

          {/* Right: QR Code Placeholder */}
          <div className="lg:col-span-4 bg-brand-cardDark/90 border border-brand-cardBorder rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center backdrop-blur-xl">
            <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-lg flex items-center justify-center relative group">
              {/* Simulated QR Code Pattern */}
              <div className="w-full h-full bg-slate-900 rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 border-2 border-white rounded-md bg-white/20 flex items-center justify-center text-[10px]">QR</div>
                  <div className="w-8 h-8 border-2 border-white rounded-md bg-white/20" />
                </div>
                <div className="self-center w-12 h-12 rounded-xl bg-brand-violet flex items-center justify-center shadow-md">
                  <Zap className="w-6 h-6 text-brand-lime fill-brand-lime" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-8 h-8 border-2 border-white rounded-md bg-white/20" />
                  <div className="w-6 h-6 bg-white rounded-sm" />
                </div>
              </div>
            </div>
            
            <p className="text-xs font-bold text-slate-300 mt-4 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-brand-lime" />
              Scan QR code with camera to join
            </p>
          </div>

        </div>

        {/* Middle Section: Player Counter & Grid */}
        <div className="my-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-lime">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">Joined Players</h3>
                <p className="text-xs text-slate-400">Ready to play when you are</p>
              </div>
            </div>

            {/* Player Counter Badge */}
            <div className="px-5 py-2.5 rounded-2xl bg-brand-cardDark border border-brand-cardBorder flex items-center gap-3 shadow-lg">
              <span className="w-3 h-3 rounded-full bg-brand-lime animate-pulse" />
              <span className="font-heading font-extrabold text-2xl text-white">{players.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Players</span>
            </div>
          </div>

          {/* Players Grid with Springy Bounce Animation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 min-h-[160px]">
            {players.map((p, idx) => (
              <div 
                key={p.id}
                className="animate-[bounce_0.6s_ease-in-out] bg-gradient-to-br from-brand-cardDark to-[#14082C] border border-brand-cardBorder/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 shadow-xl hover:scale-105 transition-transform group"
                style={{ animationDuration: '0.5s', animationIterationCount: 1 }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
                  {p.icon}
                </div>
                <span className="font-heading font-bold text-xs text-slate-200 truncate max-w-full text-center">
                  {p.name}
                </span>
                <span className="text-[10px] text-brand-lime font-bold bg-brand-lime/10 px-2 py-0.5 rounded-full">
                  Ready ✨
                </span>
              </div>
            ))}

            {/* Empty state slots indicator if needed */}
            {Array.from({ length: Math.max(0, 7 - players.length) }).map((_, i) => (
              <div 
                key={`empty-${i}`}
                className="border-2 border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 opacity-40"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Waiting...</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Start Button */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-bold text-white">Minimum required:</span> 3 players 
            {players.length < 3 && <span className="text-amber-400 font-bold">({3 - players.length} more needed)</span>}
          </div>

          <button
            onClick={onStartGame}
            disabled={!canStart}
            className={`px-8 py-4 rounded-2xl font-heading font-extrabold text-lg flex items-center gap-3 transition-all cursor-pointer ${
              canStart 
                ? 'bg-brand-lime text-brand-dark hover:bg-brand-limeHover shadow-[0_0_40px_rgba(163,230,53,0.5)] scale-105 animate-pulse' 
                : 'bg-white/10 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            <Play className={`w-6 h-6 ${canStart ? 'fill-brand-dark' : 'fill-slate-500'}`} />
            <span>{canStart ? `Start Game (${players.length} Players)` : 'Waiting for 3+ Players...'}</span>
          </button>
        </div>

      </main>
    </div>
  );
}
