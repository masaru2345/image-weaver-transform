import React from 'react';
import HeroSection from '../components/HeroSection';
import { ToolCard } from '../components/ToolCard';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const formatTools = [
    {
      title: 'WebP Converter',
      description: 'Convert images to WebP format for better compression and quality.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      href: '/format',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'AVIF Converter',
      description: 'Convert to AVIF format for next-generation compression.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      href: '/format',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'JPEG Optimizer',
      description: 'Optimize JPEG images with quality control and compression.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      href: '/format',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'PNG to WebP',
      description: 'Convert PNG files to WebP for smaller file sizes.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      href: '/format',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const resizeTools = [
    {
      title: 'Instagram Square',
      description: 'Resize images to perfect Instagram square dimensions (1080x1080).',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      href: '/resize',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Custom Resize',
      description: 'Resize images to any custom dimensions with aspect ratio control.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      href: '/resize',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Social Media',
      description: 'Perfect dimensions for Facebook, Twitter, and LinkedIn.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      href: '/resize',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Batch Resize',
      description: 'Resize multiple images at once with consistent settings.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      href: '/resize',
      gradient: 'from-sky-500 to-blue-600'
    }
  ];

  const cropTools = [
    {
      title: 'Smart Crop',
      description: 'Automatically detect and crop the most important parts of your image.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4h4m14-4v4h-4M3 17v-4h4m14 4v-4h-4" /></svg>,
      href: '/crop',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Manual Crop',
      description: 'Precisely crop your images with manual selection tools.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4h4m14-4v4h-4M3 17v-4h4m14 4v-4h-4" /></svg>,
      href: '/crop',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Aspect Ratio',
      description: 'Crop to specific aspect ratios like 16:9, 4:3, or 1:1.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4h4m14-4v4h-4M3 17v-4h4m14 4v-4h-4" /></svg>,
      href: '/crop',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Face Detection',
      description: 'Automatically crop around detected faces in your photos.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4h4m14-4v4h-4M3 17v-4h4m14 4v-4h-4" /></svg>,
      href: '/crop',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

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

      {/* Format Tools Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-2 border-purple-500 text-purple-600 font-medium">
              Format Converter
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Convert & Optimize</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your images to modern formats with optimized compression settings
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {formatTools.map((tool, index) => (
              <ToolCard key={index} {...tool} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Resize Tools Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-2 border-sky-500 text-sky-600 font-medium">
              Resize Tool
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Resize</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resize images with preset dimensions or custom sizes while maintaining perfect quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resizeTools.map((tool, index) => (
              <ToolCard key={index} {...tool} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Crop Tools Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-2 border-green-500 text-green-600 font-medium">
              Crop Tool
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Precise Cropping</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crop your images to focus on what matters most with intelligent tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cropTools.map((tool, index) => (
              <ToolCard key={index} {...tool} compact={true} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
