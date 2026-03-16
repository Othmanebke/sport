import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SportPage from './pages/SportPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SportsGuidePage from './pages/SportsGuidePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sport/:nomDuSport" element={<SportPage />} />
        <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
        <Route path="/guide-des-sports" element={<SportsGuidePage />} />
      </Routes>
    </Router>
  );
}

export default App;
