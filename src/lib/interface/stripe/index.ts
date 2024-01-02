import Stripe from 'stripe';

export type CreateSession = {
  userId: string;
  priceId: string;
  paymentType: Stripe.Checkout.SessionCreateParams.Mode;
};
