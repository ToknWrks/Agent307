/**
 * Stripe price IDs.
 * Swap these out when moving between test and live mode.
 * Test price IDs start with price_test_, live with price_1.
 */
const IS_PROD = process.env.NODE_ENV === "production";

const prices = {
  // Test mode price IDs
  test: {
    reservation:    "price_",   // $99 one-time
    wyFormation:    "price_",   // $299 one-time
    annualService:  "price_",   // $100/yr recurring
  },
  // Live mode price IDs
  live: {
    reservation:    "price_",   // $99 one-time
    wyFormation:    "price_",   // $299 one-time
    annualService:  "price_",   // $100/yr recurring
  },
};

export const STRIPE_PRICES = IS_PROD ? prices.live : prices.test;
