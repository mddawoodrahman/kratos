import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

// Mock the store provider
jest.mock("@/lib/store/cart-store-provider", () => ({
  useCartActions: () => ({
    addItem: jest.fn(),
  }),
}));

type MockMotionProps = PropsWithChildren<Record<string, unknown>>;

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: MockMotionProps) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: PropsWithChildren) => <>{children}</>,
}));

const mockProduct: FILTER_PRODUCTS_BY_NAME_QUERYResult[number] = {
  _id: "product-1",
  name: "Test Product",
  slug: "test-product",
  price: 99.99,
  stock: 10,
  images: [
    {
      _key: "img-1",
      asset: { _id: "asset-1", url: "https://example.com/image.jpg" },
    },
  ],
  category: { _id: "cat-1", title: "Shirts", slug: "shirts" },
  size: "m",
  material: "cotton",
  color: "black",
  style: "casual",
  fit: "regular",
};

describe("ProductCard", () => {
  it("renders product name and price", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("₹99.99")).toBeInTheDocument();
  });

  it("shows sold out badge when stock is 0", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("Sold Out")).toBeInTheDocument();
  });

  it("links to the product page", () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/test-product");
  });

  it("has accessible image alt text", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
  });
});
