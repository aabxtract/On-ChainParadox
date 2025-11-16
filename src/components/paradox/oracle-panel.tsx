'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { invokeOracleAction } from '@/actions/paradox-actions';
import { Paradox } from "@/lib/types";
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatDistanceToNow } from 'date-fns';

function OracleButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending || disabled} className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Invoke Logic Warp Oracle
        </Button>
    )
}

export function OraclePanel({ paradox }: { paradox: Paradox }) {
    const initialState = { message: '', data: paradox.oracleAssessment };
    const invokeOracleWithId = invokeOracleAction.bind(null, paradox.id);
    const [state, dispatch] = useFormState(invokeOracleWithId, initialState);
    
    const assessment = state?.data;

    return (
        <div className="space-y-4">
            {!assessment && (
                <form action={dispatch}>
                    <OracleButton disabled={paradox.state !== 'Unsure'} />
                    {paradox.state !== 'Unsure' && <p className="text-xs text-center text-muted-foreground mt-2">Oracle can only be invoked for paradoxes in an 'Unsure' state.</p>}
                </form>
            )}

            {assessment && (
                <Alert className="border-primary/30">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary font-bold">Oracle Assessment</AlertTitle>
                    <AlertDescription className="space-y-3">
                        <p className="text-foreground">{assessment.reasoning}</p>
                        <div className="text-xs text-muted-foreground">
                            Analyzed {formatDistanceToNow(new Date(assessment.timestamp), { addSuffix: true })}
                        </div>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
