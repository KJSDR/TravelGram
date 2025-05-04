import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Explore from './Explore';
import YourItineraries from './YourItineraries';
import Preferences from './Preferences';
import PlanItinerariesPage from './PlanItinerariesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/itineraries" element={<YourItineraries />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/plan" element={<PlanItinerariesPage />} />
        </Routes>
        
        
      </div>
    </Router>
  );
}

export default App;