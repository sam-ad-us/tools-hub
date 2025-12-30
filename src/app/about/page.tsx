import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Goal, Rocket } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

const aboutImage = placeholderImages.placeholderImages.find(p => p.id === 'about-us');

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">About ToolboxHQ</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We're passionate about building simple, powerful tools that make your digital life easier.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
        {aboutImage && (
          <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}
        <div className="space-y-6">
          <h2 className="text-3xl font-headline font-semibold">Our Story</h2>
          <p className="text-muted-foreground">
            ToolboxHQ started as a small project to solve a big problem: the need for accessible, high-quality digital utilities without the clutter of expensive software suites. What began as a collection of simple scripts has grown into a platform dedicated to providing a comprehensive set of tools for creatives, developers, and everyday users.
          </p>
          <p className="text-muted-foreground">
            Our philosophy is simple: create tools that are intuitive, efficient, and free to use. We believe that everyone should have access to the resources they need to bring their ideas to life.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Values</h2>
          <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
            The principles that guide our work and our community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardContent className="p-8">
              <div className="p-4 bg-accent/10 text-accent rounded-full inline-block mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold">User-Centric</h3>
              <p className="mt-2 text-muted-foreground">
                We build for you. Your feedback drives our development, ensuring our tools are practical and solve real-world problems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <div className="p-4 bg-primary/10 text-primary rounded-full inline-block mb-4">
                <Goal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Simplicity</h3>
              <p className="mt-2 text-muted-foreground">
                Powerful doesn't have to mean complicated. We focus on clean, intuitive interfaces that get the job done without a steep learning curve.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <div className="p-4 bg-green-500/10 text-green-500 rounded-full inline-block mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Innovation</h3>
              <p className="mt-2 text-muted-foreground">
                We're constantly exploring new technologies, like AI, to bring you cutting-edge tools and improve your experience on our platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
