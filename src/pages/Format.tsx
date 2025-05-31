import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { FormatControls } from '../components/FormatControls';
import { ProcessedImage } from '../types/image';

const Format = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setProcessedImage(null);
  }, []);

  const handleImageProcessed = useCallback((processed: ProcessedImage) => {
    setProcessedImage(processed);
    setIsProcessing(false);
  }, []);

  const handleProcessingStart = useCallback(() => setIsProcessing(true), []);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">Convert</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Convert your images to modern formats like WebP and AVIF with optimized compression
            </p>
          </div>

          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <ImagePreview 
                  originalImage={originalImage} 
                  processedImage={processedImage} 
                  isProcessing={isProcessing} 
                />
              </div>
              <div className="space-y-6">
                <FormatControls
                  originalImage={originalImage}
                  onImageProcessed={handleImageProcessed}
                  onProcessingStart={handleProcessingStart}
                  onReset={() => {
                    setOriginalImage(null);
                    setProcessedImage(null);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Format;
