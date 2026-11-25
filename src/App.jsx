import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import TrendingQuizzes from './components/TrendingQuizzes';
import GameModes from './components/GameModes';
import HowItWorks from './components/HowItWorks';
import TeacherSection from './components/TeacherSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import JoinModal from './components/JoinModal';
import CreateQuiz from './components/CreateQuiz';
import Lobby from './components/Lobby';
import { Sparkles } from 'lucide-react';

export default function App() {
  // One clear gameState variable to control which screen is showing:
  // 'landing' | 'editor' | 'lobby' | 'playing'
  const [gameState, setGameState] = useState('landing');
  const [quizTitle, setQuizTitle] = useState('Biology 101: Cell Division Masterclass');
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'join', pin: '' });

  const handleHostClick = () => {
    setGameState('editor');
  };

  const handleHostLive = (title) => {
    if (title) setQuizTitle(title);
    setGameState('lobby');
  };

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleJoinClick = (pin = '') => {
    setModalState({ isOpen: true, mode: 'join', pin });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Screen routing based on gameState
  if (gameState === 'editor') {
    return (
      <CreateQuiz 
        onBack={() => setGameState('landing')} 
        onHostLive={handleHostLive}
      />
    );
  }

  if (gameState === 'lobby') {
    return (
      <Lobby 
        quizTitle={quizTitle}
        onBack={() => setGameState('editor')} 
        onStartGame={handleStartGame}
      />
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-[#0F071E] text-white flex flex-col items-center justify-center p-8 text-center font-sans select-none relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-violet/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-violet border border-brand-violet/50 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(124,58,237,0.5)] animate-bounce">
            <Sparkles className="w-10 h-10 text-brand-lime fill-brand-lime" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-lime font-extrabold">Live Quiz Session</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white">{quizTitle}</h1>
            <p className="text-slate-400 text-sm">Game is officially active! Players are answering questions live on their devices.</p>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => setGameState('landing')}
              className="btn-tactile-violet py-4 px-8 text-base font-bold shadow-2xl cursor-pointer"
            >
              End Game & Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F071E] text-white flex flex-col font-sans select-none">
      {/* Sticky Frosted Glass Navbar */}
      <Navbar 
        onHostClick={handleHostClick} 
        onJoinClick={() => handleJoinClick()} 
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero 
          onJoinGame={(pin) => handleJoinClick(pin)} 
          onHostGame={handleHostClick} 
        />
        <SocialProof />
        <TrendingQuizzes onJoinGame={(pin) => handleJoinClick(pin)} />
        <GameModes onHostGame={handleHostClick} />
        <HowItWorks 
          onHostGame={handleHostClick} 
          onJoinGame={(pin) => handleJoinClick(pin)} 
        />
        <TeacherSection onHostGame={handleHostClick} />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modal */}
      <JoinModal 
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialPin={modalState.pin}
        onClose={handleCloseModal}
      />
    </div>
  );
}
