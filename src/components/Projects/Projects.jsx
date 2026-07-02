import React, { useEffect, useState } from 'react';
import GitHubSDK from './GitHubSDK';
import styles from './Projects.module.css';
import Button from '../common/Button.jsx';
import RepoOrbs from './RepoOrbs';

const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'code-mike-code';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sdk = new GitHubSDK(GITHUB_USERNAME);
    sdk.getPortfolioRepos()
      .then(setRepos)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id='projects' className={styles.projectsSection}>
      <h2 className={styles.selectedHeading}>GITHUB</h2>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && <RepoOrbs repos={repos} />}
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
