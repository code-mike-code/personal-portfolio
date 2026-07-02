import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import './WorkHeader.css';

export default function WorkHeader() {
  return (
    <div className="work-header">
      <div className="work-header-blob" aria-hidden="true"></div>
      <h2 className="work-header-title">Selected Work</h2>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={8}
        containerClassName="work-header-subtitle-container"
        textClassName="work-header-subtitle"
      >Every project is shaped around the client — not a template — with a focus on clarity, performance, and craft.
      </ScrollReveal>
    </div>
  );
}
