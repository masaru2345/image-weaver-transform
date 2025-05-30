
import { ProcessedImage, OptimizationSettings } from '../types/image';

// Note: @squoosh/lib has compatibility issues in browser environment
// Using canvas-based optimization as primary method
export const optimizeImage = async (
  file: File,
  settings: OptimizationSettings
): Promise<ProcessedImage> => {
  console.log('Starting image optimization with settings:', settings);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        let { width, height } = img;
        
        // Handle resize settings
        if (settings.resize) {
          const { width: targetWidth, height: targetHeight, maintainAspectRatio } = settings.resize;
          
          if (targetWidth && targetHeight) {
            if (maintainAspectRatio) {
              const aspectRatio = width / height;
              const targetAspectRatio = targetWidth / targetHeight;
              
              if (aspectRatio > targetAspectRatio) {
                width = targetWidth;
                height = targetWidth / aspectRatio;
              } else {
                height = targetHeight;
                width = targetHeight * aspectRatio;
              }
            } else {
              width = targetWidth;
              height = targetHeight;
            }
          } else if (targetWidth) {
            const aspectRatio = img.height / img.width;
            width = targetWidth;
            height = targetWidth * aspectRatio;
          } else if (targetHeight) {
            const aspectRatio = img.width / img.height;
            height = targetHeight;
            width = targetHeight * aspectRatio;
          }
        }

        // Handle crop settings
        if (settings.crop) {
          const { x, y, width: cropWidth, height: cropHeight } = settings.crop;
          width = cropWidth;
          height = cropHeight;
          
          canvas.width = Math.round(width);
          canvas.height = Math.round(height);
          
          // Draw cropped portion
          ctx.drawImage(
            img,
            x, y, cropWidth, cropHeight,
            0, 0, canvas.width, canvas.height
          );
        } else {
          canvas.width = Math.round(width);
          canvas.height = Math.round(height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        // Convert quality to proper range based on format
        let quality = settings.conversion.quality / 100;
        
        // For AVIF simulation, invert the quality (lower number = better quality)
        if (settings.conversion.format === 'avif') {
          quality = 1 - (settings.conversion.quality / 100);
        }
        
        const mimeType = `image/${settings.conversion.format === 'avif' ? 'webp' : settings.conversion.format}`;
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            const url = URL.createObjectURL(blob);
            const compressionRatio = ((file.size - blob.size) / file.size) * 100;

            resolve({
              blob,
              url,
              width: canvas.width,
              height: canvas.height,
              size: blob.size,
              format: settings.conversion.format,
              compressionRatio: Math.max(0, compressionRatio)
            });
          },
          mimeType,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
};
