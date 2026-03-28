/**
 * Stripe price IDs.
 * Swap these out when moving between test and live mode.
 * Test price IDs start with price_test_, live with price_1.
 */
const IS_PROD = process.env.NODE_ENV === "production";

const prices = {
  // Test mode price IDs
  test: {
    reservation:    "price_0TFkDcL8wQqMeneGucw5G7rc",   // $99 one-time
    wyFormation:    "price_0TFkDyL8wQqMeneGw9mK6ENk",   // $299 one-time
    annualService:  "price_0TFkETL8wQqMeneGvbR4m58N",   // $99/yr recurring
    aiBusinessPlan: "price_0TFljKL8wQqMeneGyk5KkPQV",
  },
  // Live mode price IDs
  live: {
    reservation:    "price_0TFhyqL8wQqMeneGhFKwbKmY",   // $99 one-time
    wyFormation:    "price_0TFhy3L8wQqMeneGRYEOB7Ej",   // $299 one-time
    annualService:  "price_0TFkmLL8wQqMeneGSxORaxsb",   // $99/yr recurring
    aiBusinessPlan: "price_0TFljTL8wQqMeneGVzRJ7vJT",
  },
};

export const STRIPE_PRICES = IS_PROD ? prices.live : prices.test;
