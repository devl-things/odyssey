import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { logError } from './util/logging';
import App from './App'
import './styles/App.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  logError('Root element not found!');
}