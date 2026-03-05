'use server';
/**
 * @fileOverview An AI agent that suggests optimal password configurations based on the service type.
 *
 * - suggestOptimalPasswordConfig - A function that handles the password configuration suggestion process.
 * - SuggestOptimalPasswordConfigInput - The input type for the suggestOptimalPasswordConfig function.
 * - SuggestOptimalPasswordConfigOutput - The return type for the suggestOptimalPasswordConfig function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalPasswordConfigInputSchema = z.object({
  serviceType: z
    .string()
    .describe('The type of online service (e.g., banking, social media, email, general).'),
});
export type SuggestOptimalPasswordConfigInput = z.infer<
  typeof SuggestOptimalPasswordConfigInputSchema
>;

const SuggestOptimalPasswordConfigOutputSchema = z.object({
  length: z.number().int().min(8).describe('Optimal password length.'),
  includeUppercase: z.boolean().describe('Whether to include uppercase letters.'),
  includeLowercase: z.boolean().describe('Whether to include lowercase letters.'),
  includeNumbers: z.boolean().describe('Whether to include numbers.'),
  includeSymbols: z.boolean().describe('Whether to include symbols.'),
  recommendation: z
    .string()
    .describe('A brief explanation of why this configuration is recommended.'),
});
export type SuggestOptimalPasswordConfigOutput = z.infer<
  typeof SuggestOptimalPasswordConfigOutputSchema
>;

export async function suggestOptimalPasswordConfig(
  input: SuggestOptimalPasswordConfigInput
): Promise<SuggestOptimalPasswordConfigOutput> {
  return suggestOptimalPasswordConfigFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalPasswordConfigPrompt',
  input: {schema: SuggestOptimalPasswordConfigInputSchema},
  output: {schema: SuggestOptimalPasswordConfigOutputSchema},
  prompt: `You are an AI assistant specialized in recommending optimal password configurations for various online services.

Given the service type, provide a recommended password configuration, including length, and whether to include uppercase letters, lowercase letters, numbers, and symbols. Also, provide a brief explanation for your recommendation.

Consider common security best practices for the given service type. For banking and critical services, prioritize maximum security. For social media, balance security with memorability if appropriate, but still aim for strong passwords.

Service Type: {{{serviceType}}}`,
});

const suggestOptimalPasswordConfigFlow = ai.defineFlow(
  {
    name: 'suggestOptimalPasswordConfigFlow',
    inputSchema: SuggestOptimalPasswordConfigInputSchema,
    outputSchema: SuggestOptimalPasswordConfigOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
