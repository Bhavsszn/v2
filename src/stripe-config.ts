// Stripe configuration for DJ booking payments
export const STRIPE_CONFIG = {
  // Replace these with your actual Stripe Price IDs from your Stripe Dashboard
  PRICE_IDS: {
    wedding: 'price_1234567890_wedding',
    corporate: 'price_1234567890_corporate',
    'private-party': 'price_1234567890_private_party',
    birthday: 'price_1234567890_birthday',
    club: 'price_1234567890_club',
    festival: 'price_1234567890_festival',
    anniversary: 'price_1234567890_anniversary',
  }
};

export const getProductByPriceId = (priceId: string) => {
  const products = {
    [STRIPE_CONFIG.PRICE_IDS.wedding]: {
      name: 'Wedding DJ Service',
      description: 'Professional DJ service for wedding events',
      mode: 'payment' as const,
    },
    [STRIPE_CONFIG.PRICE_IDS.corporate]: {
      name: 'Corporate Event DJ Service',
      description: 'Professional DJ service for corporate events',
      mode: 'payment' as const,
    },
    [STRIPE_CONFIG.PRICE_IDS['private-party']]: {
      name: 'Private Party DJ Service',
      description: 'Professional DJ service for private parties',
      mode: 'payment' as const,
    },
    [STRIPE_CONFIG.PRICE_IDS.birthday]: {
      name: 'Birthday Party DJ Service',
      description: 'Professional DJ service for birthday parties',
      mode: 'payment' as const,
    },
    [STRIPE_CONFIG.PRICE_IDS.club]: {
      name: 'Club Event DJ Service',
      description: 'Professional DJ service for club events',
      mode: 'payment' as const,
    },
    [STRIPE_CONFIG.PRICE_IDS.festival]: {
      name: 'Festival DJ Service',
      description: 'Professional DJ service for festivals',
      mode: 'payment' as const,
    },
    [STRIPE_CONFIG.PRICE_IDS.anniversary]: {
      name: 'Anniversary DJ Service',
      description: 'Professional DJ service for anniversary celebrations',
      mode: 'payment' as const,
    },
  };

  return products[priceId];
};