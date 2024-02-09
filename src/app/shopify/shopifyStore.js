import Client from "shopify-buy";
export const client = Client.buildClient({
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_KEY,
  domain: process.env.NEXT_PUBLIC_SHOPIFY_URL
})