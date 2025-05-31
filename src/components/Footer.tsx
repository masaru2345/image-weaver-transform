import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Image, Github, Twitter, Mail, Linkedin, X } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary/60 to-background py-16 px-4 md:px-10 border-t border-border/30">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1 flex flex-col justify-between h-full">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
              <Image className="h-7 w-7 text-primary-600" /><span>Go IMG</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">The complete image optimization solution for all your needs. Convert, resize, crop, and more with our intuitive tools.</p>
          </div>
          <div className="flex gap-4 mt-4">
            {[
              { href: "https://twitter.com/flux8labs", icon: <Twitter size={20} />, label: "Twitter" },
              { href: "https://github.com/flux8labs", icon: <Github size={20} />, label: "GitHub" },
              { href: "mailto:hello@flux8labs.com", icon: <Mail size={20} />, label: "Email" },
              { href: "https://linkedin.com/company/flux8labs", icon: <Linkedin size={20} />, label: "LinkedIn" }
            ].map((link, i) => (
              <a key={i} href={link.href} aria-label={link.label} className="text-muted-foreground hover:text-primary-600 transition-colors" target="_blank" rel="noopener noreferrer">{link.icon}</a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Image Tools",
            links: [
              { to: "/format", text: "Format Converter" },
              { to: "/resize", text: "Image Resizer" },
              { to: "/crop", text: "Image Cropper" }
            ]
          },
          {
            title: "Company",
            links: [
              { to: "/about", text: "About Us" },
              { to: "/privacy", text: "Privacy Policy" },
              { to: "/terms", text: "Terms of Service" },
              { to: "/contact", text: "Contact Us" }
            ]
          }
        ].map((section, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg mb-4 tracking-wide">{section.title}</h3>
            <ul className="space-y-3 text-sm">
              {section.links.map((link, j) => (
                <li key={j}><Link to={link.to} className="footer-link">{link.text}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <FooterNewsletter />
      </div>

      <div className="container mt-12 pt-8 border-t border-border/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} <span className="font-semibold text-primary-600">Go IMG</span>. All rights reserved.</p>
          <span className="hidden md:inline-block w-px h-5 bg-border mx-2"></span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 md:mt-0">
            <span>Made with</span><span className="text-red-500 animate-pulse">❤️</span><span>by</span>
            <a href="https://flux8labs.com" target="_blank" rel="noopener noreferrer" className="ml-1 font-medium text-primary-600 hover:underline hover:text-primary-700 transition-colors">Flux8labs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletter() {
  const [showNotification, setShowNotification] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="bg-secondary/60 rounded-xl px-4 py-4 shadow-sm flex flex-col gap-3 max-w-xs mx-auto md:mx-0 relative">
      <h3 className="font-semibold text-lg mb-1 tracking-wide">Stay Updated</h3>
      <p className="text-xs text-muted-foreground mb-2">Get the latest image optimization tips, updates, and offers. No spam.</p>
      <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); setShowNotification(true); setEmail(""); }} autoComplete="off">
        <input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
               className="rounded-md px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
        <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white rounded-md px-3 py-2 text-sm font-medium transition">Subscribe</button>
      </form>

      {showNotification && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-green-100 border border-green-200 text-green-800 rounded-lg px-4 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center"><span className="font-medium">Thank you for subscribing!</span></div>
          <button onClick={() => setShowNotification(false)} className="text-green-600 hover:text-green-800"><X size={16} /></button>
        </div>
      )}
    </div>
  );
}
