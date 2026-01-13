// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Token for server-side live content fetching
  serverToken: process.env.SANITY_API_READ_TOKEN,
  // Token for client-side live preview (optional, only needed for authenticated previews)
  browserToken: process.env.SANITY_API_READ_TOKEN,
  // Optionally fetch on server without token in production (for public content)
  fetchOptions: {
    revalidate: 0, // Disable cache for live updates
  },
});
