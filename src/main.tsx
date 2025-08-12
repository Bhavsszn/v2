import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const pk = pk_test_51OjlJYAk57lRlYLjyo5yzJhORdHrBYKpEczIx8qRdbuhizgNSSqwWccmkz2g78IZ3XnBWTA9yNt3qxyKNW7lflpS00BWl9abPc

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
