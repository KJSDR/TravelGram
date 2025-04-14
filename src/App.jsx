import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import YourItineraries from './YourItineraries';
import Preferences from './Preferences';
import Explore from './Explore';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/itineraries" element={<YourItineraries />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;