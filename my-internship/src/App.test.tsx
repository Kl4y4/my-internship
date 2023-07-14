import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders app component', () => {
  render(<App />);
  const appComponent = screen.getByTestId("app")
  expect(appComponent).toBeInTheDocument();
});
