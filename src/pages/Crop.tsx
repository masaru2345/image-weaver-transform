
import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { CropControls } from '../components/CropControls';
import { ProcessedImage, CropOptions } from '../types/image';
import { optimizeImage } from '../utils/imageOptimizer';

const Crop = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cropOptions, setCropOptions] = useState<CropOptions | undefined>(undefined);
  const [enableCrop, setEnableCrop] = useState(true);

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
        crop: cropOptions
      };

      const result = await optimizeImage(originalImage, settings);
      setProcessedImage(result);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 bg-clip-text text-transparent">Image Cropper</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Crop your images to focus on what matters most with precise control
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
                <CropControls
                  originalImage={originalImage}
                  cropOptions={cropOptions}
                  enableCrop={enableCrop}
                  onEnableCropChange={setEnableCrop}
                  onCropOptionsChange={setCropOptions}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleProcessImage}
                    disabled={isProcessing || !originalImage || !cropOptions}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isProcessing ? 'Processing...' : 'Crop Image'}
                  </button>
                  <button
                    onClick={() => {
                      setOriginalImage(null);
                      setProcessedImage(null);
                      setCropOptions(undefined);
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

export default Crop;
