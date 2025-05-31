
import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { ToolCard } from "../components/ToolCard";
import { Badge } from "@/components/ui/badge";
import { FileImage, Crop, Maximize } from "lucide-react";

const Index = () => {
  const formatTools = [
    {
      title: "WebP Converter",
      description: "Convert images to WebP format for better compression and web performance",
      icon: <FileImage className="w-6 h-6" />,
      href: "/format",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const resizeTools = [
    {
      title: "Smart Resize",
      description: "Resize images while maintaining aspect ratio and quality",
      icon: <Maximize className="w-6 h-6" />,
      href: "/resize", 
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  const cropTools = [
    {
      title: "Precision Crop",
      description: "Crop images with precise control and real-time preview",
      icon: <Crop className="w-6 h-6" />,
      href: "/crop",
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Format Tools Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-2 border-primary-500 text-primary-600 font-medium">
              Format Conversion
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Format Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your images to modern formats like WebP and AVIF for better performance
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
            <Badge variant="outline" className="mb-2 border-primary-500 text-primary-600 font-medium">
              Image Resizing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resize Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resize your images to perfect dimensions while maintaining quality
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
            <Badge variant="outline" className="mb-2 border-primary-500 text-primary-600 font-medium">
              Image Cropping
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Crop Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crop your images with precision to focus on what matters most
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cropTools.map((tool, index) => (
              <ToolCard key={index} {...tool} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/10 to-background">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Go IMG?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our tools are designed with privacy, speed, and ease of use in mind. 
              All processing happens locally in your browser - your images never leave your device.
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
