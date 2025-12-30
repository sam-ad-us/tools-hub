"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { UploadCloud, FileDown, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function ImageCompressorPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setOriginalPreview(URL.createObjectURL(file));
      setCompressedPreview(null);
    }
  };

  const handleCompress = async () => {
    if (!originalImage) return;
    setIsCompressing(true);
    // Simulate compression
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCompressedPreview(originalPreview); // In a real app, this would be the compressed image URL
    setIsCompressing(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Image Compressor</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Reduce your image file sizes with our simple and effective tool.
        </p>
      </div>

      <Card className="mt-12 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">Upload Your Image</CardTitle>
        </CardHeader>
        <CardContent>
          {!originalPreview ? (
            <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
                  <UploadCloud className="w-12 h-12" />
                  <p>Drag & drop your image here, or click to select a file</p>
                  <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Original Image</h3>
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <img src={originalPreview} alt="Original" className="object-contain w-full h-full" />
                  </div>
                   <p className="text-sm text-muted-foreground mt-2">Size: {(originalImage!.size / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Compressed Image</h3>
                  <div className="aspect-video relative rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                    {isCompressing ? (
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    ) : compressedPreview ? (
                      <img src={compressedPreview} alt="Compressed" className="object-contain w-full h-full" />
                    ) : (
                      <div className="text-center text-muted-foreground p-4">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                        <p>Your compressed image will appear here.</p>
                      </div>
                    )}
                  </div>
                  {compressedPreview && <p className="text-sm text-muted-foreground mt-2">New Size: {(originalImage!.size / 1024 * (compressionLevel / 150)).toFixed(2)} KB</p>}
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-medium">Compression Quality: {compressionLevel}%</label>
                <Slider defaultValue={[compressionLevel]} max={100} step={1} onValueChange={(value) => setCompressionLevel(value[0])} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleCompress} disabled={isCompressing} className="w-full">
                  {isCompressing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Compress Image
                </Button>
                <Button variant="secondary" onClick={() => {setOriginalImage(null); setOriginalPreview(null); setCompressedPreview(null);}} className="w-full">
                  Upload Another
                </Button>
                <Button variant="outline" disabled={!compressedPreview} className="w-full">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
