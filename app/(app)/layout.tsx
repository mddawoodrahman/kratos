import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { AppShell } from "@/components/app/AppShell";
import { CartSheet } from "@/components/app/CartSheet";
import { ChatSheet } from "@/components/app/ChatSheet";
import { Header } from "@/components/ui/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { SanityLive } from "@/sanity/lib/live";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <ChatStoreProvider>
          <AppShell>
            <Suspense fallback={<HeaderFallback />}>
              <Header />
            </Suspense>
            <main>{children}</main>
          </AppShell>
          <CartSheet />
          <ChatSheet />
          <Toaster position="bottom-center" />
          <SanityLive />
        </ChatStoreProvider>
      </CartStoreProvider>
    </ClerkProvider>
  );
}

// Fallback component for header while suspending
function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center" />
    </header>
  );
}

export default AppLayout;
