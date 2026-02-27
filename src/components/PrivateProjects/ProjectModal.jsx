import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, project, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Zamknięcie na ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Animacja otwarcia/zamknięcia
  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Otwieranie
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out' }
      );
    } else {
      // Zamykanie
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
      });

      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  // Zamknięcie na klik backdrop
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div
      ref={backdropRef}
      className="project-modal-backdrop"
      onClick={handleBackdropClick}
      style={{ opacity: 0 }}
    >
      <div ref={modalRef} className="project-modal" style={{ opacity: 0 }}>
        {/* Close button */}
        <button
          className="project-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          title="Close (ESC)"
        >
          ✕
        </button>

        {/* Video tło */}
        <div className="project-modal-video-container">
          <video
            className="project-modal-video"
            src={project.fullVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Content */}
        <div className="project-modal-content">
          <h2 className="project-modal-title">{project.title}</h2>

          <p className="project-modal-description">{project.fullDescription}</p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="project-modal-tech-stack">
              <h3 className="project-modal-tech-title">Tech Stack</h3>
              <div className="project-modal-tech-tags">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="project-modal-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
