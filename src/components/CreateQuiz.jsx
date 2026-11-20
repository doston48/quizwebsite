import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Copy, Image, Clock, Award, Check, Settings, Sparkles, Play, Save, AlertCircle } from 'lucide-react';

export default function CreateQuiz({ onBack }) {
  const [quizTitle, setQuizTitle] = useState('Biology 101: Cell Division Masterclass');
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'Quiz',
      timeLimit: 20,
      points: 'Standard',
      question: 'Which phase of mitosis do sister chromatids separate?',
      image: null,
      answers: [
        { text: 'Anaphase', correct: true, color: 'bg-red-500', symbol: '▲', label: 'Red' },
        { text: 'Prophase', correct: false, color: 'bg-blue-600', symbol: '◆', label: 'Blue' },
        { text: 'Metaphase', correct: false, color: 'bg-amber-500', symbol: '●', label: 'Yellow' },
        { text: 'Telophase', correct: false, color: 'bg-emerald-600', symbol: '■', label: 'Green' },
      ]
    },
    {
      id: 2,
      type: 'Quiz',
      timeLimit: 30,
      points: 'Double',
      question: 'What is the powerhouse of the cell?',
      image: null,
      answers: [
        { text: 'Nucleus', correct: false, color: 'bg-red-500', symbol: '▲', label: 'Red' },
        { text: 'Mitochondria', correct: true, color: 'bg-blue-600', symbol: '◆', label: 'Blue' },
        { text: 'Ribosome', correct: false, color: 'bg-amber-500', symbol: '●', label: 'Yellow' },
        { text: 'Golgi apparatus', correct: false, color: 'bg-emerald-600', symbol: '■', label: 'Green' },
      ]
    },
    {
      id: 3,
      type: 'True/False',
      timeLimit: 15,
      points: 'Standard',
      question: 'Plant cells contain both a cell wall and a cell membrane.',
      image: null,
      answers: [
        { text: 'True', correct: true, color: 'bg-emerald-600', symbol: '▲', label: 'True' },
        { text: 'False', correct: false, color: 'bg-red-500', symbol: '◆', label: 'False' },
      ]
    }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentQ = questions[activeIndex];

  // Validation checker for a question
  const getQuestionError = (q) => {
    if (!q.question || !q.question.trim()) return "Question text is required";
    const nonEmpAnswers = q.answers.filter(a => a.text && a.text.trim() !== '');
    if (nonEmpAnswers.length < 2) return "At least 2 filled answer choices required";
    if (q.type !== 'Poll') {
      const hasCorrect = q.answers.some(a => a.correct && a.text && a.text.trim() !== '');
      if (!hasCorrect) return "Select at least one correct answer";
    }
    return null;
  };

  const handleQuestionChange = (field, value) => {
    const updated = [...questions];
    if (field === 'type') {
      // If changing type to True/False, adjust answers to 2
      if (value === 'True/False') {
        updated[activeIndex].answers = [
          { text: 'True', correct: true, color: 'bg-emerald-600', symbol: '▲', label: 'True' },
          { text: 'False', correct: false, color: 'bg-red-500', symbol: '◆', label: 'False' },
        ];
      } else if (currentQ.type === 'True/False' && (value === 'Quiz' || value === 'Poll')) {
        // Reset to 4 answers
        updated[activeIndex].answers = [
          { text: '', correct: true, color: 'bg-red-500', symbol: '▲', label: 'Red' },
          { text: '', correct: false, color: 'bg-blue-600', symbol: '◆', label: 'Blue' },
          { text: '', correct: false, color: 'bg-amber-500', symbol: '●', label: 'Yellow' },
          { text: '', correct: false, color: 'bg-emerald-600', symbol: '■', label: 'Green' },
        ];
      }
    }
    updated[activeIndex][field] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (ansIdx, field, value) => {
    const updated = [...questions];
    if (field === 'correct') {
      if (updated[activeIndex].type === 'True/False') {
        // For True/False, only one can be correct
        updated[activeIndex].answers.forEach((a, i) => {
          a.correct = (i === ansIdx);
        });
      } else {
        updated[activeIndex].answers[ansIdx].correct = value;
      }
    } else {
      updated[activeIndex].answers[ansIdx].text = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    const newQ = {
      id: Date.now(),
      type: 'Quiz',
      timeLimit: 20,
      points: 'Standard',
      question: '',
      image: null,
      answers: [
        { text: '', correct: true, color: 'bg-red-500', symbol: '▲', label: 'Red' },
        { text: '', correct: false, color: 'bg-blue-600', symbol: '◆', label: 'Blue' },
        { text: '', correct: false, color: 'bg-amber-500', symbol: '●', label: 'Yellow' },
        { text: '', correct: false, color: 'bg-emerald-600', symbol: '■', label: 'Green' },
      ]
    };
    setQuestions([...questions, newQ]);
    setActiveIndex(questions.length);
  };

  const duplicateQuestion = (idx, e) => {
    e.stopPropagation();
    const target = questions[idx];
    const cloned = {
      ...target,
      id: Date.now(),
      question: `${target.question} (Copy)`,
      answers: target.answers.map(a => ({ ...a }))
    };
    const updated = [...questions];
    updated.splice(idx + 1, 0, cloned);
    setQuestions(updated);
    setActiveIndex(idx + 1);
  };

  const deleteQuestion = (idx, e) => {
    e.stopPropagation();
    if (questions.length === 1) return;
    const updated = questions.filter((_, i) => i !== idx);
    setQuestions(updated);
    if (activeIndex >= updated.length) {
      setActiveIndex(updated.length - 1);
    }
  };

  const currentError = getQuestionError(currentQ);

  return (
    <div className="min-h-screen bg-[#0F071E] text-white flex flex-col font-sans select-none">
      
      {/* Top Header Bar */}
      <header className="bg-brand-cardDark border-b border-brand-cardBorder px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="bg-brand-violet/20 text-brand-lime text-xs font-extrabold px-3 py-1 rounded-full border border-brand-violet/40">
              Quiz Editor
            </span>
            <input 
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="bg-transparent font-heading font-extrabold text-lg sm:text-xl text-white outline-none border-b border-transparent focus:border-brand-violet transition-colors max-w-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white/10 hover:bg-white/15 text-white font-heading font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all cursor-pointer">
            <Save className="w-4 h-4 text-brand-lime" />
            Save Draft
          </button>
          <button className="btn-tactile-lime py-2.5 px-5 text-sm flex items-center gap-2">
            <Play className="w-4 h-4 fill-brand-dark" />
            Host Live
          </button>
        </div>
      </header>

      {/* 3-Panel Main Workspace */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-74px)]">
        
        {/* LEFT PANEL: Questions List (~280px / 3 cols) */}
        <aside className="lg:col-span-3 bg-[#090216] border-r border-brand-cardBorder p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Questions ({questions.length})
              </span>
              <span className="text-[10px] text-brand-lime font-bold">Auto-saved</span>
            </div>

            {/* Thumbnails list */}
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const isActive = activeIndex === idx;
                const err = getQuestionError(q);
                return (
                  <div 
                    key={q.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      isActive 
                        ? 'bg-brand-violet/20 border-brand-violet shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] border-transparent'
                    }`}
                  >
                    {/* Small Red Dot for validation errors */}
                    {err && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#090216] animate-pulse" title={err} />
                    )}

                    {/* Number / Handle */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-xs shrink-0 ${
                      isActive ? 'bg-brand-violet text-white' : 'bg-white/10 text-slate-300'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate mb-1">
                        {q.question || `Question ${idx + 1}`}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="bg-white/5 px-2 py-0.5 rounded-md">{q.type}</span>
                        <span>⏱ {q.timeLimit}s</span>
                      </div>
                    </div>

                    {/* Action buttons on hover */}
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                      <button 
                        onClick={(e) => duplicateQuestion(idx, e)}
                        className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                        title="Duplicate question"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {questions.length > 1 && (
                        <button 
                          onClick={(e) => deleteQuestion(idx, e)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                          title="Delete question"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Question Button */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <button 
              onClick={addQuestion}
              className="w-full btn-tactile-violet py-3.5 flex items-center justify-center gap-2 text-sm shadow-tactile-violet"
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
          </div>
        </aside>

        {/* CENTRE PANEL: Main Question Editor (~6 cols) */}
        <section className="lg:col-span-6 bg-[#0F071E] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-6 max-w-3xl mx-auto w-full">
            
            {/* Question Number Banner & Friendly Inline Hint */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-lime">
                  Question {activeIndex + 1} of {questions.length} • {currentQ.type}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-300">
                    ⏱ {currentQ.timeLimit} seconds
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-300">
                    🏆 {currentQ.points} Points
                  </span>
                </div>
              </div>

              {/* Friendly Inline Hint */}
              {currentError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 flex items-center gap-3 text-red-400 text-xs font-semibold animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{currentError}</span>
                </div>
              )}
            </div>

            {/* Big Question Text Field */}
            <div className="bg-brand-cardDark border-2 border-brand-cardBorder rounded-3xl p-4 shadow-xl">
              <textarea 
                rows="2"
                value={currentQ.question}
                onChange={(e) => handleQuestionChange('question', e.target.value)}
                placeholder="Type your question here (e.g. Which planet is closest to the Sun?)"
                className="w-full bg-transparent font-heading font-extrabold text-xl sm:text-2xl text-white outline-none placeholder:text-slate-600 resize-none"
              />
            </div>

            {/* Image Upload Placeholder Area */}
            <div className="border-2 border-dashed border-brand-cardBorder hover:border-brand-violet/60 rounded-3xl p-6 text-center bg-white/[0.01] transition-all group cursor-pointer relative overflow-hidden">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet group-hover:scale-110 transition-transform">
                  <Image className="w-6 h-6" />
                </div>
                <p className="font-heading font-bold text-sm text-slate-300">
                  Drag & drop an image or click to upload media
                </p>
                <p className="text-xs text-slate-500">
                  Supports PNG, JPG, GIF up to 10MB (Optional)
                </p>
              </div>
            </div>

            {/* Answer Choices (2 for True/False, 4 for Quiz/Poll) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Answer Choices {currentQ.type === 'True/False' ? '(True / False)' : '(4 Options)'}
              </label>
              
              <div className={`grid grid-cols-1 ${currentQ.type === 'True/False' ? 'sm:grid-cols-2 max-w-xl mx-auto' : 'sm:grid-cols-2'} gap-3.5`}>
                {currentQ.answers.map((ans, ansIdx) => (
                  <div 
                    key={ansIdx}
                    className={`relative p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                      ans.correct 
                        ? 'border-brand-lime bg-brand-lime/10 shadow-[0_0_20px_rgba(163,230,53,0.2)]' 
                        : 'border-white/10 bg-brand-cardDark hover:border-white/20'
                    }`}
                  >
                    {/* Color Symbol Badge */}
                    <div className={`w-10 h-10 rounded-xl ${ans.color} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md`}>
                      {ans.symbol}
                    </div>

                    {/* Answer Text Input */}
                    <input 
                      type="text"
                      value={ans.text}
                      onChange={(e) => handleAnswerChange(ansIdx, 'text', e.target.value)}
                      placeholder={currentQ.type === 'True/False' ? ans.text : `Add answer ${ans.label}...`}
                      className="w-full bg-transparent font-heading font-bold text-sm text-white outline-none placeholder:text-slate-600"
                    />

                    {/* Round Correct Toggle */}
                    <button 
                      type="button"
                      onClick={() => handleAnswerChange(ansIdx, 'correct', !ans.correct)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        ans.correct 
                          ? 'bg-brand-lime border-brand-lime text-brand-dark shadow-lg scale-110' 
                          : 'border-white/20 bg-white/5 text-transparent hover:border-white/40'
                      }`}
                      title="Toggle correct answer"
                    >
                      <Check className={`w-4 h-4 stroke-[3] ${ans.correct ? 'text-brand-dark' : 'text-transparent'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* RIGHT PANEL: Settings Panel (~3 cols) */}
        <aside className="lg:col-span-3 bg-[#090216] border-l border-brand-cardBorder p-6 overflow-y-auto space-y-8">
          
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-sm text-white flex items-center gap-2 uppercase tracking-wider">
              <Settings className="w-4 h-4 text-brand-violet" />
              Question Settings
            </h3>
          </div>

          {/* Question Type */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Question Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Quiz', 'True/False', 'Poll'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleQuestionChange('type', t)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    currentQ.type === t 
                      ? 'bg-brand-violet border-brand-violet text-white shadow-lg' 
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Time Limit Chips */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-lime" />
              Time Limit
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 20, 30].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleQuestionChange('timeLimit', sec)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    currentQ.timeLimit === sec 
                      ? 'bg-brand-lime border-brand-lime text-brand-dark shadow-lg' 
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Points Multiplier */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Points Award
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Standard', 'Double'].map((pts) => (
                <button
                  key={pts}
                  onClick={() => handleQuestionChange('points', pts)}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    currentQ.points === pts 
                      ? 'bg-amber-500 border-amber-500 text-brand-dark shadow-lg' 
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{pts === 'Standard' ? '1x Standard' : '2x Double'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-brand-lime">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold">AI Assistant Active</span>
            </div>
            <p>
              BrainBlitz AI is ready to help you generate distractor answers or rephrase questions instantly.
            </p>
          </div>

        </aside>

      </div>
    </div>
  );
}
