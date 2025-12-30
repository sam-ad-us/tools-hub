"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SuggestNewToolsBasedOnFeedbackInput,
  SuggestNewToolsBasedOnFeedbackOutput,
  suggestNewToolsBasedOnFeedback,
} from "@/ai/flows/suggest-new-tools-based-on-feedback";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

const formSchema = z.object({
  userFeedback: z.string().min(10, "Please provide some user feedback."),
  trendingTools: z.string().min(10, "Please list some trending tools."),
  existingTools: z.string().min(10, "Please list the existing tools."),
});

export function RecommendationTool() {
  const [result, setResult] = useState<SuggestNewToolsBasedOnFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userFeedback: "Users are requesting ways to edit videos and create simple animations. Some find the image compression too aggressive at times.",
      trendingTools: "AI-powered video editors, online animation makers, collaborative whiteboards, background remover tools.",
      existingTools: "Image Compressor, Image Cropper",
    },
  });

  async function onSubmit(values: SuggestNewToolsBasedOnFeedbackInput) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await suggestNewToolsBasedOnFeedback(values);
      setResult(response);
    } catch (e: any) {
      setError("An error occurred while generating recommendations. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="w-6 h-6" />
            Recommendation Engine Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aggregated User Feedback</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Users want to convert video formats...'" {...field} />
                    </FormControl>
                    <FormDescription>Summarize feedback from your users.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trendingTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trending Digital Tools</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'AI avatar generators, screen recorders...'" {...field} />
                    </FormControl>
                    <FormDescription>List some popular or emerging tools in the market.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="existingTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Tools on ToolboxHQ</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Image Compressor, QR Code Generator...'" {...field} />
                    </FormControl>
                    <FormDescription>List the tools currently available on your site.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center p-8">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">AI is analyzing the data...</p>
        </div>
      )}
      
      {error && (
        <Card className="border-destructive bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                AI-Generated Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg font-headline">Suggested Tools</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {result.suggestedTools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg font-headline">Rationale</h3>
              <p className="mt-2 text-muted-foreground whitespace-pre-wrap">{result.rationale}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
