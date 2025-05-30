import React, { useState, useCallback } from 'react';
import HeroSection from '../components/HeroSection';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { OptimizationControls } from '../components/OptimizationControls';
import { ProcessedImage } from '../types/image';

const Index = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleImageUpload = useCallback((file: File) => { setOriginalImage(file); setProcessedImage(null); }, []);
  const handleImageProcessed = useCallback((processed: ProcessedImage) => { setProcessedImage(processed); setIsProcessing(false); }, []);
  const handleProcessingStart = useCallback(() => setIsProcessing(true), []);

  const features = [
    { title: 'Smart Resize', desc: 'Resize images with preset dimensions or custom sizes while maintaining perfect aspect ratio and quality.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', colors: 'from-sky-500 to-blue-600', bgColors: 'from-sky-100 to-blue-100 dark:from-sky-900/50 dark:to-blue-900/50', iconColor: 'text-sky-600 dark:text-sky-400', accentColor: 'from-sky-400 to-blue-500', badges: [{ text: 'Aspect Ratio', color: 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' }, { text: 'Presets', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' }] },
    { title: 'Format Convert', desc: 'Convert to modern formats like WebP and AVIF with optimized compression settings for better performance.', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z', colors: 'from-purple-500 to-pink-600', bgColors: 'from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50', iconColor: 'text-purple-600 dark:text-purple-400', accentColor: 'from-purple-400 to-pink-500', badges: [{ text: 'WebP', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' }, { text: 'AVIF', color: 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' }] },
    { title: 'Lightning Fast', desc: 'Process images instantly in your browser with real-time previews and comparisons. No waiting required.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', colors: 'from-green-500 to-emerald-600', bgColors: 'from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50', iconColor: 'text-green-600 dark:text-green-400', accentColor: 'from-green-400 to-emerald-500', badges: [{ text: 'Real-time', color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' }, { text: 'Browser-based', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' }] }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden will-change-transform">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-400/10 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute top-3/4 left-1/6 w-64 h-64 bg-purple-500/8 rounded-full blur-2xl transform-gpu"></div>
      </div>
      <HeroSection />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {!originalImage ? (
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-red-400 bg-clip-text text-transparent">Start Optimizing</span>
                  <span className="text-gray-800 dark:text-gray-200 block">Your Images</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Upload an image to begin optimizing with our powerful tools</p>
              </div>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <ImagePreview originalImage={originalImage} processedImage={processedImage} isProcessing={isProcessing} />
              </div>
              <div className="space-y-6">
                <OptimizationControls originalImage={originalImage} onImageProcessed={handleImageProcessed} onProcessingStart={handleProcessingStart} onReset={() => { setOriginalImage(null); setProcessedImage(null); }} />
              </div>
            </div>
          )}
        </div>
        {!originalImage && (
          <div className="mt-20 sm:mt-24">
            <div className="text-center mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">Powerful Features</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to optimize your images, all in one place</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-2">
              {features.map((feature, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.colors} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-0.5">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="relative">
                        <div className={`w-11 h-11 bg-gradient-to-br ${feature.bgColors} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                          <svg className={`w-6 h-6 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                          </svg>
                        </div>
                        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r ${feature.accentColor} rounded-full opacity-80`}></div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{feature.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {feature.badges.map((badge, badgeIndex) => (
                          <span key={badgeIndex} className={`px-2 py-0.5 ${badge.color} rounded-full text-[11px] font-medium`}>{badge.text}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;