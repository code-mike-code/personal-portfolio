import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CookieConsentModal } from '../common/CookieConsentModal';
const COOKIE_KEY = "devmike_cookie_consent";
describe('CookieConsentModal', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  test('renders modal when no consent is stored', () => {
    render(
      <BrowserRouter>
        <CookieConsentModal />
      </BrowserRouter>
    );
    expect(screen.getByText(/Privacy policy and cookies/i)).toBeInTheDocument();
  });
  test('does not render modal when consent is already stored', () => {
    window.localStorage.setItem(COOKIE_KEY, 'accepted');
    render(
      <BrowserRouter>
        <CookieConsentModal />
      </BrowserRouter>
    );
    expect(screen.queryByText(/Privacy policy and cookies/i)).not.toBeInTheDocument();
  });
  test('saves "accepted" to localStorage when Confirm is clicked', () => {
    render(
      <BrowserRouter>
        <CookieConsentModal />
      </BrowserRouter>
    );
    
    const confirmBtn = screen.getByRole('button', { name: /Confirm/i });
    fireEvent.click(confirmBtn);
    expect(window.localStorage.getItem(COOKIE_KEY)).toBe('accepted');
    expect(screen.queryByText(/Privacy policy and cookies/i)).not.toBeInTheDocument();
  });
  test('saves "declined" to localStorage when Cancel is clicked', () => {
    render(
      <BrowserRouter>
        <CookieConsentModal />
      </BrowserRouter>
    );
    
    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelBtn);
    expect(window.localStorage.getItem(COOKIE_KEY)).toBe('declined');
  });
});