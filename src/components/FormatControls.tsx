
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ConversionOptions, ProcessedImage } from '../types/image';
import { optimizeImage } from '../utils/imageOptimizer';

interface FormatControlsProps {
  originalImage: File | null;
  onImageProcessed: (processed: ProcessedImage) => void;
  onProcessingStart: () => void;
  onReset: () => void;
}

export const FormatControls: React.FC<FormatControlsProps> = ({
  originalImage,
  onImageProcessed,
  onProcessingStart,
  onReset
}) => {
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    format: 'webp',
    quality: 80
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessImage = async () => {
    if (!originalImage) return;

    onProcessingStart();
    setIsProcessing(true);
    
    try {
      const settings = {
        conversion: conversionOptions
      };

      const result = await optimizeImage(originalImage, settings);
      onImageProcessed(result);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getQualityConfig = () => {
    switch (conversionOptions.format) {
      case 'avif':
        return { min: 15, max: 95, step: 5, label: 'Quality (AVIF)' };
      case 'webp':
        return { min: 10, max: 100, step: 5, label: 'Quality (WebP)' };
      case 'jpeg':
        return { min: 10, max: 100, step: 5, label: 'Quality (JPEG)' };
      case 'png':
        return { min: 10, max: 100, step: 10, label: 'Compression (PNG)' };
      default:
        return { min: 10, max: 100, step: 5, label: 'Quality' };
    }
  };

  const qualityConfig = getQualityConfig();

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div className="space-y-2">
        <Label htmlFor="format" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Output Format
        </Label>
        <Select
          value={conversionOptions.format}
          onValueChange={(value: 'webp' | 'avif' | 'jpeg' | 'png') =>
            setConversionOptions({ ...conversionOptions, format: value })
          }
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-500 focus:border-purple-400 dark:focus:border-purple-400 transition-colors duration-300 text-gray-900 dark:text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg">
            <SelectItem value="webp" className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                WebP (Recommended)
              </div>
            </SelectItem>
            <SelectItem value="avif" className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                AVIF (Best Compression)
              </div>
            </SelectItem>
            <SelectItem value="jpeg" className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                JPEG
              </div>
            </SelectItem>
            <SelectItem value="png" className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                PNG
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quality Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {qualityConfig.label}
          </Label>
          <span className="text-sm font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded min-w-[3rem] text-center border border-gray-200 dark:border-gray-600">
            {conversionOptions.quality}%
          </span>
        </div>
        
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
          <Slider
            value={[conversionOptions.quality]}
            onValueChange={([value]) =>
              setConversionOptions({ ...conversionOptions, quality: value })
            }
            max={qualityConfig.max}
            min={qualityConfig.min}
            step={qualityConfig.step}
            className="w-full"
          />
          
          {/* Quality indicators */}
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
              Lower Quality
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              Higher Quality
            </span>
          </div>
        </div>

        {/* Format-specific help text */}
        <div className="p-2 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
          {conversionOptions.format === 'avif' && (
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start">
              <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AVIF offers the best compression ratio but may have limited browser support
            </p>
          )}
          {conversionOptions.format === 'webp' && (
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start">
              <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              WebP provides excellent compression with wide browser support
            </p>
          )}
          {conversionOptions.format === 'jpeg' && (
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start">
              <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              JPEG is ideal for photos with universal browser support
            </p>
          )}
          {conversionOptions.format === 'png' && (
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start">
              <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              PNG preserves transparency and is perfect for graphics with sharp edges
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleProcessImage}
          disabled={isProcessing || !originalImage}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isProcessing ? 'Converting...' : 'Convert Image'}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
