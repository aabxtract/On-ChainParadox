import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import CosmicBackground from '@/components/layout/cosmic-background';

export const metadata: Metadata = {
  title: 'On-Chain Paradox Machine',
  description: 'Submit paradoxes, vote on their nature, and watch them evolve.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <CosmicBackground />
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 z-10">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
