import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminPanel from './AdminPanel';

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})

test('Closing form is rendered', () => {
  render(<AdminPanel isOpen>
    <form data-testid='close-dialog' className='close-dialog' method="dialog"><button type="submit">x</button></form>
  </AdminPanel>);
  const closingForm = screen.getByTestId('close-dialog')
  expect(closingForm).toBeInTheDocument()
});
