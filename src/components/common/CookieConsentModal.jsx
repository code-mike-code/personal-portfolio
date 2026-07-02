// CookieConsentModal.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useFocusTrap from "../../utils/useFocusTrap";
import "./CookieConsentModal.css";

const COOKIE_CONSENT_KEY = "devmike_cookie_consent"; // 'accepted' | 'declined'

export function CookieConsentModal({ onAccept, onDecline }) {
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
        <h2 className="ccm-title" id="ccm-title">Privacy policy and cookies</h2>
        <p className="ccm-text">
          This site uses cookies (including Google Analytics) to analyze traffic.
          You can accept or decline all optional cookies. For details see our{" "}
          <Link 
          to="/privacy-policy"
          className="ccm-link"
          target="_blank"
          rel="noopener noreferrer"
          >
            Privacy & Cookies Policy
          </Link>.
        </p>

        <div className="ccm-toggle-row">
          <span className="ccm-label-left">Decline all</span>
          <button
            type="button"
            className={`ccm-toggle ${isAccepted ? "ccm-toggle-accept" : "ccm-toggle-decline"}`}
            onClick={() => setIsAccepted((prev) => !prev)}
            aria-pressed={isAccepted}
            aria-label={isAccepted ? "Accept all cookies" : "Decline all cookies"}
          >
            <span className="ccm-toggle-pill" />
          </button>
          <span className="ccm-label-right">Accept all</span>
        </div>

        <div className="ccm-actions">
          <button
            type="button"
            className="ccm-btn ccm-btn-confirm"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
