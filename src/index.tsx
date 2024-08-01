import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "sanitize.css"
import {worker} from "./mock/browser"



async function mountApp() {
  if(process.env.NODE_ENV==="development") {
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

mountApp();