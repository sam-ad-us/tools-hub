import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Scissors, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';

const tools = [
  {
    title: 'Image Compressor',
    description: 'Reduce image file sizes without losing quality. Faster load times for your website.',
    href: '/tools/image-compressor',
    icon: <ImageIcon className="w-8 h-8" />,
  },
  {
    title: 'Image Cropper',
    description: 'Crop and resize your images to the perfect dimensions with our easy-to-use tool.',
    href: '/tools/image-cropper',
    icon: <Scissors className="w-8 h-8" />,
  },
  {
    title: 'AI Tool Suggester',
    description: 'Let our AI recommend new tools to enhance our platform based on your feedback.',
    href: '/admin/recommendations',
    icon: <Bot className="w-8 h-8" />,
  },
];

const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-image');

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-black/60" />
        <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold !text-white tracking-tighter">
            Your All-in-One Digital Toolkit
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground !text-gray-200">
            Powerful and easy-to-use tools to streamline your digital tasks. From image editing to AI-powered recommendations, we've got you covered.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Link href="#tools">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Tools</h2>
            <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
              A curated collection of digital utilities to simplify your workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link href={tool.href} key={tool.title} className="group">
                <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                      {tool.icon}
                    </div>
                    <CardTitle className="font-headline">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
