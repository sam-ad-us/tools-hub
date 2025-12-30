import { RecommendationTool } from '@/components/recommendation-tool';
import { Bot, Lightbulb } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <Lightbulb className="w-12 h-12 mx-auto text-accent mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold">AI Tool Recommendations</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Leverage AI to discover the next great tool for ToolboxHQ. Provide context below and let our AI analyst suggest new features based on user feedback and market trends.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <RecommendationTool />
      </div>
    </div>
  );
}
