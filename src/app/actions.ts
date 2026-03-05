'use server';

import { suggestOptimalPasswordConfig, SuggestOptimalPasswordConfigInput } from '@/ai/flows/suggest-optimal-password-config';

export async function getAiSuggestion(data: SuggestOptimalPasswordConfigInput) {
  try {
    const result = await suggestOptimalPasswordConfig(data);
    return { success: result };
  } catch (error) {
    console.error('AI suggestion failed:', error);
    return { error: 'Failed to get AI suggestion. Please try again later.' };
  }
}
