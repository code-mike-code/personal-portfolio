import React, { useEffect, useState } from 'react';
import GitHubSDK from './GitHubSDK';
import { GITHUB_TOKEN, GITHUB_USERNAME } from './github.secret';
import styles from './Projects.module.css';
import Button from '../common/Button.jsx';
import RepoOrbs from './RepoOrbs';

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
