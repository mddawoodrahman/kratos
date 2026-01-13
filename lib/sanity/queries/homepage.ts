import { defineQuery } from "next-sanity";

/**
 * Get homepage settings including hero slides
 */
export const HOMEPAGE_QUERY = defineQuery(`*[
  _type == "homepage"
][0] {
  heroSlides[] {
    title,
    subtitle,
    "image": image.asset->url,
    ctaText,
    ctaLink,
    textPosition
  },
  featuredCategoriesTitle,
  featuredCategoriesSubtitle,
  newArrivalsTitle,
  newArrivalsSubtitle
}`);
