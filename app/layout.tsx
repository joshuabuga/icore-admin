export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
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
  title: "Ushindi Box - BO ",
  description: "Ushindi Box Internal Backoffice for admin management of platform and players",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/onboarding"
          signUpFallbackRedirectUrl="/onboarding"
          appearance={{
              baseTheme: shadcn,
          }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
      {children}
      <Toaster richColors />
      </ThemeProviders>
      </body>
    </html>
      </ClerkProvider>
  );
}
