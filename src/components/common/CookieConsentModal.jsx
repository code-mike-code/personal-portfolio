// CookieConsentModal.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CookieConsentModal.css";

const COOKIE_CONSENT_KEY = "devmike_cookie_consent"; // 'accepted' | 'declined'

export function CookieConsentModal({ onAccept, onDecline }) {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return !stored; // true jeśli brak zgody (nie ma stored), false jeśli jest zgoda
  });
  
  const [isAccepted, setIsAccepted] = useState(true); // true = Accept all (white), false = Decline all (black)

  const handleAcceptAll = () => {
    setIsAccepted(true);
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsOpen(false);
    if (typeof onAccept === "function") onAccept();
  };

  const handleDeclineAll = () => {
    setIsAccepted(false);
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsOpen(false);
    if (typeof onDecline === "function") onDecline();
  };

  if (!isOpen) return null;

  return (
    <div className="ccm-backdrop">
      <div className="ccm-modal">
        <h2 className="ccm-title">Privacy policy and cookies</h2>
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
          <span className="ccm-label-left">Accept all</span>
          <button
            type="button"
            className={`ccm-toggle ${isAccepted ? "ccm-toggle-accept" : "ccm-toggle-decline"}`}
            onClick={() => setIsAccepted((prev) => !prev)}
            aria-pressed={isAccepted}
            aria-label={isAccepted ? "Accept all cookies" : "Decline all cookies"}
          >
            <span className="ccm-toggle-pill" />
          </button>
          <span className="ccm-label-right">Decline all</span>
        </div>

        <div className="ccm-actions">
          <button
            type="button"
            className="ccm-btn ccm-btn-accept"
            onClick={handleAcceptAll}
          >
            Confirm
          </button>
          <button
            type="button"
            className="ccm-btn ccm-btn-decline"
            onClick={handleDeclineAll}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
