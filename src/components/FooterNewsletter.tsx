
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const FooterNewsletter = () => {
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
      <p className="text-xs text-muted-foreground mb-2">
        Get the latest image optimization tips, updates, and offers. No spam.
      </p>
      <form 
        className="flex flex-col gap-2" 
        onSubmit={(e) => { 
          e.preventDefault(); 
          setShowNotification(true); 
          setEmail(""); 
        }} 
        autoComplete="off"
      >
        <input 
          type="email" 
          required 
          placeholder="Your email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition" 
        />
        <button 
          type="submit" 
          className="bg-sky-600 hover:bg-sky-700 text-white rounded-md px-3 py-2 text-sm font-medium transition"
        >
          Subscribe
        </button>
      </form>

      {showNotification && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-green-100 border border-green-200 text-green-800 rounded-lg px-4 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">Thank you for subscribing!</span>
          </div>
          <button 
            onClick={() => setShowNotification(false)} 
            className="text-green-600 hover:text-green-800"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
