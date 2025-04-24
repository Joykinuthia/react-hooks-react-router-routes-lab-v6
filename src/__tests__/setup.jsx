// setupTests.jsx
import React from 'react';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/movie/1' }),

    NavLink: ({ children, to, ...props }) => {
      return React.createElement(
        'a',
        {
          ...props,
          href: to,
          onClick: (e) => e.preventDefault(), // Prevent JSDOM nav
        },
        children
      );
    },

    Link: ({ children, to, ...props }) => {
      return React.createElement(
        'a',
        {
          ...props,
          href: to,
          onClick: (e) => e.preventDefault(), // Prevent JSDOM nav
        },
        children
      );
    },
  };
});

// Global fetch mock
global.fetch = vi.fn();

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});