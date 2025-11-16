'use client';
import { useFormStatus } from "react-dom";
import { submitVoteAction } from "@/actions/paradox-actions";
import { Button } from "@/components/ui/button";
import { ThumbsUp, HelpCircle, ThumbsDown, Loader2 } from "lucide-react";
import type { VoteType } from "@/lib/types";

function VoteButton({ voteType, children }: { voteType: VoteType, children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button 
            type="submit" 
            name="voteType" 
            value={voteType}
            disabled={pending}
            variant="outline" 
            className="flex-1"
        >
            {pending ? <Loader2 className="h-4 w-4 animate-spin"/> : children}
        </Button>
    );
}

export function VotingPanel({ paradoxId }: { paradoxId: string }) {
    const dispatchVoteAction = submitVoteAction.bind(null, paradoxId);
    
    return (
        <form action={dispatchVoteAction}>
            <div className="flex gap-2">
                <VoteButton voteType="solvable">
                    <ThumbsUp className="h-4 w-4 mr-2 text-green-500"/> Solvable
                </VoteButton>
                <VoteButton voteType="unsure">
                    <HelpCircle className="h-4 w-4 mr-2 text-yellow-500"/> Unsure
                </VoteButton>
                <VoteButton voteType="impossible">
                    <ThumbsDown className="h-4 w-4 mr-2 text-red-500"/> Impossible
                </VoteButton>
            </div>
        </form>
    );
}
