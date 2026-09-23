import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { Chapter1 } from './Chapter1';
import { Chapter2 } from './Chapter2';
import { Chapter3 } from './Chapter3';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chapter-1' | 'chapter-2' | 'chapter-3'>('dashboard');

  return (
    <div className="min-h-screen bg-transparent py-8 selection:bg-yellow-300">
      {currentView === 'dashboard' && (
        <Dashboard onSelectChapter={(id) => setCurrentView(id as 'chapter-1' | 'chapter-2' | 'chapter-3')} />
      )}
      {currentView === 'chapter-1' && (
        <Chapter1 onBack={() => setCurrentView('dashboard')} />
      )}
      {currentView === 'chapter-2' && (
        <Chapter2 onBack={() => setCurrentView('dashboard')} />
      )}
      {currentView === 'chapter-3' && (
        <Chapter3 onBack={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
}
