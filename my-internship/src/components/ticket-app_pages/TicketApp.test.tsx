import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App'

test('renders home page', () => {
  render(<App />);
  const ticketAppComponent = screen.getByTestId('main')
  expect(ticketAppComponent).toHaveTextContent('Main');
});
