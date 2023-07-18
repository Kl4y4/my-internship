import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import apiClient from './apiClient';

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
  const APIClient = apiClient
  
  const users = apiClient.getUsers()

  expect(users.length).not.toBe(0)

});
