import React, { useEffect, useState, useRef } from 'react';
import GitHubSDK from './GitHubSDK';
import { GITHUB_TOKEN, GITHUB_USERNAME } from './github.secret';
import styles from './Projects.module.css';
import Button from '../common/Button.jsx';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [visibleRepos, setVisibleRepos] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    const sdk = new GitHubSDK(GITHUB_USERNAME, GITHUB_TOKEN);
    sdk.getPinnedRepos()
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        const data = await res.json();
        const nodes = data.data?.user?.pinnedItems?.nodes || [];
        setRepos(nodes);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Detect screen size for animation strategy
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 900) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            if (index !== null) {
              setVisibleRepos((prev) => ({ ...prev, [index]: true }));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [repos]);

  const getCardAnimationClass = (index) => {
    if (screenSize === 'mobile') {
      return styles.slideFromTop;
    }

    const columnsPerRow = screenSize === 'tablet' ? 2 : 3;
    const row = Math.floor(index / columnsPerRow);
    const isEvenRow = row % 2 === 0;

    return isEvenRow ? styles.slideFromLeft : styles.slideFromRight;
  };

  return (
    <section id='projects' className={styles.projectsSection}>
      <h2 className={styles.selectedHeading}>SELECTED CASES</h2>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.projectsGrid}>
        {repos.map((repo, index) => (
          <a
            key={repo.id}
            data-index={index}
            ref={(el) => (cardRefs.current[index] = el)}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.projectCard} ${getCardAnimationClass(index)} ${visibleRepos[index] ? styles.animated : ''}`}
            style={{
              '--animation-delay': `${index * 0.1}s`,
            }}
          >
            <div className={styles.cardHeader}>
              {repo.primaryLanguage && (
                <>
                  <span
                    className={styles.languageDot}
                    style={{ background: repo.primaryLanguage.color || '#ccc' }}
                  />
                  <span className={styles.languageName}>{repo.primaryLanguage.name}</span>
                </>
              )}
            </div>
            <div className={styles.projectName}>{repo.name}</div>
            <div className={styles.projectDesc}>{repo.description || 'UX/UI DESIGN, DEVELOPMENT'}</div>
            <div className={styles.cardFooter}>
              {/* <span>★ {repo.stargazerCount}</span> */}
              {repo.forkCount > 0 && <span>Forks: {repo.forkCount}</span>}
            </div>
          </a>
        ))}
      </div>
      <div className={styles.projectsButtons}>
        <Button
          href="https://github.com/code-mike-code"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </Button>
      </div>
    </section>
  );
}