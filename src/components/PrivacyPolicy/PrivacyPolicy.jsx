import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PrivacyPolicy.module.css';
import PolicyContentPl from './PolicyContent.pl';
import PolicyContentEn from './PolicyContent.en';

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.classList.add('hide-header-grid');
    return () => {
      document.body.classList.remove('hide-header-grid');
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <main className={styles.content}>
        {i18n.resolvedLanguage === 'pl' ? <PolicyContentPl /> : <PolicyContentEn />}
      </main>
    </div>
  );
}
