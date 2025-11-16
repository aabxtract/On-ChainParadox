'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createParadoxAction } from '@/actions/paradox-actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Mint Paradox NFT
        </Button>
    );
}


export function SubmitForm() {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createParadoxAction, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message && state.errors) {
            const errorMsg = state.errors.paradoxText?.[0] || state.message;
            toast({
                variant: 'destructive',
                title: 'Submission Error',
                description: errorMsg,
            });
        }
    }, [state, toast]);


  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          id="paradoxText"
          name="paradoxText"
          placeholder="e.g., This statement is false."
          rows={4}
          className="bg-background/70 text-base"
          aria-describedby="paradox-error"
        />
        <div id="paradox-error" aria-live="polite" aria-atomic="true">
            {state.errors?.paradoxText &&
            state.errors.paradoxText.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                {error}
                </p>
            ))}
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
