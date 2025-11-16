'use server';

/**
 * @fileOverview Implements the Logic Warp Oracle flow, which uses AI to analyze paradoxes and provide a probabilistic assessment.
 *
 * - assessParadox - A function that takes a paradox text as input and returns an AI-assessed probability of it being 'Solvable' or 'Impossible'.
 * - AssessParadoxInput - The input type for the assessParadox function.
 * - AssessParadoxOutput - The return type for the assessParadox function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessParadoxInputSchema = z.object({
  paradoxText: z
    .string()
    .describe('The text of the paradox to be assessed.'),
});
export type AssessParadoxInput = z.infer<typeof AssessParadoxInputSchema>;

const AssessParadoxOutputSchema = z.object({
  probabilitySolvable: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'The probability (between 0 and 1) that the paradox is solvable.'
    ),
  probabilityImpossible: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'The probability (between 0 and 1) that the paradox is impossible.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI’s reasoning behind the probability assessment of the paradox’s solvability.'
    ),
});
export type AssessParadoxOutput = z.infer<typeof AssessParadoxOutputSchema>;

export async function assessParadox(
  input: AssessParadoxInput
): Promise<AssessParadoxOutput> {
  return assessParadoxFlow(input);
}

const assessParadoxPrompt = ai.definePrompt({
  name: 'assessParadoxPrompt',
  input: {schema: AssessParadoxInputSchema},
  output: {schema: AssessParadoxOutputSchema},
  prompt: `You are the Logic Warp Oracle, an AI skilled in analyzing logical paradoxes.

  Given the following paradox, assess the probability of it being solvable versus impossible. Provide a probability between 0 and 1 for both solvability and impossibility. Also, provide a short explanation of your reasoning.

  Paradox: {{{paradoxText}}}
  `,
});

const assessParadoxFlow = ai.defineFlow(
  {
    name: 'assessParadoxFlow',
    inputSchema: AssessParadoxInputSchema,
    outputSchema: AssessParadoxOutputSchema,
  },
  async input => {
    const {output} = await assessParadoxPrompt(input);
    return output!;
  }
);
