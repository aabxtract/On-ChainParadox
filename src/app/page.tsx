import { getParadoxes } from '@/lib/data';
import { ParadoxCard } from '@/components/paradox/paradox-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default async function Home() {
  const paradoxes = await getParadoxes();

  return (
    <div className="flex flex-col items-center text-center animate-fade-in space-y-8">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-glow">
          On-Chain Paradox Machine
        </h1>
        <p className="text-lg text-muted-foreground">
          Submit paradoxes to the collective consciousness. Vote on their nature. Witness their evolution.
        </p>
        <Button asChild size="lg" className="bg-primary/80 hover:bg-primary">
          <Link href="/submit">
            <PlusCircle className="mr-2 h-5 w-5" />
            Submit a New Paradox
          </Link>
        </Button>
      </div>

      {paradoxes.length > 0 ? (
        <div className="w-full max-w-5xl pt-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Recent Paradoxes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paradoxes.map((paradox) => (
              <ParadoxCard key={paradox.id} paradox={paradox} />
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-16 text-center text-muted-foreground">
          <p>No paradoxes have been submitted yet.</p>
          <p>Be the first to warp logic.</p>
        </div>
      )}
    </div>
  );
}
