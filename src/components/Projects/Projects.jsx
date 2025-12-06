import React, { useEffect, useState } from 'react';
import GitHubSDK from './GitHubSDK';
import { GITHUB_TOKEN, GITHUB_USERNAME } from './github.secret';
import styles from './Projects.module.css';
import Button from '../common/Button.jsx';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section id='projects' className={styles.projectsSection}>
      <h2 className={styles.selectedHeading}>SELECTED CASES</h2>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.projectsGrid}>
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectCard}
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
              <span>★ {repo.stargazerCount}</span>
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