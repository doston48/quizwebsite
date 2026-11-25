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
import GamePlay from './components/GamePlay';

export default function App() {
  // One clear gameState variable to control which screen is showing:
  // 'landing' | 'editor' | 'lobby' | 'playing'
  const [gameState, setGameState] = useState('landing');
  const [quizTitle, setQuizTitle] = useState('Biology 101: Cell Division Masterclass');
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'join', pin: '' });

  const handleHostClick = () => {
    setGameState('editor');
  };

  const handleHostLive = (title, questions) => {
    if (title) setQuizTitle(title);
    if (questions && questions.length > 0) setQuizQuestions(questions);
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
      <GamePlay 
        quizTitle={quizTitle}
        questions={quizQuestions}
        totalPlayers={8}
        onEndGame={() => setGameState('landing')}
      />
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
