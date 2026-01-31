import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import ThemeToggle from '@/components/providers/ThemeToggle';
import { ClerkProvider } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';
import { ThemeProviders } from '@/components/providers/ThemeProviders';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tucheze - BO ",
  description: "Tucheze Internal Backoffice for admin management of platform and players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider
          appearance={{
              baseTheme: shadcn,
          }}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
      <div className="fixed top-4 right-10 z-50">
          <ThemeToggle />
      </div>
      {children}
      <Toaster richColors />
      </ThemeProviders>
      </body>
    </html>
      </ClerkProvider>
  );
}
