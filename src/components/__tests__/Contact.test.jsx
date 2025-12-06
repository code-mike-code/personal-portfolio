import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact/Contact';
import emailjs from '@emailjs/browser';
// Mockujemy emailjs
jest.mock('@emailjs/browser');
// Mockujemy IntersectionObserver
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    REACT_APP_EMAILJS_SERVICE_ID: 'test_service_id',
    REACT_APP_EMAILJS_TEMPLATE_ID: 'test_template_id',
    REACT_APP_EMAILJS_PUBLIC_KEY: 'test_public_key',
  };
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  process.env = originalEnv;
});
describe('Contact Component', () => {
  test('renders contact form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Write a message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Request/i })).toBeInTheDocument();
  });
  test('submits form with correct values', async () => {
    emailjs.sendForm.mockResolvedValue({ status: 200, text: 'OK' });
    
    render(<Contact />);
    
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const messageInput = screen.getByPlaceholderText(/Write a message/i);
    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Hello there!');
    
    fireEvent.submit(submitBtn.closest('form'));
    await waitFor(() => {
      expect(emailjs.sendForm).toHaveBeenCalled();
    });
    
    expect(screen.getByText('Message sent.')).toBeInTheDocument();
  });
  test('displays error message on submission failure', async () => {
    emailjs.sendForm.mockRejectedValue(new Error('Failed'));
    
    render(<Contact />);
    
    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    fireEvent.submit(submitBtn.closest('form'));
    await waitFor(() => {
      expect(screen.getByText('Message sent error!')).toBeInTheDocument();
    });
  });
});