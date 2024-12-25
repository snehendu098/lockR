import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProviders } from "@/components/core/wallet-providers";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/toaster";

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "lockR",
  description: "Secure your keys with lockR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrains.className} antialiased`}>
        <Toaster />
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  );
}
