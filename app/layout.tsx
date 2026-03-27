import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import RootShell from "@/components/RootShell";

export const metadata: Metadata = {
  title: "UR Aerotech - Aircraft Repair & Aviation Parts",
  description: "Leading provider of aircraft repair services and aviation parts e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <SessionProvider>
          <RootShell>{children}</RootShell>
        </SessionProvider>
      </body>
    </html>
  );
}
