"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileDown, Scissors, Loader2 } from 'lucide-react';

export default function ImageCropperPage() {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setOriginalImage(file);
            setOriginalPreview(URL.createObjectURL(file));
        }
    };
    
    const handleCrop = async () => {
        if (!originalImage) return;
        setIsProcessing(true);
        // Simulate crop
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsProcessing(false);
        // In a real app, you'd show the cropped image or trigger a download
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Image Cropper</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Easily crop your images to the perfect size.
                </p>
            </div>

            <Card className="mt-12 max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline">Upload and Crop</CardTitle>
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
                            <div>
                                <h3 className="font-semibold mb-2">Crop Area</h3>
                                <div className="aspect-video relative rounded-lg overflow-hidden border bg-black flex items-center justify-center">
                                    {/* A real cropper would use a library like react-image-crop here */}
                                    <img src={originalPreview} alt="To be cropped" className="max-w-full max-h-full" />
                                    <div className="absolute inset-1/4 border-2 border-dashed border-white/80 pointer-events-none" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={handleCrop} disabled={isProcessing} className="w-full">
                                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Scissors className="mr-2 h-4 w-4" />}
                                    Crop Image
                                </Button>
                                <Button variant="secondary" onClick={() => {setOriginalImage(null); setOriginalPreview(null);}} className="w-full">
                                    Upload Another
                                </Button>
                                <Button variant="outline" disabled={isProcessing} className="w-full">
                                    <FileDown className="mr-2 h-4 w-4" />
                                    Download Cropped
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
