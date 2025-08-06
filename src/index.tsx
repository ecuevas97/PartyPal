// Import the core React library
import React from 'react';
// Import the ReactDOM library to render components to the DOM
import ReactDOM from 'react-dom/client';
// Import the main App component
import App from './App';

// Get a reference to the root DOM element in public/index.html
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the App component inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
