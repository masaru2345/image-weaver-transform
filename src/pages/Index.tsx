
import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { ToolCard } from "../components/ToolCard";
import { Badge } from "@/components/ui/badge";
import { FileImage, Crop, Maximize } from "lucide-react";

const Index = () => {
  const imageTools = [
    {
      title: "Format Converter",
      description: "Convert images to WebP format for better compression and web performance",
      icon: <FileImage className="w-6 h-6" />,
      href: "/format",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Smart Resize",
      description: "Resize images while maintaining aspect ratio and quality",
      icon: <Maximize className="w-6 h-6" />,
      href: "/resize", 
      gradient: "from-blue-500 to-cyan-600"
    },
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
      
      {/* Image Tools Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-2 border-primary-500 text-primary-600 font-medium">
              Image Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Image Processing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert, resize, and crop your images with professional-grade tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {imageTools.map((tool, index) => (
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
