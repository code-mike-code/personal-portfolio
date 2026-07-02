import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GitHubSDK from './GitHubSDK';
import { mockRepos } from './mock-repos';
import styles from './Projects.module.css';
import Button from '../common/Button.jsx';
import RepoOrbs from './RepoOrbs';

const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'code-mike-code';

export default function Projects() {
  const { t } = useTranslation();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const sdk = new GitHubSDK(GITHUB_USERNAME);
    sdk.getPortfolioRepos()
      .then(setRepos)
      .catch(() => {
        // API padło (rate limit / offline) — pokazujemy przykładowe repo
        // zamiast surowego komunikatu błędu
        setRepos(mockRepos);
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id='projects' className={styles.projectsSection}>
      <h2 className={styles.selectedHeading}>{t('projects.heading')}</h2>
      {loading && <div className={styles.loading}>{t('projects.loading')}</div>}
      {usingFallback && (
        <div className={styles.error}>
          {t('projects.fallbackNotice', 'Live GitHub data is unavailable right now — showing sample projects.')}
        </div>
      )}
      {!loading && <RepoOrbs repos={repos} />}
      <div className={styles.projectsButtons}>
        <Button
          href="https://github.com/code-mike-code"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('projects.profileButton')}
        </Button>
      </div>
    </section>
  );
}
