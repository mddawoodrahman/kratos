# Kratos | Premium Clothing Store

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwindcss)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)

**A premium e-commerce clothing store with AI-powered shopping assistance**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference) • [Testing](#-testing)

</div>

---

## 📖 Overview

**Kratos** is a cutting-edge, full-stack e-commerce platform designed specifically for premium clothing retail. Built with modern web technologies and best practices, it delivers an exceptional shopping experience through a beautiful, responsive storefront enhanced by an intelligent AI shopping assistant powered by OpenAI's GPT-4o.

The platform leverages a headless CMS architecture using Sanity for flexible content management, Clerk for secure authentication, and Stripe for seamless payment processing. With server-side rendering, optimized performance, and comprehensive testing coverage, Kratos represents a production-ready e-commerce solution.

### 🎯 Key Highlights

- 🛍️ **Complete E-commerce Experience** - Full-featured product browsing, filtering, cart management, and secure checkout
- 🤖 **AI Shopping Assistant** - Natural language product search, recommendations, and order tracking powered by OpenAI GPT-4o
- 📱 **Fully Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Beautiful interface built with shadcn/ui, Radix UI, and smooth Framer Motion animations
- 🔐 **Secure Authentication** - Production-ready user authentication powered by Clerk with social login support
- 💳 **Stripe Payment Integration** - Secure checkout with webhook-based order fulfillment
- 📝 **Headless CMS** - Flexible content management with Sanity Studio embedded at `/studio`
- ⚡ **Optimized Performance** - Server-side rendering, image optimization, and efficient data fetching
- 🧪 **Comprehensive Testing** - Unit tests with Jest and E2E tests with Playwright
- 🎯 **Type-Safe Development** - Full TypeScript implementation with auto-generated Sanity types

---

## ✨ Features

### 🛒 Customer Storefront

| Feature | Description |
|---------|-------------|
| **Product Catalog** | Browse extensive product collections with advanced multi-criteria filtering (size, color, material, style, price range) |
| **Smart Search** | Real-time search functionality with query-based product discovery |
| **Product Details** | High-quality image galleries with zoom capability, comprehensive product information, and stock availability |
| **Shopping Cart** | Persistent cart with real-time stock validation, quantity management, and price calculations |
| **Secure Checkout** | Stripe-powered payment processing with address collection and order confirmation |
| **Order Management** | Complete order history, status tracking, and detailed order views (authenticated users) |
| **Category Navigation** | Intuitive category browsing with visual category tiles and filtered views |
| **Featured Products** | Dynamic homepage carousel showcasing featured and new arrivals |
| **Responsive Design** | Mobile-first approach with adaptive layouts optimized for all screen sizes |

### 🤖 AI Shopping Assistant

| Feature | Description |
|---------|-------------|
| **Natural Language Search** | Find products using conversational queries like "show me black dresses under ₹5000" |
| **Smart Recommendations** | Context-aware product suggestions based on user preferences and search history |
| **Order Tracking** | Check order status and details through natural language chat interface |
| **Multi-Parameter Filtering** | AI understands complex queries with multiple filters (category, color, size, material, style, price) |
| **Streaming Responses** | Real-time AI responses with visual tool call indicators for transparency |
| **Chat History** | Persistent conversation history within sessions |
| **Authenticated Features** | Personalized order lookup for logged-in users |

### 👨‍💼 Admin Dashboard

| Feature | Description |
|---------|-------------|
| **Product Management** | Complete CRUD operations for inventory with image upload and bulk editing |
| **Order Management** | View, filter, and update order statuses with detailed order information |
| **Analytics Dashboard** | Real-time business metrics including revenue, orders, and conversion rates |
| **AI-Powered Insights** | Intelligent business analytics and recommendations powered by AI |
| **Low Stock Alerts** | Automatic notifications and visual indicators for low inventory items |
| **Statistics & KPIs** | Comprehensive dashboard with sales performance, inventory status, and customer metrics |
| **Search & Filter** | Advanced search capabilities for products and orders |
| **Batch Operations** | Efficient management of multiple products and orders simultaneously |

### 📝 Content Management System

| Feature | Description |
|---------|-------------|
| **Embedded Sanity Studio** | Full-featured CMS accessible at `/studio` for content editing |
| **Live Preview** | Real-time content preview during editing sessions |
| **Type Generation** | Automatic TypeScript type generation from Sanity schemas for type safety |
| **Image Management** | Automatic image optimization, CDN delivery, and responsive image variants |
| **Schema Validation** | Built-in validation rules ensuring data integrity |
| **Version Control** | Document versioning and change history tracking |
| **GROQ Queries** | Powerful query language for flexible data retrieval |
| **Custom Workflows** | Configurable content publishing and management workflows |

---

## 🛠️ Tech Stack

### Frontend Architecture
- **Framework:** [Next.js 16](https://nextjs.org/) - React framework with App Router, server components, and streaming
- **UI Library:** [React 19](https://react.dev/) - Latest React with enhanced concurrent features
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development with strict mode
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible components
- **Primitives:** [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible component primitives
- **Animations:** [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful, consistent icon set
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/) - Lightweight carousel library

### Backend & Services
- **CMS:** [Sanity v4](https://www.sanity.io/) - Headless CMS with real-time collaboration
- **Authentication:** [Clerk](https://clerk.dev/) - Complete user management with social login
- **Payments:** [Stripe](https://stripe.com/) - Secure payment processing with webhooks
- **AI/LLM:** 
  - [Vercel AI SDK](https://sdk.vercel.ai/) - Unified AI interface with streaming support
  - [OpenAI GPT-4o](https://openai.com/) - Advanced language model for shopping assistance
  - [@clerk/agent-toolkit](https://clerk.dev/) - Clerk integration for AI agents

### State & Data Management
- **Client State:** [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- **Server State:** Next.js Server Actions - Type-safe server mutations
- **Validation:** [Zod](https://zod.dev/) - TypeScript-first schema validation
- **Query Language:** GROQ - Sanity's powerful query language
- **Image Handling:** [@sanity/image-url](https://www.sanity.io/docs/image-url) - Dynamic image transformations

### Development Tools
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Linting/Formatting:** [Biome](https://biomejs.dev/) - Fast, all-in-one toolchain
- **Unit Testing:** 
  - [Jest 30](https://jestjs.io/) - Delightful JavaScript testing framework
  - [React Testing Library](https://testing-library.com/) - Simple component testing utilities
- **E2E Testing:** [Playwright](https://playwright.dev/) - Reliable end-to-end testing
- **Type Generation:** [@sanity/cli](https://www.sanity.io/docs/cli) - Automated TypeScript type generation

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed and configured:

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **pnpm** 8.x or later (`npm install -g pnpm`)
- **Git** for version control
- **Sanity account** with a project created ([Sign up](https://www.sanity.io/))
- **Clerk account** with an application configured ([Sign up](https://clerk.dev/))
- **Stripe account** with API keys ([Sign up](https://stripe.com/))
- **OpenAI API key** or compatible AI gateway access ([Get API key](https://platform.openai.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/kratos-clothing-store.git
cd kratos-clothing-store
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# =====================================
# Sanity CMS Configuration
# =====================================
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-05
NEXT_PUBLIC_SANITY_ORG_ID=your_org_id
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_API_READ_TOKEN=your_read_token

# =====================================
# Clerk Authentication
# =====================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# =====================================
# Stripe Payment Integration
# =====================================
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# =====================================
# AI Integration (OpenAI or AI Gateway)
# =====================================
AI_GATEWAY_API_KEY=your_ai_gateway_key

# =====================================
# Application Configuration
# =====================================
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **📝 Note:** Replace placeholder values with your actual credentials. See [Environment Variables Reference](#-environment-variables-reference) for detailed descriptions.

### Step 4: Set Up Sanity CMS

```bash
# Login to Sanity (first time only)
npx sanity login

# Generate TypeScript types from Sanity schema
pnpm typegen

# (Optional) Import sample data for development
npx sanity dataset import sample-data.ndjson production --replace
```

### Step 5: Configure Clerk Authentication

1. Create a new application in [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Configure OAuth providers (Google, GitHub, etc.) if desired
3. Copy the **Publishable Key** and **Secret Key** to your `.env.local`
4. Add `http://localhost:3000` to allowed redirect URLs in Clerk settings

### Step 6: Set Up Stripe Payment Integration

```bash
# Install Stripe CLI (if not already installed)
# Windows: scoop install stripe
# macOS: brew install stripe/stripe-cli/stripe
# Or download from: https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local development server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

> **⚠️ Important:** Copy the webhook signing secret (starts with `whsec_`) displayed by the Stripe CLI and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### Step 7: Start the Development Server

```bash
pnpm dev
```

The application will be available at:
- **🏪 Storefront:** http://localhost:3000
- **📝 Sanity Studio:** http://localhost:3000/studio
- **👨‍💼 Admin Dashboard:** http://localhost:3000/admin

---

## 🚀 Usage

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot module replacement |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Start production server (requires build first) |
| `pnpm lint` | Run Biome linter to check code quality |
| `pnpm format` | Format code with Biome auto-fix |
| `pnpm typecheck` | Run TypeScript type checking without emitting files |
| `pnpm typegen` | Generate TypeScript types from Sanity schemas |
| `pnpm test` | Run Jest unit tests |
| `pnpm test:watch` | Run Jest in watch mode for active development |
| `pnpm test:e2e` | Run Playwright end-to-end tests |
| `pnpm test:e2e:ui` | Run Playwright tests with interactive UI mode |

### 📁 Project Structure

```
kratos-clothing-store/
├── 📱 app/                           # Next.js App Router (v13+)
│   ├── (app)/                        # Customer-facing route group
│   │   ├── page.tsx                  # Homepage with featured products
│   │   ├── layout.tsx                # App layout with header/footer
│   │   ├── loading.tsx               # Loading UI fallback
│   │   ├── products/                 # Product catalog & detail pages
│   │   │   ├── page.tsx              # Product listing with filters
│   │   │   └── [slug]/page.tsx       # Individual product detail page
│   │   ├── checkout/                 # Checkout flow
│   │   │   ├── page.tsx              # Checkout form
│   │   │   └── success/page.tsx      # Order confirmation page
│   │   ├── orders/                   # Order management
│   │   │   ├── page.tsx              # Order history list
│   │   │   └── [id]/page.tsx         # Order detail view
│   │   ├── about/page.tsx            # About page
│   │   ├── careers/page.tsx          # Careers page
│   │   ├── contact/page.tsx          # Contact page
│   │   ├── faqs/page.tsx             # FAQs page
│   │   ├── help/page.tsx             # Help center
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   ├── shipping/page.tsx         # Shipping information
│   │   ├── size-guide/page.tsx       # Size guide
│   │   └── terms/page.tsx            # Terms of service
│   ├── (admin)/admin/                # Admin dashboard route group
│   │   ├── page.tsx                  # Dashboard home with analytics
│   │   ├── layout.tsx                # Admin layout
│   │   ├── inventory/                # Product management
│   │   │   ├── page.tsx              # Product list view
│   │   │   ├── new/page.tsx          # Create new product
│   │   │   └── [id]/page.tsx         # Edit product
│   │   └── orders/                   # Order management
│   │       ├── page.tsx              # Orders list
│   │       └── [id]/page.tsx         # Order details
│   ├── api/                          # API Routes
│   │   ├── chat/route.ts             # AI chat endpoint (streaming)
│   │   ├── orders/                   # Order-related APIs
│   │   │   └── by-payment/[id]/route.ts  # Fetch order by payment ID
│   │   ├── admin/                    # Admin API endpoints
│   │   │   └── insights/route.ts     # AI insights generation
│   │   └── webhooks/                 # External service webhooks
│   │       └── stripe/route.ts       # Stripe webhook handler
│   ├── studio/[[...tool]]/page.tsx   # Embedded Sanity Studio
│   ├── layout.tsx                    # Root layout with providers
│   └── globals.css                   # Global styles & CSS variables
│
├── 🧩 components/                    # React Components
│   ├── app/                          # App-specific components
│   │   ├── Header.tsx                # Site header with cart & search
│   │   ├── ProductCard.tsx           # Product card component
│   │   ├── ProductGrid.tsx           # Product grid layout
│   │   ├── ProductFilters.tsx        # Filter sidebar
│   │   ├── CartSheet.tsx             # Shopping cart drawer
│   │   ├── ChatSheet.tsx             # AI assistant chat interface
│   │   ├── CheckoutButton.tsx        # Stripe checkout button
│   │   ├── FeaturedCarousel.tsx      # Homepage carousel
│   │   └── chat/                     # Chat-related components
│   ├── admin/                        # Admin dashboard components
│   │   ├── StatCard.tsx              # Statistics card
│   │   ├── ProductRow.tsx            # Product table row
│   │   ├── OrderRow.tsx              # Order table row
│   │   ├── AIInsightsCard.tsx        # AI-powered insights
│   │   └── [other admin components]
│   ├── ui/                           # shadcn/ui base components
│   │   ├── button.tsx                # Button component
│   │   ├── input.tsx                 # Input component
│   │   ├── dialog.tsx                # Dialog/modal component
│   │   ├── Footer.tsx                # Site footer
│   │   └── [other UI primitives]
│   ├── home/                         # Homepage-specific components
│   │   ├── HeroSection.tsx           # Hero banner
│   │   ├── CategoryGrid.tsx          # Category showcase
│   │   └── FeaturedProducts.tsx      # Featured products section
│   ├── filters/                      # Filter components
│   ├── product/                      # Product-specific components
│   ├── cart/                         # Cart-related components
│   └── providers/                    # Context providers
│
├── 📚 lib/                           # Utilities & Business Logic
│   ├── ai/                           # AI agent configuration
│   │   ├── shopping-agent.ts         # Main shopping agent setup
│   │   ├── types.ts                  # AI-related types
│   │   └── tools/                    # AI tools/functions
│   │       ├── search-products.ts    # Product search tool
│   │       └── get-my-orders.ts      # Order lookup tool
│   ├── store/                        # Zustand state stores
│   │   ├── cart-store.ts             # Shopping cart state
│   │   ├── cart-store-provider.tsx   # Cart store provider
│   │   ├── chat-store.ts             # Chat interface state
│   │   └── chat-store-provider.tsx   # Chat store provider
│   ├── actions/                      # Server Actions
│   │   ├── checkout.ts               # Checkout server actions
│   │   └── customer.ts               # Customer management actions
│   ├── hooks/                        # Custom React hooks
│   ├── sanity/                       # Sanity integration
│   │   └── queries/                  # GROQ queries
│   │       ├── products.ts           # Product queries
│   │       ├── orders.ts             # Order queries
│   │       ├── customers.ts          # Customer queries
│   │       ├── categories.ts         # Category queries
│   │       ├── homepage.ts           # Homepage content queries
│   │       └── stats.ts              # Analytics queries
│   ├── constants/                    # Application constants
│   ├── utils/                        # Utility functions
│   ├── utils.ts                      # General utilities (cn, formatters)
│   └── motion.ts                     # Framer Motion variants
│
├── 🗄️ sanity/                        # Sanity CMS Configuration
│   ├── schemaTypes/                  # Content type schemas
│   │   ├── productType.ts            # Product schema definition
│   │   ├── categoryType.ts           # Category schema
│   │   ├── orderType.ts              # Order schema
│   │   ├── customerType.ts           # Customer schema
│   │   ├── homepageType.ts           # Homepage content schema
│   │   └── index.ts                  # Schema aggregation
│   ├── lib/                          # Sanity client & utilities
│   ├── env.ts                        # Environment configuration
│   └── structure.ts                  # Studio structure customization
│
├── 🧪 __tests__/                     # Jest Unit Tests
│   └── components/                   # Component tests
│       ├── Header.test.tsx           # Header component tests
│       └── ProductCard.test.tsx      # ProductCard tests
│
├── 🎭 tests/                         # Playwright E2E Tests
│   └── checkout.spec.ts              # Checkout flow E2E tests
│
├── 🎨 design/                        # Design System Files
│   ├── tokens.json                   # Design tokens
│   ├── preview.html                  # Design preview
│   ├── components/                   # Component documentation
│   └── pages/                        # Page mockups
│
├── 📖 docs/                          # Documentation
│   └── design-guidelines.md          # Design system guidelines
│
├── 🖼️ public/                        # Static Assets
│   └── [images, fonts, etc.]
│
├── 📝 Configuration Files
├── biome.json                        # Biome linter/formatter config
├── components.json                   # shadcn/ui configuration
├── jest.config.ts                    # Jest configuration
├── jest.setup.ts                     # Jest setup file
├── next.config.ts                    # Next.js configuration
├── next-env.d.ts                     # Next.js TypeScript declarations
├── package.json                      # Dependencies & scripts
├── playwright.config.ts              # Playwright configuration
├── pnpm-lock.yaml                    # pnpm lock file
├── postcss.config.mjs                # PostCSS configuration
├── proxy.ts                          # Development proxy
├── sanity.cli.ts                     # Sanity CLI configuration
├── sanity.config.ts                  # Sanity Studio configuration
├── sanity-typegen.json               # Type generation config
├── sanity.types.ts                   # Generated Sanity types
├── schema.json                       # Generated schema export
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── sample-data.ndjson                # Sample data for development
├── .gitignore                        # Git ignore rules
├── LICENSE.md                        # License information
└── README.md                         # This file
```

### 📚 Content Types (Sanity Schemas)

| Schema Type | Fields | Description |
|-------------|--------|-------------|
| **Product** | `name`, `slug`, `description`, `price`, `category`, `images`, `sizes`, `colors`, `materials`, `style`, `fit`, `stock`, `featured`, `careInstructions` | Complete product information with variants, inventory, and rich media |
| **Category** | `name`, `slug`, `description`, `image` | Product categorization (tops, bottoms, dresses, outerwear, accessories, footwear) |
| **Order** | `orderId`, `customer`, `items`, `totalAmount`, `status`, `paymentIntentId`, `shippingAddress`, `createdAt`, `updatedAt` | Order tracking with fulfillment status and shipping information |
| **Customer** | `userId`, `email`, `name`, `stripeCustomerId`, `orders` | Customer profiles linked to Clerk authentication and Stripe |
| **Homepage** | `heroSlides`, `featuredSections`, `categories` | Dynamic homepage content configuration |

### 🎯 Key Features Deep Dive

#### AI Shopping Assistant Architecture

The AI assistant uses the Vercel AI SDK with a tool-based architecture:

1. **Natural Language Processing**: Powered by OpenAI GPT-4o for understanding customer queries
2. **Tool System**: 
   - `searchProducts`: Multi-parameter product search with filtering
   - `getMyOrders`: Authenticated order lookup and tracking
3. **Streaming Responses**: Real-time UI updates with tool call visualization
4. **Context Awareness**: Maintains conversation history for coherent interactions

#### Payment Flow

1. Customer adds items to cart (stored in Zustand with localStorage persistence)
2. Checkout button creates Stripe Checkout Session with:
   - Line items from cart
   - Customer email (if authenticated)
   - Success/cancel URLs
3. Stripe processes payment securely
4. Webhook receives `checkout.session.completed` event
5. Server creates order in Sanity and links to customer
6. Customer redirected to success page with order details

#### Authentication Flow

1. Clerk handles user authentication (email, OAuth providers)
2. Protected routes check authentication status via middleware
3. User ID passed to AI agent for personalized order lookup
4. Customer record created/linked in Sanity on first order

---

## 📡 API Reference

### REST Endpoints

#### POST `/api/chat`

AI shopping assistant chat endpoint with streaming responses.

**Request Body:**
```typescript
{
  messages: UIMessage[]  // Chat message history
}
```

**Response:** Server-Sent Events (SSE) stream with AI responses and tool calls

**Authentication:** Optional (enables order lookup features)

**Example:**
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Show me black dresses under ₹5000' }
    ]
  })
});
```

---

#### GET `/api/orders/by-payment/[paymentId]`

Retrieves order details by Stripe payment intent ID.

**Parameters:**
- `paymentId` (path): Stripe payment intent ID

**Response:**
```typescript
{
  order: Order;  // Complete order object
  customer: Customer;  // Customer information
}
```

**Authentication:** Not required (payment ID serves as authorization)

**Example:**
```javascript
const response = await fetch('/api/orders/by-payment/pi_123abc');
const { order, customer } = await response.json();
```

---

#### POST `/api/webhooks/stripe`

Handles Stripe webhook events for order fulfillment.

**Events Handled:**
- `checkout.session.completed`: Creates order after successful payment

**Verification:** Requires valid webhook signature in headers

**Request Headers:**
- `stripe-signature`: Webhook signature for verification

**Security:** Must configure `STRIPE_WEBHOOK_SECRET` in environment variables

---

#### POST `/api/admin/insights`

Generates AI-powered business insights for the admin dashboard.

**Request Body:**
```typescript
{
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    lowStockProducts: Product[];
    recentOrders: Order[];
  }
}
```

**Response:** Streaming AI-generated insights and recommendations

**Authentication:** Required (admin access)

---

### Server Actions

#### `createCheckoutSession(items: CartItem[])`

Creates a Stripe Checkout Session for cart items.

**Parameters:**
- `items`: Array of cart items with product details and quantities

**Returns:** Redirect to Stripe Checkout page

**Location:** [`lib/actions/checkout.ts`](lib/actions/checkout.ts)

---

#### `createOrUpdateCustomer(userId: string, email: string)`

Creates or updates customer record in Sanity.

**Parameters:**
- `userId`: Clerk user ID
- `email`: Customer email address

**Returns:** Customer document reference

**Location:** [`lib/actions/customer.ts`](lib/actions/customer.ts)

---

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode (recommended for development)
pnpm test:watch

# Run tests with coverage report
pnpm test -- --coverage

# Run specific test file
pnpm test Header.test.tsx
```

**Test Coverage Includes:**
- Component rendering and interactions
- User event handling
- State management
- Utility functions
- Cart operations

**Example Test Structure:**
```typescript
describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });

  it('handles add to cart action', async () => {
    const { user } = setup(<ProductCard product={mockProduct} />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

---

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI mode for debugging
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e tests/checkout.spec.ts

# Run in headed mode (see browser)
pnpm test:e2e --headed

# Run specific test by name
pnpm test:e2e -g "checkout flow"
```

**Test Scenarios:**
- Complete checkout flow
- Product search and filtering
- Cart management
- User authentication
- Order history viewing
- Admin product management

**Example E2E Test:**
```typescript
test('complete checkout flow', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="product-card"]:first-child');
  await page.click('button:has-text("Add to Cart")');
  await page.click('[data-testid="cart-button"]');
  await page.click('button:has-text("Checkout")');
  
  // Stripe checkout flow...
  await expect(page).toHaveURL(/checkout\/success/);
});
```

---

## 🔐 Environment Variables Reference

### Required Variables

| Variable | Description | Example | Where to Get |
|----------|-------------|---------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | `abc123def` | [Sanity Dashboard](https://sanity.io/manage) → Project Settings |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | `production` | Sanity project settings (default: `production`) |
| `SANITY_API_WRITE_TOKEN` | Token with write permissions | `sk...` | Sanity Dashboard → API → Tokens → Add New Token (Editor) |
| `SANITY_API_READ_TOKEN` | Token with read permissions | `sk...` | Sanity Dashboard → API → Tokens → Add New Token (Viewer) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | `pk_test_...` | [Clerk Dashboard](https://dashboard.clerk.dev/) → API Keys |
| `CLERK_SECRET_KEY` | Clerk secret key | `sk_test_...` | Clerk Dashboard → API Keys |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` | [Stripe Dashboard](https://dashboard.stripe.com/) → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_...` | Stripe CLI output or Dashboard → Webhooks |
| `AI_GATEWAY_API_KEY` | OpenAI or AI Gateway key | `sk-...` | [OpenAI Platform](https://platform.openai.com/) → API Keys |

### Optional Variables

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | `2025-12-05` | Format: `YYYY-MM-DD` |
| `NEXT_PUBLIC_SANITY_ORG_ID` | Sanity organization ID | - | Required for certain features |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | `http://localhost:3000` | Used for redirects and metadata |

### Environment Setup by Stage

**Development (`.env.local`):**
```env
NEXT_PUBLIC_SANITY_DATASET=development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Production:**
```env
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

> **🔒 Security Note:** Never commit `.env.local` or expose secret keys. Use environment variable management in your deployment platform (Vercel, Netlify, etc.).

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/kratos-store.git
git push -u origin main
```

2. **Import to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables from [Environment Variables Reference](#-environment-variables-reference)
   - Click "Deploy"

3. **Configure Webhooks:**
   - After deployment, note your production URL
   - Add production webhook endpoint in Stripe Dashboard: `https://yourdomain.com/api/webhooks/stripe`
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

4. **Update Clerk Redirect URLs:**
   - Add production URL to Clerk Dashboard allowed origins

### Deploy to Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify:** Use Next.js build plugin
- **Railway:** Connect GitHub repo with auto-deploy
- **AWS Amplify:** Configure build settings for Next.js
- **Self-hosted:** Build with `pnpm build` and run with `pnpm start`

### Build Configuration

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# The build output will be in .next/ directory
```

---

## 🎨 Design System

The project implements a comprehensive design system for consistent UI/UX:

### Color Palette

Defined using CSS variables for easy theming and dark mode support:

```css
:root {
  --background: 0 0% 100%;          /* White */
  --foreground: 240 10% 3.9%;       /* Almost black */
  --primary: 240 5.9% 10%;          /* Dark gray */
  --primary-foreground: 0 0% 98%;   /* Near white */
  --secondary: 240 4.8% 95.9%;      /* Light gray */
  --accent: 240 4.8% 95.9%;         /* Accent color */
  --muted: 240 4.8% 95.9%;          /* Muted backgrounds */
  --destructive: 0 84.2% 60.2%;     /* Error red */
  --border: 240 5.9% 90%;           /* Border gray */
  --input: 240 5.9% 90%;            /* Input borders */
  --ring: 240 5% 64.9%;             /* Focus rings */
  --radius: 0.5rem;                 /* Border radius */
}
```

### Typography

- **Font Family:** Geist Sans (primary), Geist Mono (code)
- **Font Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights:** Optimized for readability across all screen sizes

### Spacing Scale

Consistent spacing using Tailwind's default scale (0.25rem increments):
- `spacing-1` = 0.25rem (4px)
- `spacing-2` = 0.5rem (8px)
- `spacing-4` = 1rem (16px)
- `spacing-8` = 2rem (32px)

### Component Variants

All components follow a consistent variant pattern using `class-variance-authority`:

```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default, destructive, outline, ghost },
    size: { default, sm, lg, icon }
  }
});
```

### Animation Guidelines

- **Duration:** 150-300ms for micro-interactions, 300-500ms for page transitions
- **Easing:** `ease-in-out` for most animations
- **Framer Motion:** Used for complex animations and page transitions

For detailed design guidelines, see [docs/design-guidelines.md](docs/design-guidelines.md).

---

## 🤝 Contributing

We welcome contributions to improve Kratos! Here's how you can help:

### Development Workflow

1. **Fork the Repository**
```bash
gh repo fork your-username/kratos-clothing-store --clone
cd kratos-clothing-store
```

2. **Create a Feature Branch**
```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
```

3. **Make Your Changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add tests for new features
   - Update documentation as needed

4. **Run Quality Checks**
```bash
# Lint and format code
pnpm lint
pnpm format

# Run type checking
pnpm typecheck

# Run tests
pnpm test
pnpm test:e2e
```

5. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add amazing feature"
# Follow conventional commits format:
# feat: new feature
# fix: bug fix
# docs: documentation changes
# style: formatting changes
# refactor: code refactoring
# test: adding tests
# chore: maintenance tasks
```

6. **Push and Create Pull Request**
```bash
git push origin feature/amazing-feature
gh pr create --title "Add amazing feature" --body "Description of changes"
```

### Code Quality Standards

All contributions must meet these requirements:

- ✅ **Passes all tests:** `pnpm test` and `pnpm test:e2e`
- ✅ **Follows linting rules:** `pnpm lint` with no errors
- ✅ **Properly formatted:** `pnpm format` applied
- ✅ **Type-safe:** `pnpm typecheck` with no errors
- ✅ **Well-documented:** Code comments and README updates
- ✅ **Tested:** Unit tests for new features, E2E tests for workflows

### Areas for Contribution

- 🐛 **Bug Fixes:** Report and fix bugs
- ✨ **New Features:** Propose and implement new functionality
- 📝 **Documentation:** Improve README, add tutorials
- 🎨 **UI/UX:** Enhance design and user experience
- 🧪 **Tests:** Increase test coverage
- 🌐 **Internationalization:** Add language support
- ♿ **Accessibility:** Improve WCAG compliance
- ⚡ **Performance:** Optimize load times and rendering

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

**Copyright © 2024 Sonny Sangha / PAPAFAM**

### Terms Summary

You are free to:
- ✅ **Share** — Copy and redistribute the material in any medium or format
- ✅ **Adapt** — Remix, transform, and build upon the material

Under the following terms:
- ⚠️ **Attribution** — Give appropriate credit, provide a link to the license, and indicate if changes were made
- ⚠️ **NonCommercial** — You may not use the material for commercial purposes without explicit permission

### What This Means

**Allowed:**
- Personal learning and education
- Portfolio projects and demonstrations
- Open-source contributions
- Non-profit organizations

**Not Allowed Without Permission:**
- Selling the code or products derived from it
- Using in commercial applications or services
- Monetizing deployments or SaaS offerings

For the full license text, see [LICENSE.md](LICENSE.md) or visit [Creative Commons](https://creativecommons.org/licenses/by-nc/4.0/).

For commercial licensing inquiries, please contact the copyright holder.

---

## 🙏 Acknowledgments

This project leverages outstanding tools and services from the developer community:

### Core Technologies
- **[Next.js](https://nextjs.org/)** - The React Framework for production-grade applications
- **[React](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Services & Platforms
- **[Sanity](https://www.sanity.io/)** - Headless CMS with real-time collaboration
- **[Clerk](https://clerk.dev/)** - Complete user management and authentication
- **[Stripe](https://stripe.com/)** - Payment infrastructure for the internet
- **[Vercel](https://vercel.com/)** - Platform for frontend frameworks and static sites
- **[OpenAI](https://openai.com/)** - AI language models and APIs

### Libraries & Tools
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - Toolkit for building AI applications
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Small, fast state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Jest](https://jestjs.io/)** & **[Playwright](https://playwright.dev/)** - Testing frameworks

### Design & Icons
- **[Lucide Icons](https://lucide.dev/)** - Beautiful, consistent icon set
- **[Geist Font](https://vercel.com/font)** - Vercel's open-source font family

### Special Thanks
- **Sonny Sangha** for the original concept and design
- The open-source community for continuous improvements and contributions
- All contributors who have helped improve this project

---

## 📞 Support & Community

### Getting Help

- **📖 Documentation:** You're reading it! Check other sections for specific topics
- **🐛 Bug Reports:** [Open an issue](https://github.com/your-username/kratos-clothing-store/issues/new?template=bug_report.md)
- **💡 Feature Requests:** [Suggest a feature](https://github.com/your-username/kratos-clothing-store/issues/new?template=feature_request.md)
- **💬 Discussions:** [GitHub Discussions](https://github.com/your-username/kratos-clothing-store/discussions)

### Useful Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Sanity Documentation:** https://www.sanity.io/docs
- **Clerk Documentation:** https://clerk.dev/docs
- **Stripe Documentation:** https://stripe.com/docs
- **Vercel AI SDK Guide:** https://sdk.vercel.ai/docs

### Project Status

- **Maintained:** ✅ Actively maintained
- **Production Ready:** ✅ Yes, with proper configuration
- **Version:** 0.1.0
- **Last Updated:** January 2026

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Multi-language Support** - Internationalization (i18n) for global markets
- [ ] **Wishlist Feature** - Save products for later
- [ ] **Product Reviews** - Customer reviews and ratings system
- [ ] **Advanced Analytics** - Enhanced admin dashboard with charts
- [ ] **Email Notifications** - Order confirmations and shipping updates
- [ ] **Inventory Alerts** - Automated low-stock notifications
- [ ] **Social Sharing** - Share products on social media
- [ ] **Gift Cards** - Digital gift card support
- [ ] **Discount Codes** - Promotional codes and coupons
- [ ] **Advanced Search** - Faceted search with filters
- [ ] **Mobile App** - React Native mobile application
- [ ] **Dark Mode** - Full dark theme support
- [ ] **PWA Support** - Progressive Web App capabilities

### Future Enhancements

- Performance optimizations and caching strategies
- Advanced SEO improvements
- A/B testing framework
- Enhanced accessibility (WCAG 2.1 AAA)
- GraphQL API option
- Headless commerce features
- Multi-currency support
- Advanced product variants

---

## 🔍 Troubleshooting

### Common Issues

#### Development Server Won't Start

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Restart dev server
pnpm dev
```

#### Sanity Studio Not Loading

1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
2. Check Sanity project status in dashboard
3. Regenerate types: `pnpm typegen`
4. Clear cache and restart

#### Stripe Webhook Failures

1. Ensure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. Verify `STRIPE_WEBHOOK_SECRET` matches CLI output
3. Check webhook signature verification in `/api/webhooks/stripe/route.ts`
4. Test with Stripe CLI: `stripe trigger checkout.session.completed`

#### Type Errors After Schema Changes

```bash
# Regenerate Sanity types
pnpm typegen

# Run type check
pnpm typecheck
```

#### Build Errors

```bash
# Clean build directory
rm -rf .next

# Run type check first
pnpm typecheck

# Rebuild
pnpm build
```

### Performance Issues

- **Slow Page Loads:** Check image optimization and enable CDN
- **Large Bundle Size:** Analyze with `npx @next/bundle-analyzer`
- **API Response Times:** Review GROQ query efficiency in Sanity Vision

### Getting Additional Help

If you encounter issues not covered here:

1. Check [existing issues](https://github.com/your-username/kratos-clothing-store/issues)
2. Review [Next.js troubleshooting guide](https://nextjs.org/docs/messages)
3. Check service-specific documentation (Sanity, Clerk, Stripe)
4. [Open a new issue](https://github.com/your-username/kratos-clothing-store/issues/new) with details

---

<div align="center">

**Built with ❤️ using Next.js, React, and AI**

⭐ **Star this repo** if you find it helpful!

[Report Bug](https://github.com/your-username/kratos-clothing-store/issues) • [Request Feature](https://github.com/your-username/kratos-clothing-store/issues) • [View Demo](#)

---

© 2024 Kratos Clothing Store | Licensed under CC BY-NC 4.0

</div>
