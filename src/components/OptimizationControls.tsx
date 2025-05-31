
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessedImage, OptimizationSettings } from '../types/image';
import { optimizeImage } from '../utils/imageOptimizer';
import { FormatControls } from './FormatControls';
import { ResizeControls } from './ResizeControls';
import { CropControls } from './CropControls';

interface OptimizationControlsProps {
  originalImage: File;
  onImageProcessed: (image: ProcessedImage) => void;
  onProcessingStart: () => void;
  onReset: () => void;
}

export const OptimizationControls: React.FC<OptimizationControlsProps> = ({
  originalImage,
  onImageProcessed,
  onProcessingStart,
  onReset
}) => {
  const [settings, setSettings] = useState<OptimizationSettings>({
    conversion: {
      format: 'webp',
      quality: 80
    }
  });

  const [enableResize, setEnableResize] = useState(false);
  const [enableCrop, setEnableCrop] = useState(false);
  const [customDimensions, setCustomDimensions] = useState({ width: '', height: '' });
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = useCallback(async () => {
    if (isOptimizing) return;
    
    setIsOptimizing(true);
    onProcessingStart();
    
    try {
      const optimizationSettings: OptimizationSettings = {
        conversion: settings.conversion,
        ...(enableResize && settings.resize && (
          settings.resize.width || settings.resize.height
        ) && { resize: settings.resize }),
        ...(enableCrop && settings.crop && { crop: settings.crop })
      };

      console.log('Optimizing with settings:', optimizationSettings);
      const result = await optimizeImage(originalImage, optimizationSettings);
      onImageProcessed(result);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, [originalImage, settings, enableResize, enableCrop, onImageProcessed, onProcessingStart, isOptimizing]);

  const handleCustomDimensionChange = (dimension: 'width' | 'height', value: string) => {
    setCustomDimensions(prev => ({ ...prev, [dimension]: value }));
    
    const numValue = parseInt(value) || undefined;
    setSettings(prev => ({
      ...prev,
      resize: {
        ...prev.resize,
        [dimension]: numValue,
        maintainAspectRatio: prev.resize?.maintainAspectRatio || false
      }
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Controls Card */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl font-bold flex items-center text-gray-900 dark:text-white">
            <div className="w-8 h-8 mr-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Image Optimization
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-5">
          <Tabs defaultValue="format" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <TabsTrigger 
                value="format" 
                className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-all duration-200"
              >
                Format
              </TabsTrigger>
              <TabsTrigger 
                value="resize" 
                className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-all duration-200"
              >
                Resize
              </TabsTrigger>
              <TabsTrigger 
                value="crop" 
                className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-all duration-200"
              >
                Crop
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="format" className="mt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <FormatControls
                  originalImage={originalImage}
                  onImageProcessed={onImageProcessed}
                  onProcessingStart={onProcessingStart}
                  onReset={onReset}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="resize" className="mt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <ResizeControls
                  resizeOptions={settings.resize}
                  enableResize={enableResize}
                  customDimensions={customDimensions}
                  onEnableResizeChange={setEnableResize}
                  onResizeOptionsChange={(resize) => 
                    setSettings(prev => ({ ...prev, resize }))
                  }
                  onCustomDimensionChange={handleCustomDimensionChange}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="crop" className="mt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <CropControls
                  originalImage={originalImage}
                  cropOptions={settings.crop}
                  enableCrop={enableCrop}
                  onEnableCropChange={setEnableCrop}
                  onCropOptionsChange={(crop) => 
                    setSettings(prev => ({ ...prev, crop }))
                  }
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons Card */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-md">
        <CardContent className="p-4 sm:p-5">
          <div className="space-y-3">
            <Button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-75"
              size="lg"
            >
              {isOptimizing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-sm sm:text-base">Optimizing Image...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm sm:text-base">Optimize Image</span>
                </div>
              )}
            </Button>
            
            <Button 
              onClick={onReset}
              variant="outline"
              className="w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 font-medium rounded-lg py-3 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm sm:text-base">Upload New Image</span>
              </div>
            </Button>
          </div>
          
          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start">
              <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Configure your optimization settings in the tabs above, then click "Optimize Image" to process your image with the selected options.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
