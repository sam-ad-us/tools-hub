import { ContactForm } from '@/components/contact-form';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactImage = placeholderImages.placeholderImages.find(p => p.id === 'contact-us');

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question, feedback, or a tool suggestion? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-semibold">Email Us</h3>
              <p className="text-muted-foreground">Send us an email and we'll get back to you shortly.</p>
              <a href="mailto:support@toolboxhq.com" className="text-primary font-medium hover:underline">
                support@toolboxhq.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-semibold">Call Us</h3>
              <p className="text-muted-foreground">Our team is available during business hours.</p>
              <a href="tel:+1234567890" className="text-primary font-medium hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-semibold">Our Office</h3>
              <p className="text-muted-foreground">123 Digital Ave, Tech City, 90210</p>
            </div>
          </div>
        </div>
        <div className="p-8 border rounded-lg bg-card">
            <h2 className="text-2xl font-headline font-semibold mb-6">Send a Message</h2>
            <ContactForm />
        </div>
      </div>
    </div>
  );
}
