import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CropOptions } from '../types/image';

interface CropControlsProps {
  originalImage: File;
  cropOptions: CropOptions | undefined;
  enableCrop: boolean;
  onEnableCropChange: (enabled: boolean) => void;
  onCropOptionsChange: (options: CropOptions) => void;
}

export const CropControls: React.FC<CropControlsProps> = ({
  originalImage,
  cropOptions,
  enableCrop,
  onEnableCropChange,
  onCropOptionsChange
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Enable crop by default when component mounts
  useEffect(() => {
    onEnableCropChange(true);
  }, [onEnableCropChange]);

  useEffect(() => {
    const url = URL.createObjectURL(originalImage);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [originalImage]);

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Set canvas size to fill container while maintaining aspect ratio
        const containerWidth = canvas.parentElement?.clientWidth || 400;
        const maxWidth = Math.min(containerWidth - 32, 600); // Account for padding
        const aspectRatio = img.height / img.width;
        const canvasWidth = Math.min(maxWidth, img.width);
        const canvasHeight = canvasWidth * aspectRatio;
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        setImageDimensions({ width: img.width, height: img.height });
        
        if (ctx) {
          // Clear and draw image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Draw crop overlay if crop options exist
          if (cropOptions) {
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            
            // Semi-transparent overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Clear the crop area
            ctx.clearRect(
              cropOptions.x * scaleX,
              cropOptions.y * scaleY,
              cropOptions.width * scaleX,
              cropOptions.height * scaleY
            );
            
            // Redraw the image in the crop area
            ctx.drawImage(
              img,
              cropOptions.x, cropOptions.y, cropOptions.width, cropOptions.height,
              cropOptions.x * scaleX, cropOptions.y * scaleY, 
              cropOptions.width * scaleX, cropOptions.height * scaleY
            );
            
            // Draw crop border
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.strokeRect(
              cropOptions.x * scaleX,
              cropOptions.y * scaleY,
              cropOptions.width * scaleX,
              cropOptions.height * scaleY
            );
          }
        }
      };
      
      img.src = imageUrl;
    }
  }, [imageUrl, cropOptions, onEnableCropChange]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = Math.abs(x - dragStart.x);
    const height = Math.abs(y - dragStart.y);
    const cropX = Math.min(dragStart.x, x);
    const cropY = Math.min(dragStart.y, y);
    
    // Convert canvas coordinates to image coordinates
    const scaleX = imageDimensions.width / canvas.width;
    const scaleY = imageDimensions.height / canvas.height;
    
    onCropOptionsChange({
      x: Math.max(0, cropX * scaleX),
      y: Math.max(0, cropY * scaleY),
      width: Math.min(width * scaleX, imageDimensions.width - cropX * scaleX),
      height: Math.min(height * scaleY, imageDimensions.height - cropY * scaleY)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
        
        <CardContent className="space-y-4 p-4 sm:p-5">
          {/* Canvas Preview */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select crop area by dragging on the image
            </Label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg cursor-crosshair w-full max-w-full hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors duration-300 min-h-[120px]"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
              </div>
            </div>
          </div>
          
          {/* Crop Parameters */}
          {cropOptions && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Crop Parameters
              </Label>
              <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-600 dark:text-gray-400">X Position</Label>
                    <Input
                      type="number"
                      value={Math.round(cropOptions.x)}
                      onChange={(e) => onCropOptionsChange({
                        ...cropOptions,
                        x: Math.max(0, parseInt(e.target.value) || 0)
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-500 focus:border-emerald-400 dark:focus:border-emerald-400 transition-colors duration-300 text-gray-900 dark:text-white text-xs py-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-600 dark:text-gray-400">Y Position</Label>
                    <Input
                      type="number"
                      value={Math.round(cropOptions.y)}
                      onChange={(e) => onCropOptionsChange({
                        ...cropOptions,
                        y: Math.max(0, parseInt(e.target.value) || 0)
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-300 dark:hover:border-green-500 focus:border-green-400 dark:focus:border-green-400 transition-colors duration-300 text-gray-900 dark:text-white text-xs py-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-600 dark:text-gray-400">Width</Label>
                    <Input
                      type="number"
                      value={Math.round(cropOptions.width)}
                      onChange={(e) => onCropOptionsChange({
                        ...cropOptions,
                        width: Math.max(1, parseInt(e.target.value) || 1)
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg hover:border-teal-300 dark:hover:border-teal-500 focus:border-teal-400 dark:focus:border-teal-400 transition-colors duration-300 text-gray-900 dark:text-white text-xs py-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-600 dark:text-gray-400">Height</Label>
                    <Input
                      type="number"
                      value={Math.round(cropOptions.height)}
                      onChange={(e) => onCropOptionsChange({
                        ...cropOptions,
                        height: Math.max(1, parseInt(e.target.value) || 1)
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-500 focus:border-emerald-400 dark:focus:border-emerald-400 transition-colors duration-300 text-gray-900 dark:text-white text-xs py-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-start">
              <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click and drag on the image to select the area you want to crop. You can also manually adjust the position and size using the input fields below.
            </p>
          </div>
        </CardContent>
    </div>
  );
};