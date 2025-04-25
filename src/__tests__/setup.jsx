import React from 'react';
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch';
import PropTypes from 'prop-types';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/movie/1' }),
    NavLink: ({ children, to, ...props }) => {
      return React.createElement('a', { 
        ...props, 
        href: to,
        className: 'active'
      }, children);
    },
    Link: ({ children, to, ...props }) => React.createElement('a', { ...props, href: to }, children),
  };
});

// Add prop-types validation
const NavLink = ({ children, to, ...props }) => React.createElement('a', { ...props, href: to, className: 'active' }, children);
NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

const Link = ({ children, to, ...props }) => React.createElement('a', { ...props, href: to }, children);
Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

// Mock fetch
global.fetch = vi.fn();

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});