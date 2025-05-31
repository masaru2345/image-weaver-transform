import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Eye, FileCheck, UserCheck, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const cardBase = "bg-card rounded-xl shadow-lg p-8 border border-border";
  const hoverCard = `${cardBase} hover:shadow-xl transition-all hover:-translate-y-2`;
  const iconBg = "h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6";
  const sectionTitle = "text-3xl md:text-4xl font-bold mb-12 relative";
  const underline = "absolute -bottom-3 left-0 w-16 h-1 bg-sky-600";
  
  const hoverScale = {
    onMouseEnter: e => (e.currentTarget.style.transform = 'scale(1.02)'),
    onMouseLeave: e => (e.currentTarget.style.transform = 'scale(1)')
  };

  const IconCard = ({ icon: Icon, title, children, hover = false }) => (
    <div className={hover ? hoverCard : cardBase} {...(hover ? hoverScale : {})}>
      <div className={iconBg}>
        <Icon className="h-8 w-8 text-sky-600" />
      </div>
      <h3 className="font-bold text-xl mb-4">{title}</h3>
      {children}
    </div>
  );

  const GradientBox = ({ icon: Icon, title, children }) => (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl blur-lg opacity-30"></div>
      <div className="relative bg-card rounded-xl overflow-hidden shadow-xl p-8 flex flex-col items-center">
        <Icon className="h-16 w-16 text-sky-600 mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-b from-sky-50 to-background dark:from-sky-900/20 dark:to-background py-16">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4 max-w-3xl mx-auto text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="w-16 h-1 bg-sky-600 rounded-full mx-auto"></div>
        </div>
      </div>

      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Introduction */}
          <div className="mb-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/3">
              <div className={`${cardBase} hover:shadow-xl transition-shadow relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-sky-100 dark:bg-sky-900/20 rounded-full opacity-50"></div>
                <div className="relative">
                  <p className="mb-4 text-lg">At Go Img, we take your privacy seriously. This Privacy Policy explains how we handle your information and images when you use our website and services.</p>
                  <p>Please read this privacy policy carefully. If you do not agree with the terms, please do not access the site or use our services.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <GradientBox icon={Shield} title="Your Privacy Matters">
                <p className="text-center text-muted-foreground">We're committed to protecting your privacy and image security.</p>
              </GradientBox>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="mb-16">
            <h2 className={sectionTitle}>
              <span className="relative inline-block">
                Information We Collect
                <span className={underline}></span>
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <IconCard icon={Eye} title="No Personal Data Collection" hover>
                <p className="mb-4">We do not collect, store, or process any personal information or uploaded images. All image processing occurs locally in your browser.</p>
                <p className="text-muted-foreground"><strong>Usage Analytics:</strong> We may collect anonymous usage statistics to improve our service, such as page views and feature usage, but this data cannot be linked to individual users.</p>
              </IconCard>
              
              <IconCard icon={FileCheck} title="How Your Images Are Processed" hover>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  {['All image processing happens locally in your browser', 'Images are never uploaded to our servers', 'No image data is transmitted over the internet', 'Processed images remain on your device', 'You have complete control over your images at all times'].map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
                <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                  <p className="font-semibold text-sky-700 dark:text-sky-300 mb-2">Important:</p>
                  <p className="text-muted-foreground">All processing is local. No image data is ever sent to our servers.</p>
                </div>
              </IconCard>
            </div>

            <div className={cardBase}>
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-sky-600 mr-2" />
                Cookies and Local Storage
              </h3>
              <p>We may use cookies and local storage to remember your preferences and improve your experience. These do not contain any personal information and can be cleared through your browser settings.</p>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <GradientBox icon={Lock} title="Data Security">
                <p className="text-center text-muted-foreground">Since all processing happens locally and no data is transmitted, your images remain completely secure on your device. We recommend keeping your browser and device updated for optimal security.</p>
              </GradientBox>
            </div>
            <div className="lg:w-2/3">
              <div className={cardBase}>
                <h2 className="text-3xl font-bold mb-6 relative">
                  Data Security
                  <span className={underline}></span>
                </h2>
                <p className="mb-4 text-lg">All image processing is performed in your browser. No images or personal data are ever sent to our servers.</p>
                <p className="mb-4">We recommend keeping your browser and device updated for optimal security.</p>
                <p>If you have any questions about security, please contact us.</p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className={`${cardBase} mb-16`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Third-Party Services</h2>
            <p>Our service uses open-source libraries for image processing that run entirely in your browser. No data is shared with third parties.</p>
          </div>

          {/* Updates */}
          <div className={`${cardBase} mb-16`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/6 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Bell className="h-10 w-10 text-sky-600" />
                </div>
              </div>
              <div className="md:w-5/6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Updates to This Policy</h2>
                <p className="mb-4">We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
                <p>We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date at the top of this policy. We encourage you to review this policy periodically for the latest information on our privacy practices.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions or Concerns?</h2>
            <p className="text-white/90 mb-8 text-lg">If you have any questions about this Privacy Policy or our data practices, please don't hesitate to reach out to us.</p>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-sky-600 rounded-lg transition-colors font-medium shadow-md">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
