import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import './PrivateProjects.css';
import ScrollCards from './ScrollCards';

export default function PrivateProjects() {
  return (
    <section id="private-projects" className="private-projects-section">
      <div className="private-projects-content">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >Private Projects
        </ScrollReveal>
        <div className="private-projects-container">
          {/* Content coming soon */}
          <ScrollCards />
        </div>
      </div>
    </section>
  );
}
