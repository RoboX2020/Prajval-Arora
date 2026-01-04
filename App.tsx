import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { GameLayer } from './components/GameLayer';
import { ShopPage } from './components/ShopPage';

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
