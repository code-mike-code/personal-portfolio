/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../../../i18n';
import { CookieConsentModal } from '../CookieConsentModal';

const renderModal = (props = {}) =>
  render(
    <MemoryRouter>
      <CookieConsentModal {...props} />
    </MemoryRouter>
  );

describe('CookieConsentModal', () => {
  beforeEach(async () => {
    window.localStorage.clear();
    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });

  test('renders as an accessible dialog when no consent is stored', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'ccm-title');
  });

  test('does not render when consent was already given', () => {
    window.localStorage.setItem('devmike_cookie_consent', 'accepted');
    renderModal();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('defaults to declined (GDPR: no pre-checked consent)', () => {
    renderModal();
    expect(screen.getByRole('button', { pressed: false })).toBeInTheDocument();
  });

  test('confirm with default state stores "declined" and calls onDecline', () => {
    const onDecline = jest.fn();
    const onAccept = jest.fn();
    renderModal({ onDecline, onAccept });

    fireEvent.click(screen.getByRole('button', { name: i18n.t('cookies.confirm') }));

    expect(window.localStorage.getItem('devmike_cookie_consent')).toBe('declined');
    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(onAccept).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('toggling to accept then confirming stores "accepted" and calls onAccept', () => {
    const onDecline = jest.fn();
    const onAccept = jest.fn();
    renderModal({ onDecline, onAccept });

    fireEvent.click(screen.getByRole('button', { pressed: false }));
    fireEvent.click(screen.getByRole('button', { name: i18n.t('cookies.confirm') }));

    expect(window.localStorage.getItem('devmike_cookie_consent')).toBe('accepted');
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onDecline).not.toHaveBeenCalled();
  });
});
