
import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { OptimizationControls } from '../components/OptimizationControls';
import { ProcessedImage } from '../types/image';

const Index = () => {
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

  const handleProcessingStart = useCallback(() => {
    setIsProcessing(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Image Optimizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resize and convert your images to WebP or AVIF with advanced compression. 
            Reduce file sizes while maintaining quality.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Image Preview */}
              <div className="space-y-6">
                <ImagePreview
                  originalImage={originalImage}
                  processedImage={processedImage}
                  isProcessing={isProcessing}
                />
              </div>

              {/* Right Column - Controls */}
              <div className="space-y-6">
                <OptimizationControls
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

        {/* Features Section */}
        {!originalImage && (
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Resize</h3>
              <p className="text-gray-600">Resize images with preset dimensions or custom sizes while maintaining aspect ratio.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Format Convert</h3>
              <p className="text-gray-600">Convert to modern formats like WebP and AVIF with optimized compression settings.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process images instantly in your browser with real-time previews and comparisons.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
