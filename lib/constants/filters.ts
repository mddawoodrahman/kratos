// ============================================
// Product Attribute Constants
// Shared between frontend filters and Sanity schema
// ============================================

export const COLORS = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "grey", label: "Grey" },
  { value: "navy", label: "Navy" },
  { value: "beige", label: "Beige" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "brown", label: "Brown" },
  { value: "pink", label: "Pink" },
] as const;

export const MATERIALS = [
  { value: "cotton", label: "Cotton" },
  { value: "polyester", label: "Polyester" },
  { value: "denim", label: "Denim" },
  { value: "leather", label: "Leather" },
  { value: "wool", label: "Wool" },
  { value: "silk", label: "Silk" },
  { value: "linen", label: "Linen" },
  { value: "cashmere", label: "Cashmere" },
] as const;

export const SIZES = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
] as const;

export const STYLES = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "sporty", label: "Sporty" },
  { value: "streetwear", label: "Streetwear" },
  { value: "vintage", label: "Vintage" },
  { value: "minimalist", label: "Minimalist" },
] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "relevance", label: "Relevance" },
] as const;

// Type exports
export type ColorValue = (typeof COLORS)[number]["value"];
export type MaterialValue = (typeof MATERIALS)[number]["value"];
export type SizeValue = (typeof SIZES)[number]["value"];
export type StyleValue = (typeof STYLES)[number]["value"];
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ============================================
// Sanity Schema Format Exports
// Format compatible with Sanity's options.list
// ============================================

/** Colors formatted for Sanity schema options.list */
export const COLORS_SANITY_LIST = COLORS.map(({ value, label }) => ({
  title: label,
  value,
}));

/** Materials formatted for Sanity schema options.list */
export const MATERIALS_SANITY_LIST = MATERIALS.map(({ value, label }) => ({
  title: label,
  value,
}));

/** Sizes formatted for Sanity schema options.list */
export const SIZES_SANITY_LIST = SIZES.map(({ value, label }) => ({
  title: label,
  value,
}));

/** Styles formatted for Sanity schema options.list */
export const STYLES_SANITY_LIST = STYLES.map(({ value, label }) => ({
  title: label,
  value,
}));

/** Color values array for zod enums or validation */
export const COLOR_VALUES = COLORS.map((c) => c.value) as [
  ColorValue,
  ...ColorValue[],
];

/** Material values array for zod enums or validation */
export const MATERIAL_VALUES = MATERIALS.map((m) => m.value) as [
  MaterialValue,
  ...MaterialValue[],
];

/** Size values array for zod enums or validation */
export const SIZE_VALUES = SIZES.map((s) => s.value) as [
  SizeValue,
  ...SizeValue[],
];

/** Style values array for zod enums or validation */
export const STYLE_VALUES = STYLES.map((s) => s.value) as [
  StyleValue,
  ...StyleValue[],
];
