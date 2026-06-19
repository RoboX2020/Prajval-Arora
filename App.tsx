import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { GameLayer } from './components/GameLayer';
import { ShopPage } from './components/ShopPage';
import { audioService } from './services/audioService';

const HomeWrapper: React.FC = () => {
  const [view, setView] = React.useState<'home' | 'game'>('home');

  // We can use a simple state switch for the internal Home/Game view
  // while keeping the main routing for major pages like Shop.
  return (
    <>
      {view === 'home' ? (
        <HomePage onStart={() => setView('game')} />
      ) : (
        <GameLayer onBackToHome={() => setView('home')} />
      )}
    </>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"]');
      if (interactive) {
        audioService.playClickSound();
      }
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"]');
      
      if (interactive && e.relatedTarget) {
        const related = e.relatedTarget as HTMLElement;
        if (!interactive.contains(related)) {
          audioService.playHoverSound();
        }
      } else if (interactive && !e.relatedTarget) {
         audioService.playHoverSound();
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    document.addEventListener('mouseover', handleGlobalMouseOver, true);

    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
      document.removeEventListener('mouseover', handleGlobalMouseOver, true);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full h-full">
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
