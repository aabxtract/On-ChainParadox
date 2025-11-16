import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot, Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary">
                <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm8-88a8 8 0 0 1-8 8h-4v24a8 8 0 0 1-16 0v-24h-4a8 8 0 0 1 0-16h24a8 8 0 0 1 8 8Z" />
            </svg>
            <span className="font-bold font-headline sm:inline-block">
              On-Chain Paradox Machine
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/leaderboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Leaderboard
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/20 hover:text-primary-foreground">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
            </Button>
        </div>
      </div>
    </header>
  );
}