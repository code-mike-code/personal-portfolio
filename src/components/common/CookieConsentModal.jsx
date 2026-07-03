// CookieConsentModal.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFocusTrap from "../../utils/useFocusTrap";
import "./CookieConsentModal.css";

const COOKIE_CONSENT_KEY = "devmike_cookie_consent"; // 'accepted' | 'declined'

export function CookieConsentModal({ onAccept, onDecline }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(() => {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return !stored; // true jeśli brak zgody (nie ma stored), false jeśli jest zgoda
  });
  
  // RODO: zgoda nie może być domyślnie zaznaczona — start od "decline"
  const [isAccepted, setIsAccepted] = useState(false);
  const modalRef = useRef(null);

  useFocusTrap(modalRef, isOpen);

  const handleConfirm = () => {
    const status = isAccepted ? "accepted" : "declined";
    window.localStorage.setItem(COOKIE_CONSENT_KEY, status);
    setIsOpen(false);
    if (isAccepted) {
      if (typeof onAccept === "function") onAccept();
    } else {
      if (typeof onDecline === "function") onDecline();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ccm-backdrop">
      <div
        className="ccm-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ccm-title"
      >
        <h2 className="ccm-title" id="ccm-title">{t('cookies.title')}</h2>
        <p className="ccm-text">
          {t('cookies.text')}{" "}
          <Link
          to="/privacy-policy"
          className="ccm-link"
          target="_blank"
          rel="noopener noreferrer"
          >
            {t('cookies.policyLink')}
          </Link>.
        </p>

        <div className="ccm-toggle-row">
          <span className="ccm-label-left">{t('cookies.declineAll')}</span>
          <button
            type="button"
            className={`ccm-toggle ${isAccepted ? "ccm-toggle-accept" : "ccm-toggle-decline"}`}
            onClick={() => setIsAccepted((prev) => !prev)}
            aria-pressed={isAccepted}
            aria-label={isAccepted ? t('cookies.toggleAcceptAria') : t('cookies.toggleDeclineAria')}
          >
            <span className="ccm-toggle-pill" />
          </button>
          <span className="ccm-label-right">{t('cookies.acceptAll')}</span>
        </div>

        <div className="ccm-actions">
          <button
            type="button"
            className="ccm-btn ccm-btn-confirm"
            onClick={handleConfirm}
          >
            {t('cookies.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
