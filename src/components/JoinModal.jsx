import React, { useState } from 'react';
import { X, Gamepad2, Play, Sparkles, CheckCircle2 } from 'lucide-react';

export default function JoinModal({ isOpen, mode, initialPin = '', onClose }) {
  const [nickname, setNickname] = useState('');
  const [joined, setJoined] = useState(false);

  if (!isOpen) return null;

  const handleAction = (e) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-brand-cardDark border-2 border-brand-cardBorder rounded-3xl p-8 max-w-md w-full relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!joined ? (
          <>
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-violet/20 flex items-center justify-center text-brand-lime mb-2">
                {mode === 'host' ? <Play className="w-7 h-7 fill-brand-lime" /> : <Gamepad2 className="w-7 h-7 text-brand-violet" />}
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-white">
                {mode === 'host' ? 'Host a BrainBlitz Session' : `Joining Game PIN: ${initialPin || '482910'}`}
              </h3>
              <p className="text-slate-400 text-sm">
                {mode === 'host' ? 'Select a quiz set and game mode to launch your live classroom arena.' : 'Enter your player nickname to enter the waiting lobby.'}
              </p>
            </div>

            <form onSubmit={handleAction} className="space-y-4">
              {mode === 'join' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Your Nickname</label>
                  <input 
                    type="text" 
                    required
                    maxLength="15"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. NinjaScholar99"
                    className="w-full bg-slate-900 border border-white/10 text-white font-heading font-bold px-4 py-3.5 rounded-2xl outline-none focus:border-brand-violet"
                  />
                </div>
              )}

              {mode === 'host' && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Quiz Topic</label>
                  <select className="w-full bg-slate-900 border border-white/10 text-white font-heading font-bold px-4 py-3.5 rounded-2xl outline-none focus:border-brand-violet">
                    <option>🧬 AP Biology: Cell Division & Genetics (20 Qs)</option>
                    <option>⚡ World History: Ancient Empires & Trade (15 Qs)</option>
                    <option>📐 Algebra II: Quadratic Functions Masterclass (12 Qs)</option>
                    <option>🌍 AP Human Geography: Urbanization (20 Qs)</option>
                  </select>
                </div>
              )}

              <button 
                type="submit"
                className="w-full btn-tactile-violet py-4 text-center text-base flex items-center justify-center gap-2 mt-4"
              >
                {mode === 'host' ? 'Launch Live Arena' : 'Join Lobby'}
                <Sparkles className="w-5 h-5 text-brand-lime" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-2xl font-extrabold text-white">
              {mode === 'host' ? 'Lobby Created Successfully!' : `Welcome, ${nickname}!`}
            </h3>
            <p className="text-slate-300 text-sm">
              {mode === 'host' 
                ? 'Your game PIN is #849 201. Waiting for students to connect...' 
                : 'You are securely connected to the BrainBlitz arena. Waiting for host to start the game!'}
            </p>
            <div className="pt-4">
              <button 
                onClick={onClose}
                className="btn-tactile-lime px-8 py-3 text-sm"
              >
                Close Simulator
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
