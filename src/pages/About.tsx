import React from 'react';
import { Image, Shield, Zap, FileImage } from 'lucide-react';

const About = () => {
  const cardBase = "bg-card rounded-xl shadow-lg p-8 border border-border";
  const hoverCard = `${cardBase} hover:shadow-xl transition-all hover:-translate-y-2`;
  const textBase = "text-foreground";
  const textMuted = "text-muted-foreground";
  const underline = "absolute -bottom-3 w-16 h-1 bg-sky-600";
  
  const hoverScale = {
    onMouseEnter: e => (e.currentTarget.style.transform = 'scale(1.02)'),
    onMouseLeave: e => (e.currentTarget.style.transform = 'scale(1)')
  };
  
  const SectionTitle = ({ children, center = false }) => (
    <h2 className={`text-3xl md:text-4xl font-bold mb-6 relative ${center ? "text-center" : ""}`}>
      {center ? (
        <span className="relative">
          {children}
          <span className={`${underline} left-1/2 transform -translate-x-1/2`}></span>
        </span>
      ) : (
        <>
          {children}
          <span className={`${underline} left-0`}></span>
        </>
      )}
    </h2>
  );

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className={hoverCard} {...hoverScale}>
      <div className="h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6 mx-auto">
        <Icon className="h-8 w-8 text-sky-600" />
      </div>
      <h3 className="font-bold text-xl mb-4 text-center">{title}</h3>
      <p className={`${textMuted} text-center`}>{description}</p>
    </div>
  );

  const GradientBox = ({ icon: Icon, title, children }) => (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl blur-xl opacity-30"></div>
      <div className="relative bg-card rounded-xl overflow-hidden shadow-xl p-8 text-center">
        <Icon className="h-24 w-24 text-sky-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );

  const features = [
    { icon: FileImage, title: "Format Conversion", description: "Convert images to modern WebP and AVIF formats for better compression and performance." },
    { icon: Zap, title: "Real-time Processing", description: "Instant compression with real-time feedback on file size reduction and quality." },
    { icon: Shield, title: "Complete Privacy", description: "All processing happens locally in your browser - your images never leave your device." }
  ];

  const featureList = [
    "Convert images to WebP and AVIF formats",
    "Resize images with preset dimensions or custom sizes", 
    "Crop images with interactive selection",
    "Real-time compression ratio feedback",
    "Complete client-side processing for privacy",
    "Support for multiple image formats"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-b from-sky-50 to-background dark:from-sky-900/20 dark:to-background py-20">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Image Optimizer</h1>
          <p className={`${textMuted} mb-10 max-w-3xl mx-auto text-lg`}>
            A powerful, browser-based tool that helps you compress, resize, and convert images to modern formats with complete privacy and security.
          </p>
          <div className="w-16 h-1 bg-sky-600 rounded-full mx-auto"></div>
        </div>
      </div>

      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* What is Image Optimizer */}
          <div className="mb-24 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <SectionTitle>What is Image Optimizer?</SectionTitle>
              <div className={`${cardBase} hover:shadow-xl transition-shadow relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-sky-100 dark:bg-sky-900/20 rounded-full opacity-50"></div>
                <div className="relative">
                  <p className={`mb-4 ${textBase}`}>Image Optimizer is a powerful, browser-based tool that helps you compress, resize, and convert images to modern formats like WebP and AVIF.</p>
                  <p className={`mb-4 ${textBase}`}>Process your images instantly without uploading them to any server, ensuring complete privacy and security.</p>
                  <p className={textBase}>Perfect for web developers, designers, and anyone who needs to optimize images for better performance and smaller file sizes.</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <GradientBox icon={Image} title="Our Mission">
                <p className={textMuted}>Making image optimization accessible, fast, and private for everyone.</p>
              </GradientBox>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-24">
            <SectionTitle center>Key Features</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Detailed Features */}
          <div className="mb-24 flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/3">
              <div className={`${cardBase} p-6`}>
                <h4 className="font-bold text-lg mb-4">All Features</h4>
                <ul className={`space-y-3 ${textMuted}`}>
                  {featureList.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <SectionTitle>Privacy & Security</SectionTitle>
              <div className={cardBase}>
                <p className={`mb-6 ${textBase}`}>All image processing happens locally in your browser. Your images are never uploaded to our servers or any third-party services. This ensures complete privacy and security of your content.</p>
                <p className={`mb-6 ${textBase}`}>We believe in putting users first, which means your data stays with you. No tracking, no storage, no compromise on privacy.</p>
                <div className="flex items-center p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                  <Shield className="h-6 w-6 text-sky-600 mr-3 flex-shrink-0" />
                  <p className="text-sky-700 dark:text-sky-300 font-medium">100% client-side processing - your images never leave your device</p>
                </div>
              </div>
            </div>
          </div>

          {/* License */}
          <div className="mb-16">
            <SectionTitle>Third-party Open Source Licenses</SectionTitle>
            <div className={cardBase}>
              <h4 className="font-semibold mb-3 text-lg">Squoosh</h4>
              <p className={`${textBase} mb-3`}>
                This application uses components from the Squoosh project (
                <a href="https://github.com/GoogleChromeLabs/squoosh" className="text-sky-600 hover:text-sky-700 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                  https://github.com/GoogleChromeLabs/squoosh
                </a>
                ), licensed under the Apache License 2.0.
              </p>
              <div className="bg-muted rounded-lg p-4 text-sm">
                <p className={`${textMuted} mb-2`}>Copyright 2024 Google LLC</p>
                <p className={`${textMuted} mb-2`}>Licensed under the Apache License, Version 2.0 (the "License").</p>
                <p className={textMuted}>
                  You may obtain a copy of the License at{' '}
                  <a href="http://www.apache.org/licenses/LICENSE-2.0" className="text-sky-600 hover:text-sky-700 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                    http://www.apache.org/licenses/LICENSE-2.0
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Images?</h2>
            <p className="text-white/90 mb-8 text-lg">Start compressing and converting your images with complete privacy and security.</p>
            <a href="/" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-sky-600 rounded-lg transition-colors font-medium shadow-md">
              Get Started
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;