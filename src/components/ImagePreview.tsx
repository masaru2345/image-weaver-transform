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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Image Display */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
        
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-600 overflow-hidden hover:scale-[1.01]">
          <div className="p-6 bg-gradient-to-r from-gray-50/80 to-blue-50/30 dark:from-gray-700/50 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Preview</h3>
              </div>
              {processedImage && (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="relative px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {showComparison ? 'Show Result' : 'Compare'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative p-6">
            {showComparison && processedImage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/img">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl blur opacity-20 group-hover/img:opacity-40 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img
                      src={originalUrl}
                      alt="Original"
                    className="w-full h-52 object-contain bg-gray-50 dark:bg-gray-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                      Original
                    </div>
                  </div>
                </div>
                <div className="relative group/img">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-20 group-hover/img:opacity-40 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img
                      src={processedImage.url}
                      alt="Optimized"
                    className="w-full h-52 object-contain bg-gray-50 dark:bg-gray-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                      Optimized
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600">
                  <img
                    src={processedImage ? processedImage.url : originalUrl}
                    alt={processedImage ? "Optimized" : "Original"}
                    className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-700"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="relative mb-4">
                          <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Processing...</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Optimizing your image</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Info */}
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-full flex flex-col rounded-2xl border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300 min-h-[120px]">
            <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-600">
              <div className="w-5 h-5 mr-2 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">Original</h4>
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-gray-50 to-red-50/30 dark:from-gray-700/50 dark:to-red-900/10 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400 text-xs">Size:</span>
                <span className="font-bold text-gray-900 dark:text-white text-xs">{formatFileSize(originalImage.size)}</span>
              </div>
              <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-gray-50 to-red-50/30 dark:from-gray-700/50 dark:to-red-900/10 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400 text-xs">Format:</span>
                <span className="font-bold text-gray-900 dark:text-white uppercase text-xs">{originalImage.type.split('/')[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Info */}
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-full flex flex-col rounded-2xl border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300 min-h-[120px]">
            <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-600">
              <div className="w-5 h-5 mr-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">Optimized</h4>
            </div>
            {processedImage ? (
              <div className="flex-1 p-3 space-y-2">
                <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-gray-50 to-green-50/30 dark:from-gray-700/50 dark:to-green-900/10 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400 text-xs">Size:</span>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">{formatFileSize(processedImage.size)}</span>
                </div>
                <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-gray-50 to-green-50/30 dark:from-gray-700/50 dark:to-green-900/10 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400 text-xs">Format:</span>
                  <span className="font-bold text-gray-900 dark:text-white uppercase text-xs">{processedImage.format}</span>
                </div>
                <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <span className="text-green-700 dark:text-green-300 text-xs">Reduction:</span>
                  <span className="font-bold text-green-600 dark:text-green-400 flex items-center text-xs">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {(((originalImage.size - processedImage.size) / originalImage.size) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-gray-50 to-green-50/30 dark:from-gray-700/50 dark:to-green-900/10 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400 text-xs">Dimensions:</span>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">{processedImage.width}×{processedImage.height}</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-3">
                <div className="text-center">
                  <div className="w-7 h-7 mx-auto mb-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Process to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      {processedImage && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
          <button
            onClick={() => {
              const a = document.createElement('a');
              a.href = processedImage.url;
              a.download = `optimized-${Date.now()}.${processedImage.format}`;
              a.click();
            }}
            className="relative w-full bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white py-3 px-6 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center group hover:scale-[1.01] transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="relative">Download Optimized Image</span>
          </button>
        </div>
      )}
    </div>
  );
};