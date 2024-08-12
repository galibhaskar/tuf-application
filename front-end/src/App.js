import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BannerPreview from './components/BannerPreview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/banner-preview/:id" element={<BannerPreview />} />
      </Routes>
    </Router>
  );
};

export default App;
