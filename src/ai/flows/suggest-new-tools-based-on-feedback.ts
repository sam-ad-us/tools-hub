'use server';
/**
 * @fileOverview AI-powered tool recommendation system that analyzes user feedback and current digital tool trends to suggest new tools to add to ToolboxHQ.
 *
 * - suggestNewToolsBasedOnFeedback - A function that handles the tool suggestion process.
 * - SuggestNewToolsBasedOnFeedbackInput - The input type for the suggestNewToolsBasedOnFeedback function.
 * - SuggestNewToolsBasedOnFeedbackOutput - The return type for the suggestNewToolsBasedOnFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNewToolsBasedOnFeedbackInputSchema = z.object({
  userFeedback: z.string().describe('The aggregated user feedback about existing tools and desired features.'),
  trendingTools: z.string().describe('A list of trending digital tools and technologies.'),
  existingTools: z.string().describe('A list of the existing tools available on ToolboxHQ.'),
});
export type SuggestNewToolsBasedOnFeedbackInput = z.infer<typeof SuggestNewToolsBasedOnFeedbackInputSchema>;

const SuggestNewToolsBasedOnFeedbackOutputSchema = z.object({
  suggestedTools: z.array(z.string()).describe('A list of suggested new tools to add to ToolboxHQ.'),
  rationale: z.string().describe('The rationale behind the tool suggestions, based on user feedback and trends.'),
});
export type SuggestNewToolsBasedOnFeedbackOutput = z.infer<typeof SuggestNewToolsBasedOnFeedbackOutputSchema>;


const digitalToolsSchema = z.object({
  tools: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    })
  ),
});

const getDigitalTools = ai.defineTool(
  {
    name: 'getDigitalTools',
    description: 'Returns a list of digital tools available and their description.',
    inputSchema: z.object({
      query: z.string().describe('Optional search terms to filter tools.'),
    }),
    outputSchema: digitalToolsSchema,
  },
  async (input) => {
    // Dummy data for now
    const tools = [
      {name: 'Image Compressor', description: 'Compresses images to reduce file size.'},
      {name: 'Image Cropper', description: 'Crops images to specified dimensions.'},
      {name: 'PDF Converter', description: 'Converts PDFs to various formats.'},
    ];
    if (input.query) {
      return {tools: tools.filter(tool => tool.name.toLowerCase().includes(input.query!.toLowerCase()))};
    }
    return {tools};
  }
);

export async function suggestNewToolsBasedOnFeedback(input: SuggestNewToolsBasedOnFeedbackInput): Promise<SuggestNewToolsBasedOnFeedbackOutput> {
  return suggestNewToolsBasedOnFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNewToolsBasedOnFeedbackPrompt',
  input: {schema: SuggestNewToolsBasedOnFeedbackInputSchema},
  output: {schema: SuggestNewToolsBasedOnFeedbackOutputSchema},
  tools: [getDigitalTools],
  prompt: `You are an expert in digital tools and user experience.

You will analyze user feedback, current digital tool trends, and existing tools on ToolboxHQ to suggest new tools that would enhance the user experience and keep the website relevant.

User Feedback: {{{userFeedback}}}
Trending Digital Tools: {{{trendingTools}}}
Existing Tools on ToolboxHQ: {{{existingTools}}}

Consider the following:
- Tools that address common user pain points.
- Tools that leverage trending technologies.
- Tools that complement the existing suite of tools.

Based on this information, suggest new tools to add to ToolboxHQ and provide a rationale for each suggestion.

Also call getDigitalTools tool to retrieve tools.

Your suggestions should be tailored to the needs of ToolboxHQ users and aligned with current digital tool trends.

Output:
`, // the AI output will follow the schema defined above
});

const suggestNewToolsBasedOnFeedbackFlow = ai.defineFlow(
  {
    name: 'suggestNewToolsBasedOnFeedbackFlow',
    inputSchema: SuggestNewToolsBasedOnFeedbackInputSchema,
    outputSchema: SuggestNewToolsBasedOnFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
