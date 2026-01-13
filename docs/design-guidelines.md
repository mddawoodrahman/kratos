# Design Guidelines & System

## Design Tokens

The design system uses a set of globally defined tokens for consistency. These are available as CSS variables and Tailwind utility classes.

### Colors
- **Primary**: Brand main color (Used for primary actions).
- **Secondary**: Supporting color (Used for backgrounds, secondary actions).
- **Accent**: Highlight color.
- **Destructive**: Error states.
- **Muted**: Subdued text/backgrounds.

See `design/tokens.json` for raw values and `app/globals.css` for CSS implementation.

### Typography
- **Font**: Geist Sans / Mono.
- **Scale**: Base 16px.
- **Headings**: H1 48-56px desktop, bold weight.
- **Body**: 16px with 1.5 line-height.
- **Buttons**: 14-16px, 12px internal padding min.

### Spacing & Radii
- **Radii**: Derived from `--radius` (default 0.625rem).
- **Container Max Width**: 1400px.
- **Grid Gutters**: 16px mobile → 24px desktop.

## Layout Rules
- Max content width: 1200-1400px, centered with `mx-auto`.
- Product grid: 4 cols desktop, 3 tablet, 2 mobile.
- Use 12-column grid conceptually.

## Component Usage

### Header (`components/ui/Header.tsx`)
Responsive sticky header with Framer Motion transitions.
- **Features**: Debounced search, Mobile Sheet menu, Keyboard shortcut (`/`) to focus search.
- **Props**: None (uses stores internally).

### Product Card (`components/product/ProductCard.tsx`)
Standard product display with hover effects.
- **Features**: Hover reveal quick actions, Add to Cart animation hook, Stock badge.
- **Props**: `product` (Sanity document), `priority` (for LCP images).
- **Aspect Ratio**: 4:5 for apparel.

### Cart Drawer (`components/cart/CartDrawer.tsx`)
Persistent slide-out cart with quantity controls.
- **Features**: Framer Motion entry/exit, Stock validation, Subtotal calculation.

### Responsive Image (`components/ui/ResponsiveImage.tsx`)
Wrapper around `next/image` for consistent loading states.
- **Props**: `src`, `alt`, `ratio` (number, e.g., 0.8 for 4:5), `priority`.

### Footer (`components/ui/Footer.tsx`)
Site-wide footer with links and social icons.

## Home Page Components

### Hero Section (`components/home/HeroSection.tsx`)
Full-bleed hero with gradient overlay and dual CTAs.
- **Props**: `title`, `subtitle`, `ctaText`, `ctaHref`, `backgroundImage`.

### Category Grid (`components/home/CategoryGrid.tsx`)
Visual category navigation with hover effects.
- **Props**: `categories` (array from Sanity).

### Featured Products (`components/home/FeaturedProducts.tsx`)
Grid of featured product cards.
- **Props**: `title`, `subtitle`, `products`.

## Animations (`lib/motion.ts`)
We use **Framer Motion** for interactions.
- `transition`: Standard spring physics.
- `slideIn`: Upward fade entry.
- `fadeIn`: Simple opacity entry.
- `scaleIn`: Scale + fade entry.
- `staggerContainer`: Stagger children.
- `motionTokens`: Standard durations (fast 120ms, normal 240ms, slow 400ms).

### Motion Rules
- All animations should be 120-240ms.
- Always respect `prefers-reduced-motion`.
- Use `whileHover` and `whileTap` for interactive elements.

## Accessibility Checklist
- [x] All interactive elements have `aria-label` or visible text.
- [x] Color contrast meets WCAG AA (4.5:1 for body text).
- [x] Focus states are visible (Ring).
- [x] Images have `alt` text.
- [x] Keyboard navigation works (Tab, Enter, Escape).
- [x] Stock status conveyed via text, not just color.

## Image Guidelines
- **Product Images**: Aspect ratio 4:5 (portrait) for apparel, square for accessories.
- **Hero Images**: Use `priority` prop, full-bleed with overlay.
- **Sizes Attribute**: Use responsive sizes (`(max-width: 768px) 100vw, 50vw`).
- **Hotspot**: Preserve Sanity hotspot data for cropping.

## Testing
- **Unit tests**: Jest + React Testing Library (see `__tests__/`).
- **E2E tests**: Playwright (see `tests/`).
- **Run unit tests**: `pnpm test`
- **Run E2E tests**: `pnpm exec playwright test`

## Migration Steps
1. **Install dependencies**: `pnpm install`
2. **Tailwind v4**: Uses `@tailwindcss/postcss` (already configured).
3. **Icons**: Uses `lucide-react`.
4. **Store**: Ensure `CartStoreProvider` and `ChatStoreProvider` wrap the app.

## Preview Files
- `design/preview.html` - Design tokens preview
- `design/pages/homepage.html` - Homepage static preview
- `design/components/product-card.html` - ProductCard states
