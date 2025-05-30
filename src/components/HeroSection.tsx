import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, FileText, Zap, Image, Crop, Palette } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-8 pb-20 md:py-5 md:pb-28 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Optimized background decorations with transform3d for GPU acceleration */}
      <div className="absolute inset-0 -z-10 overflow-hidden will-change-transform">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-coral/20 rounded-full blur-3xl transform-gpu"></div>
      </div>

      <div className="container py-12 mx-auto px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content area - optimized text rendering */}
          <div className="flex-1 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <Badge variant="outline" className="px-3 py-1 mb-6 bg-sky-50 text-sky-600 font-medium border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-700">
              Fast, Secure & Easy to Use
            </Badge>
            
            {/* Optimized heading with better font loading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-14 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-red-400 bg-clip-text text-transparent block">
                All Image Tools You Need
              </span>
              <span className="text-gray-800 dark:text-gray-200 block">In One Place</span>
            </h1>
            
            {/* Split long paragraph into smaller chunks for better rendering */}
            <div className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-400">
              <p className="mb-2">
                Optimize, compress, resize, convert, and enhance your images with our powerful and free online tools.
              </p>
              <p>
                Everything happens in your browser - no data is ever sent to our servers. Your privacy and data security are our top priority.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-700 hover:to-sky-800 text-white font-semibold shadow-lg hover:shadow-sky-500/30 group transition-all duration-200"
                asChild
              >
                <a href="#popular-tools">
                  Get Started 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200"
                asChild
              >
                <a href="/about">
                  Learn More
                </a>
              </Button>
            </div>
            
            {/* Optimized feature grid with better layout and reduced reflows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
              <div className="flex items-center gap-3 min-h-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex-shrink-0">
                  <Zap size={20} />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Lightning Fast</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Process images in seconds</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 min-h-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex-shrink-0">
                  <Shield size={20} />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">100% Secure</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">No servers, no tracking</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 min-h-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Premium Quality</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Preserve image quality</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right floating UI preview - optimized for better rendering */}
          <div className="flex-1 max-w-md relative mt-16 lg:mt-0">
            <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-br from-sky-600/20 to-accent-coral/20 rounded-2xl blur-xl transform-gpu will-change-transform"></div>
            <Card className="relative rounded-2xl overflow-hidden border-gray-200 dark:border-gray-700 shadow-2xl">
              <div className="h-8 flex items-center px-4 gap-2 bg-gray-100 dark:bg-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
                    <div className="mb-3 text-gray-500 dark:text-gray-400">
                      <Image size={48} />
                    </div>
                    <div className="text-center mb-4">
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Image Optimizer</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Process your images effortlessly</p>
                    </div>
                  </div>
                  
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:border-sky-400 dark:hover:border-sky-500 transition-colors duration-200">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0">
                        <Crop size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Resize & Crop</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Perfect dimensions every time</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:border-sky-400 dark:hover:border-sky-500 transition-colors duration-200">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex-shrink-0">
                        <Palette size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Format Convert</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, WebP & more</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
