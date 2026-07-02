/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button', () => {
  test('renders an anchor by default with children and passed props', () => {
    render(<Button href="https://example.com">Click me</Button>);
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  test('renders as a native button when as="button"', () => {
    render(<Button as="button" type="submit">Send</Button>);
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('merges custom className with variant classes', () => {
    render(<Button href="#x" className="extra-class">Styled</Button>);
    expect(screen.getByRole('link', { name: 'Styled' })).toHaveClass('extra-class');
  });
});
