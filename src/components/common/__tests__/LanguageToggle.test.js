/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from '../../../i18n';
import LanguageToggle from '../LanguageToggle';

describe('LanguageToggle', () => {
  beforeEach(async () => {
    window.localStorage.clear();
    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });

  test('switches language on click and persists the choice', async () => {
    render(<LanguageToggle />);
    const button = screen.getByRole('button');

    expect(i18n.resolvedLanguage).toBe('en');
    expect(button).toHaveAttribute('aria-label', 'Switch language to Polish');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(i18n.resolvedLanguage).toBe('pl');
    expect(button).toHaveAttribute('aria-label', 'Zmień język na angielski');
    expect(window.localStorage.getItem('devmike_lang')).toBe('pl');
  });

  test('toggles back to English on second click', async () => {
    render(<LanguageToggle />);
    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(i18n.resolvedLanguage).toBe('en');
  });
});
