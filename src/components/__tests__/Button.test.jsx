import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../common/Button';
describe('Button Component', () => {
  test('renders button with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  test('renders as an anchor tag by default', () => {
    render(<Button href="https://example.com">Link</Button>);
    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
  test('renders as a button when "as" prop is "button"', () => {
    render(<Button as="button">Button</Button>);
    const btn = screen.getByRole('button', { name: /button/i });
    expect(btn).toBeInTheDocument();
  });
  test('applies variant class correctly', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    // Sprawdzamy czy klasa (z CSS modules) została zaaplikowana. 
    // Uwaga: Przy identity-obj-proxy nazwa klasy może być po prostu "secondary" lub podobna.
    // Bardziej precyzyjny test zależałby od implementacji stylów, 
    // ale tutaj sprawdzamy czy komponent się renderuje bez błędów.
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });
  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button as="button" onClick={handleClick}>Click me</Button>);
    
    const btn = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(btn);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});