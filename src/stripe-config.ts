export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: number;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_QlSsm90kZrMVry',
    priceId: 'price_1PtvwYAk57lRlYLjUKKdwk0b',
    name: 'Single Mastering',
    description: 'Payment for single master complete audio download',
    mode: 'payment',
    price: 10.00
  },
  {
    id: 'prod_QY4Wr8APwbBhGK',
    priceId: 'price_1PgyNwAk57lRlYLjWrtmedtf',
    name: 'Single Mix + Master',
    description: 'Payment for single Mixx download',
    mode: 'payment',
    price: 50.00
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};