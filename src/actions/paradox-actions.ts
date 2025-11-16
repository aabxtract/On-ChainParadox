'use server';

import { z } from 'zod';
import { addParadox, addVote, addOracleAssessment, getParadox } from '@/lib/data';
import { assessParadox } from '@/ai/flows/logic-warp-oracle';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { VoteType } from '@/lib/types';

const paradoxSchema = z.object({
  paradoxText: z.string().min(10, 'Paradox must be at least 10 characters long.').max(500, 'Paradox must be 500 characters or less.'),
});

export type FormState = {
  message: string;
  errors?: {
    paradoxText?: string[];
  };
};

export async function createParadoxAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = paradoxSchema.safeParse({
    paradoxText: formData.get('paradoxText'),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid paradox submission.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const newParadox = await addParadox(validatedFields.data.paradoxText);
    revalidatePath('/');
    redirect(`/paradox/${newParadox.id}`);
  } catch (error) {
    return {
      message: "Failed to create paradox. Please try again.",
    };
  }
}

export async function submitVoteAction(paradoxId: string, voteType: VoteType) {
    if (!paradoxId || !['solvable', 'unsure', 'impossible'].includes(voteType)) {
        throw new Error('Invalid vote submission');
    }

    try {
        await addVote(paradoxId, voteType);
        revalidatePath(`/paradox/${paradoxId}`);
        revalidatePath('/');
    } catch (error) {
        console.error("Voting failed:", error);
        // In a real app, you'd handle this more gracefully
        throw new Error('Failed to submit vote.');
    }
}


export type OracleFormState = {
  message: string;
  data?: any;
  error?: boolean;
}

export async function invokeOracleAction(paradoxId: string, currentState: OracleFormState): Promise<OracleFormState> {
    if (!paradoxId) {
        return { message: "Paradox ID is missing.", error: true };
    }

    const paradox = await getParadox(paradoxId);
    if (!paradox) {
        return { message: "Paradox not found.", error: true };
    }

    try {
        const assessment = await assessParadox({ paradoxText: paradox.text });
        await addOracleAssessment(paradoxId, assessment);
        revalidatePath(`/paradox/${paradoxId}`);
        return { message: "Oracle assessment complete.", data: assessment };

    } catch(error) {
        console.error("Oracle invocation failed:", error);
        return { message: "The Oracle is silent... an error occurred.", error: true };
    }
}
