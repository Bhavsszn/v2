import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const pk = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '').trim();

// Hard fail in dev if the key is missing so you notice immediately
if (!pk) {
  console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY. Set it in .env.local (local) and in Bolt client env.');
}

const stripePromise = pk ? loadStripe(pk) : Promise.resolve(null);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
