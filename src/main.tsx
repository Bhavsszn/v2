// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const pk = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '').trim();
if (!pk) console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY');
const stripePromise = loadStripe(pk);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
