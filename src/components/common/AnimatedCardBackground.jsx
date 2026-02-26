// plik: src/components/common/AnimatedCardBackground.jsx
import React from 'react';
import './AnimatedCardBackground.css';

const AnimatedCardBackground = ({ index }) => {
  return (
    <div className="animated-card-bg">
      {/* Gradient animated background */}
      <div className="animated-bg-gradient"></div>
      
      {/* Animated particles */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
    </div>
  );
};

export default AnimatedCardBackground;
