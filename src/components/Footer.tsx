
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Twitter, Mail, Linkedin } from 'lucide-react';
import { FooterNewsletter } from './FooterNewsletter';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary/60 to-background py-16 px-4 md:px-10 border-t border-border/30">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1 flex flex-col justify-between h-full">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
              <FileText className="h-7 w-7 text-primary-600" />
              <span>Go Img</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Optimize, resize, and convert images with complete privacy. 
              All processing happens in your browser.
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            {[
              { href: "https://twitter.com/flux8labs", icon: <Twitter size={20} />, label: "Twitter" },
              { href: "mailto:connect@flux8labs.com", icon: <Mail size={20} />, label: "Email" },
              { href: "https://linkedin.com/company/flux8labs", icon: <Linkedin size={20} />, label: "LinkedIn" }
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                aria-label={link.label} 
                className="text-muted-foreground hover:text-primary-600 transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Image Tools",
            links: [
              { to: "/", text: "Resize Images" },
              { to: "/", text: "Convert Format" },
              { to: "/", text: "Optimize Quality" },
              { to: "/", text: "Crop Images" }
            ]
          },
          {
            title: "Company",
            links: [
              { to: "/about", text: "About Us" },
              { to: "/privacy", text: "Privacy Policy" },
              { to: "/terms", text: "Terms of Service" },
              { to: "/contact", text: "Contact" }
            ]
          }
        ].map((section, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg mb-4 tracking-wide">{section.title}</h3>
            <ul className="space-y-3 text-sm">
              {section.links.map((link, j) => (
                <li key={j}>
                  <Link to={link.to} className="text-muted-foreground hover:text-primary-600 transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <FooterNewsletter />
      </div>

      <div className="container mt-12 pt-8 border-t border-border/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="font-semibold text-primary-600">Go Img</span>. All rights reserved.
          </p>
          <span className="hidden md:inline-block w-px h-5 bg-border mx-2"></span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 md:mt-0">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>by</span>
            <a 
              href="https://flux8labs.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-1 font-medium text-primary-600 hover:underline hover:text-primary-700 transition-colors"
            >
              Flux8labs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
