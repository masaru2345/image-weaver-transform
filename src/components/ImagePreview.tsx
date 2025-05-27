
import React, { useState, useEffect } from 'react';
import { ProcessedImage } from '../types/image';

interface ImagePreviewProps {
  originalImage: File;
  processedImage: ProcessedImage | null;
  isProcessing: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  processedImage,
  isProcessing
}) => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const url = URL.createObjectURL(originalImage);
    setOriginalUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [originalImage]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Image Display */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Preview</h3>
            {processedImage && (
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                {showComparison ? 'Show Result' : 'Compare'}
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          {showComparison && processedImage ? (
            <div className="grid grid-cols-2 gap-1">
              <div className="relative group">
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full h-64 object-contain bg-gray-50"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  Original
                </div>
              </div>
              <div className="relative group">
                <img
                  src={processedImage.url}
                  alt="Optimized"
                  className="w-full h-64 object-contain bg-gray-50"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  Optimized
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={processedImage ? processedImage.url : originalUrl}
                alt={processedImage ? "Optimized" : "Original"}
                className="w-full h-64 object-contain bg-gray-50"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Processing...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* File Information */}
      <div className="grid grid-cols-2 gap-4">
        {/* Original Info */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3">Original</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{formatFileSize(originalImage.size)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Format:</span>
              <span className="font-medium uppercase">{originalImage.type.split('/')[1]}</span>
            </div>
          </div>
        </div>

        {/* Optimized Info */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-3">Optimized</h4>
          {processedImage ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{formatFileSize(processedImage.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Format:</span>
                <span className="font-medium uppercase">{processedImage.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reduction:</span>
                <span className="font-medium text-green-600">
                  {(((originalImage.size - processedImage.size) / originalImage.size) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">{processedImage.width}×{processedImage.height}</span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-400">
              Process image to see optimization results
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      {processedImage && (
        <button
          onClick={() => {
            const a = document.createElement('a');
            a.href = processedImage.url;
            a.download = `optimized-${Date.now()}.${processedImage.format}`;
            a.click();
          }}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Optimized Image
        </button>
      )}
    </div>
  );
};
