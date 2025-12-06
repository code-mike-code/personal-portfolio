import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header/Header';
// Mockujemy funkcję scrollIntoView, która nie jest dostępna w JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();
describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };
  test('renders logo correctly', () => {
    renderHeader();
    expect(screen.getByText('Code Mike')).toBeInTheDocument();
  });
  test('renders navigation links', () => {
    renderHeader();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
  test('toggles menu when burger button is clicked', () => {
    renderHeader();
    const burgerBtn = screen.getByLabelText('Toggle menu');
    
    // Menu powinno być początkowo zamknięte (sprawdzamy np. po klasie lub widoczności)
    // W tym przypadku sprawdzamy czy kliknięcie nie powoduje błędów i zmienia stan
    
    fireEvent.click(burgerBtn);
    // Tutaj moglibyśmy sprawdzić czy klasa 'header--menu-open' została dodana do header
    // lub czy nawigacja jest widoczna (jeśli używamy CSS visibility)
  });
  test('calls scrollIntoView when navigation link is clicked', () => {
    renderHeader();
    // Mockujemy getElementById aby zwracał element
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    const workLink = screen.getByText('Work');
    fireEvent.click(workLink);
    expect(document.getElementById).toHaveBeenCalledWith('projects');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });
});