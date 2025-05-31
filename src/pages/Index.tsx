
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ToolCard } from '../components/ToolCard';
import { Upload, Palette, Crop, Maximize } from 'lucide-react';

const Index = () => {
  const formatTools = [
    {
      title: "WebP Conversion",
      description: "Convert images to WebP format for better compression",
      icon: <Palette className="w-6 h-6" />,
      href: "/format",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "AVIF Conversion", 
      description: "Convert to AVIF for next-gen image optimization",
      icon: <Upload className="w-6 h-6" />,
      href: "/format",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Quality Control",
      description: "Adjust compression levels for optimal file sizes",
      icon: <Palette className="w-6 h-6" />,
      href: "/format",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const resizeTools = [
    {
      title: "Preset Dimensions",
      description: "Quick resize with common aspect ratios",
      icon: <Maximize className="w-6 h-6" />,
      href: "/resize",
      gradient: "from-sky-500 to-blue-500"
    },
    {
      title: "Custom Sizing",
      description: "Set exact width and height dimensions",
      icon: <Maximize className="w-6 h-6" />,
      href: "/resize",
      gradient: "from-sky-500 to-blue-500"
    },
    {
      title: "Aspect Ratio Lock",
      description: "Maintain proportions while resizing",
      icon: <Maximize className="w-6 h-6" />,
      href: "/resize",
      gradient: "from-sky-500 to-blue-500"
    }
  ];

  const cropTools = [
    {
      title: "Free Crop",
      description: "Crop images with complete freedom",
      icon: <Crop className="w-6 h-6" />,
      href: "/crop",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Aspect Ratio Crop",
      description: "Crop with preset aspect ratios",
      icon: <Crop className="w-6 h-6" />,
      href: "/crop",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Interactive Selection",
      description: "Visual crop selection interface",
      icon: <Crop className="w-6 h-6" />,
      href: "/crop",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/20 text-primary font-medium">
              🚀 Privacy-First Image Processing
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Optimize Your Images with{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Complete Privacy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Convert, resize, and crop images directly in your browser. No uploads, no servers, just powerful tools that respect your privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/format">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  Start Optimizing
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Format Tools Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-2 border-purple-500 text-purple-600 font-medium">
              Format Conversion
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Format Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your images to modern formats with optimized compression
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              Image Resizing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resize Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resize images with precision while maintaining perfect quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              Image Cropping
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Crop Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crop images with interactive selection and precise control
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
