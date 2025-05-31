
import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { ResizeControls } from '../components/ResizeControls';
import { ProcessedImage, ResizeOptions } from '../types/image';
import { optimizeImage } from '../utils/imageOptimizer';

const Resize = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions | undefined>(undefined);
  const [enableResize, setEnableResize] = useState(false);
  const [customDimensions, setCustomDimensions] = useState({ width: '', height: '' });

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setProcessedImage(null);
  }, []);

  const handleProcessImage = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      const settings = {
        conversion: { format: 'jpeg' as const, quality: 90 },
        resize: enableResize ? resizeOptions : undefined
      };

      const result = await optimizeImage(originalImage, settings);
      setProcessedImage(result);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomDimensionChange = (dimension: 'width' | 'height', value: string) => {
    setCustomDimensions(prev => ({ ...prev, [dimension]: value }));
    
    if (value && dimension === 'width') {
      setResizeOptions({
        width: parseInt(value),
        height: customDimensions.height ? parseInt(customDimensions.height) : undefined,
        maintainAspectRatio: resizeOptions?.maintainAspectRatio || false
      });
    } else if (value && dimension === 'height') {
      setResizeOptions({
        width: customDimensions.width ? parseInt(customDimensions.width) : undefined,
        height: parseInt(value),
        maintainAspectRatio: resizeOptions?.maintainAspectRatio || false
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-400 bg-clip-text text-transparent">Image Resizer</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Resize images with preset dimensions or custom sizes while maintaining perfect aspect ratio
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
                <ResizeControls
                  resizeOptions={resizeOptions}
                  enableResize={enableResize}
                  customDimensions={customDimensions}
                  onEnableResizeChange={setEnableResize}
                  onResizeOptionsChange={setResizeOptions}
                  onCustomDimensionChange={handleCustomDimensionChange}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleProcessImage}
                    disabled={isProcessing || !originalImage}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isProcessing ? 'Processing...' : 'Resize Image'}
                  </button>
                  <button
                    onClick={() => {
                      setOriginalImage(null);
                      setProcessedImage(null);
                      setResizeOptions(undefined);
                      setEnableResize(false);
                      setCustomDimensions({ width: '', height: '' });
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resize;
