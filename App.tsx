import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { OriginPage } from './components/OriginPage';
import { HomePage } from './components/HomePage';
import { GameLayer } from './components/GameLayer';
import { ShopPage } from './components/ShopPage';
import { SiteHeader } from './components/SiteHeader';
import { audioService } from './services/audioService';

const CircuitArchive: React.FC = () => {
  const [view, setView] = React.useState<'home' | 'game'>('home');

  return (
    <div className="flex h-full min-h-screen flex-col">
      <SiteHeader archiveLabel={view === 'home' ? 'Circuit atlas' : 'Driving home'} />
      {view === 'home' ? (
        <HomePage onStart={() => setView('game')} />
      ) : (
        <GameLayer onBackToHome={() => setView('home')} />
      )}
    </div>
  );
};

const JourneyArchive: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <SiteHeader archiveLabel="Driving home" />
      <GameLayer onBackToHome={() => navigate('/v1')} />
    </div>
  );
};

const GarageArchive: React.FC = () => (
  <div className="flex h-full min-h-screen flex-col">
    <SiteHeader archiveLabel="Internet garage" />
    <ShopPage />
  </div>
);

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
      <div className="w-full min-h-full">
        <Routes>
          <Route path="/" element={<OriginPage />} />
          <Route path="/v1" element={<CircuitArchive />} />
          <Route path="/v1/journey" element={<JourneyArchive />} />
          <Route path="/v1/garage" element={<GarageArchive />} />
          <Route path="/shop" element={<Navigate to="/v1/garage" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
