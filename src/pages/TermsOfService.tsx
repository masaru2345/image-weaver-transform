import React from 'react';
import { FileText, UserCheck, CreditCard, ShieldCheck, Trash2, BookOpen, AlertTriangle, Scale } from "lucide-react";

const Card = ({ children, className = "", hover = false, gradient = false }) => (
  <div className={`bg-card rounded-xl shadow-lg p-8 border border-border ${hover ? 'hover:shadow-xl transition-all hover:-translate-y-1' : ''} ${gradient ? 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20' : ''} ${className}`}>{children}</div>
);

const IconBadge = ({ icon: Icon, className = "h-8 w-8 text-sky-600" }) => (
  <div className="h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-4"><Icon className={className} /></div>
);

const Section = ({ icon: Icon, title, number, children }) => (
  <div className="mb-16">
    <div className="flex flex-col lg:flex-row items-start gap-8">
      <div className="lg:w-1/4 flex flex-col items-center text-center lg:sticky lg:top-8">
        <IconBadge icon={Icon} />
        <h3 className="font-bold text-2xl mb-2">{number}. {title}</h3>
      </div>
      <div className="lg:w-3/4"><Card>{children}</Card></div>
    </div>
  </div>
);

const Alert = ({ type = "info", icon: Icon, children }) => {
  const colors = { info: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300", warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300", error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300" };
  return <div className={`p-4 rounded-lg border ${colors[type]} mb-4`}>{Icon && <div className="flex items-start"><Icon className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />{children}</div>}{!Icon && children}</div>;
};

export default function TermsOfService() {
  const keyTerms = [
    { title: "Acceptance", icon: UserCheck, description: "Your agreement to these terms" },
    { title: "Services", icon: FileText, description: "What we provide to you" },
    { title: "Accounts", icon: ShieldCheck, description: "User registration requirements" },
    { title: "Payment", icon: CreditCard, description: "Billing and subscriptions" },
  ];

  const serviceFeatures = [
    { title: "Image Conversion", description: "Convert images to and from various formats" },
    { title: "Image Editing", description: "Modify, annotate, and organize image content" },
    { title: "Image Security", description: "Protect, encrypt, and secure your images" }
  ];

  const userContentPoints = [
    { title: "Ownership", text: "You retain full ownership of any images or content you process. We claim no rights to your content." },
    { title: "License", text: "By using our service, you grant us a license to process your content solely for the purpose of providing the service." },
    { title: "Warranties", text: "You represent and warrant that you have the necessary rights to your content and that it does not violate any laws or third-party rights." }
  ];

  const prohibitedUses = ["In any way that violates any applicable law or regulation", "To infringe upon or violate the intellectual property rights or any other rights of anyone else", "To transmit any material that is unlawful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable", "To attempt to interfere with, compromise the security of, or disrupt our services", "To attempt to reverse engineer, decompile, or disassemble any portion of our services", "To access or use our services through automated means (bots, scripts, etc.) without our express permission"];

  const liabilityItems = ["Your access to or use of or inability to access or use our services", "Any conduct or content of any third party on our services", "Any content obtained from our services", "Unauthorized access, use, or alteration of your transmissions or content", "Any other matter relating to our services"];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-b from-sky-50 to-background dark:from-sky-900/20 dark:to-background py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Terms of Service</h1>
          <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <div className="flex justify-center"><div className="w-16 h-1 bg-sky-600 rounded-full"></div></div>
        </div>
      </div>

      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/3">
              <Card className="relative overflow-hidden hover:shadow-xl transition-shadow">
                <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-sky-100 dark:bg-sky-900/20 rounded-full opacity-50"></div>
                <div className="relative">
                  <p className="mb-4 text-lg">Welcome to GoImg. These Terms of Service ("Terms") govern your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms.</p>
                  <p>Please read these Terms carefully before using our services. If you do not agree to these Terms, you may not access or use our services.</p>
                </div>
              </Card>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl blur-lg opacity-30"></div>
                <Card className="relative flex flex-col items-center">
                  <FileText className="h-16 w-16 text-sky-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Legal Agreement</h3>
                  <p className="text-center text-muted-foreground">These terms constitute a binding legal agreement between you and GoImg.</p>
                </Card>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative"><span className="relative inline-block">Key Terms<span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-sky-600"></span></span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyTerms.map((item, i) => (
                <a key={i} href={`#section-${i + 1}`} className="bg-card rounded-xl shadow-md p-6 border border-border hover:shadow-xl transition-all hover:-translate-y-2 hover:scale-105 flex flex-col items-center text-center">
                  <IconBadge icon={item.icon} />
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </a>
              ))}
            </div>
          </div>

          <Section icon={UserCheck} title="Acceptance of Terms" number="1">
            <p className="mb-4 text-lg">By creating an account, accessing or using our services, or clicking "I Agree," you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using our services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
            <Alert type="info" icon={FileText}><p><span className="font-semibold">Note:</span> We may update these Terms from time to time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last updated" date.</p></Alert>
            <p>Your continued use of our services after any such changes constitutes your acceptance of the revised Terms.</p>
          </Section>

          <Section icon={FileText} title="Description of Services" number="2">
            <div className="relative mb-8">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-sky-100 dark:bg-sky-900/20 rounded-full opacity-30"></div>
              <div className="relative">
                <p className="mb-4 text-lg">GoImg provides various tools for working with images, including but not limited to conversion, compression, editing, resizing, cropping, and other image management features. Some features may require an account or a paid subscription.</p>
                <p>We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice. We will not be liable to you or any third party for any such modifications, suspensions, or discontinuations.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceFeatures.map((item, i) => (
                <div key={i} className="p-4 bg-background dark:bg-gray-800 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={ShieldCheck} title="User Accounts" number="3">
            <p className="mb-4 text-lg">Some features of our services may require you to create an account. When you register for an account, you agree to provide accurate, current, and complete information and to update such information to keep it accurate, current, and complete.</p>
            <p className="mb-4">You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>
            <Alert type="warning" icon={AlertTriangle}><p>We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms or if we believe your account may pose a security risk.</p></Alert>
          </Section>

          <Section icon={CreditCard} title="Subscription and Payment" number="4">
            <div className="mb-8">
              <p className="mb-4">We offer free and paid subscription plans. By subscribing to a paid plan, you agree to pay all fees in accordance with the billing terms in effect at the time of your subscription.</p>
              <p className="mb-4">All subscription fees are non-refundable except as expressly stated in these Terms or as required by applicable law. We may change our subscription fees at any time, but any price changes will only apply to subsequent billing cycles.</p>
              <p>Subscriptions automatically renew for the same subscription term unless cancelled before the renewal date. You may cancel your subscription at any time through your account settings or by contacting our customer service.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{ title: "Billing Cycle", text: "We offer monthly and annual billing cycles. Annual subscribers receive a discount compared to the monthly rate." }, { title: "Cancellation Policy", text: "You may cancel your subscription at any time, but we don't provide refunds for the current billing period." }].map((item, i) => (
                <Card key={i} gradient className="border-sky-100 dark:border-sky-800">
                  <h4 className="font-bold text-lg mb-3">{item.title}</h4>
                  <p className="text-muted-foreground">{item.text}</p>
                </Card>
              ))}
            </div>
          </Section>

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center relative"><span className="relative inline-block">5. User Content<span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-sky-600"></span></span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {userContentPoints.map((point, i) => (
                <Card key={i} hover>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600">{i + 1}</span>
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground">{point.text}</p>
                </Card>
              ))}
            </div>
            <Card className="mt-8 text-center"><p className="text-lg font-medium">We do not claim ownership of your User Content, and we will not use it for any purpose other than providing our services to you without your consent.</p></Card>
          </div>

          <div className="mb-16">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 -mt-20 -mr-20 bg-red-100 dark:bg-red-900/20 rounded-full opacity-20"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-4"><Trash2 className="h-6 w-6" /></div>
                  <h2 className="text-2xl md:text-3xl font-bold">6. Prohibited Uses</h2>
                </div>
                <p className="mb-6 text-lg">You agree not to use our services:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {prohibitedUses.map((text, i) => (
                    <div key={i} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-3 flex-shrink-0 mt-0.5"><span className="text-sm font-bold">✕</span></div>
                      <p className="text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
                <Alert type="error" icon={Trash2}><p className="font-medium">We reserve the right to terminate your access to our services for violations of these prohibited uses.</p></Alert>
              </div>
            </Card>
          </div>

          <div className="mb-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl blur-lg opacity-30"></div>
                <Card className="relative flex flex-col items-center">
                  <BookOpen className="h-16 w-16 text-sky-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">7. Intellectual Property</h3>
                  <p className="text-center text-muted-foreground">All services, content, and features are owned by GoImg and protected by law.</p>
                </Card>
              </div>
            </div>
            <div className="lg:w-2/3">
              <Card>
                <p className="mb-4 text-lg">Our services and their contents, features, and functionality (including but not limited to all information, software, text, displays, images, logos, and design) are owned by us or our licensors and are protected by intellectual property laws.</p>
                <p className="mb-4">You may not copy, modify, create derivative works, publicly display, publicly perform, republish, or transmit any material from our services without our express permission or as permitted by law.</p>
                <p>Nothing in these Terms grants you any right to use our trademarks, logos, domain names, or other distinctive brand features without our prior written consent.</p>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <Card>
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 mr-4"><Scale className="h-6 w-6" /></div>
                <h2 className="text-2xl md:text-3xl font-bold">8. Limitation of Liability</h2>
              </div>
              <p className="mb-6 text-lg">To the maximum extent permitted by law, in no event shall we or our suppliers be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {liabilityItems.map((item, i) => (
                  <div key={i} className="p-4 bg-background dark:bg-gray-800 rounded-lg border border-border hover:-translate-y-1 transition-transform">
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <Alert type="info" icon={Scale}><p>Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.</p></Alert>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-xl p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Our Terms?</h2>
              <p className="text-white/90 mb-8 text-lg">If you have any questions about these Terms of Service, please don't hesitate to reach out to us.</p>
              <div className="flex justify-center">
                <a href="/contact" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-sky-600 rounded-lg transition-colors font-medium shadow-md">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}