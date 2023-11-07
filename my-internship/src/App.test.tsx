import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})

test('renders app component', () => {
  act(() => render(<App />))
  
  const appComponent = screen.getByTestId("app")
  expect(appComponent).toBeInTheDocument();
});
