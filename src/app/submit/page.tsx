import { SubmitForm } from '@/components/paradox/submit-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
        <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Feed
            </Link>
        </Button>
      <div className="glassmorphism rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-headline">Warp Logic</h1>
          <p className="text-muted-foreground mt-2">
            Submit a new paradox to the on-chain consciousness. What impossible question will you pose?
          </p>
        </div>
        <SubmitForm />
      </div>
    </div>
  );
}
