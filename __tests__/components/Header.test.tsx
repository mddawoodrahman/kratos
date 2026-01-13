import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { Header } from "@/components/ui/Header";

// Mock dependencies
jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: PropsWithChildren) => <>{children}</>,
  SignedOut: ({ children }: PropsWithChildren) => <>{children}</>,
  SignInButton: ({ children }: PropsWithChildren) => <>{children}</>,
  UserButton: () => <div data-testid="user-button" />,
}));

jest.mock("@/lib/store/cart-store-provider", () => ({
  useCartActions: () => ({
    openCart: jest.fn(),
  }),
  useTotalItems: () => 3,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

type MockMotionProps = PropsWithChildren<Record<string, unknown>>;

jest.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: MockMotionProps) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: MockMotionProps) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: MockMotionProps) => (
      <span {...props}>{children}</span>
    ),
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => "5rem",
  AnimatePresence: ({ children }: PropsWithChildren) => <>{children}</>,
}));

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);

    expect(screen.getByText("KRATOS")).toBeInTheDocument();
  });

  it("renders navigation links on desktop", () => {
    render(<Header />);

    expect(screen.getByText("New Arrivals")).toBeInTheDocument();
    expect(screen.getByText("Apparel")).toBeInTheDocument();
  });

  it("shows cart badge with item count", () => {
    render(<Header />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("has accessible search input", () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(/search products/i);
    expect(searchInput).toBeInTheDocument();
  });
});
