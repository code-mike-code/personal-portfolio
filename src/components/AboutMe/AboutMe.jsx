import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section id='about' className="about-section">
      <div className="about-content">
        <div
          className='text-1'
        >
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          Front-End Developer passionate about building efficient, user-friendly interfaces. With over 500 hours of intensive, mentor-led training,specialize in modern React development. Focusing on writing high-quality code and using modern practices to ensure every project is robust and reliable.
        </ScrollReveal>
        </div>
        <div
          className='text-2'
        >
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={-5}
          blurStrength={10}
        >
          Believing that good software requires both logic and empathy. My background in client services honed my communication skills, allowing me to truly understand user needs. I am a proactive problem-solver who values organized workflows and collaboration to deliver clean, impactful solutions.
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
