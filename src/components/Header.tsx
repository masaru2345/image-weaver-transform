
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Image, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { path: '/', label: 'Optimizer' },
    { path: '/about', label: 'About' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 shadow-sm supports-[backdrop-filter]:bg-background/80'
          : 'bg-background/60 supports-[backdrop-filter]:bg-background/40'
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
           <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
            <div className="transition-transform group-hover:scale-110 group-hover:rotate-12">
              <Image className="h-6 w-6 text-primary-600 group-hover:text-primary-500 transition-colors" />
            </div>
            <span className="group-hover:text-primary-600 transition-colors">Go IMG</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium transition-colors group ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-muted-foreground hover:text-blue-600'
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col p-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-sm font-medium transition-colors border-l-2 border-transparent hover:border-blue-600 pl-2 py-1 ${
                  location.pathname === item.path
                    ? 'text-blue-600 border-blue-600'
                    : 'text-muted-foreground hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
