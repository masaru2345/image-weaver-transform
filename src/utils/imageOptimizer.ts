
import { ProcessedImage, OptimizationSettings } from '../types/image';

export const optimizeImage = async (
  file: File,
  settings: OptimizationSettings
): Promise<ProcessedImage> => {
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

        // Calculate dimensions
        let { width, height } = img;
        
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

        // Set canvas dimensions
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to blob
        const quality = settings.conversion.quality / 100;
        
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
              compressionRatio
            });
          },
          `image/${settings.conversion.format}`,
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
