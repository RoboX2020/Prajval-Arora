
import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { GameLayer } from './components/GameLayer';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'game'>('home');

  return (
    <div className="w-full h-full">
      {view === 'home' ? (
        <HomePage onStart={() => setView('game')} />
      ) : (
        <GameLayer onBackToHome={() => setView('home')} />
      )}
    </div>
  );
};

export default App;
