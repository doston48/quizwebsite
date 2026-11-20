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

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'editor'
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'join', pin: '' });

  const handleHostClick = () => {
    // Switch to Create Quiz 3-panel editor workspace
    setView('editor');
  };

  const handleJoinClick = (pin = '') => {
    setModalState({ isOpen: true, mode: 'join', pin });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  if (view === 'editor') {
    return <CreateQuiz onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#0F071E] text-white flex flex-col font-sans">
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
