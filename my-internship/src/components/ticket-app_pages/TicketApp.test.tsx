import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App'

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})

test('renders home page', () => {
  render(<App />);
  const ticketAppBtn = screen.getAllByRole("button")[0]
  act(() => fireEvent(ticketAppBtn, new Event("click")))
  const ticketAppComponent = screen.getByTestId('main')
  expect(ticketAppComponent).toHaveTextContent('Main');
});
