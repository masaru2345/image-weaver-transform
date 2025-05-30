
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Mail, Lock, CheckCircle, Timer, Zap, Globe } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.action = "https://formsubmit.co/198762b5dc999c431b56367a954fbe4a";
    form.method = "POST";
    form.submit();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-sky-50 to-background dark:from-sky-900/20 dark:to-background py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Contact Us</h1>
          <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto text-lg">
            Have a question or need help with our tools? We're here to assist you.
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-sky-600 rounded-full"></div>
          </div>
        </div>
      </div>
      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Contact Methods */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Email Support",
                  description: "For general inquiries and technical support\nWe aim to respond within 24 hours",
                  icon: Mail,
                  action: "info@flux8labs.com",
                  actionType: "email",
                },
                {
                  title: "Privacy & Security",
                  description: "Learn about our commitment to your privacy and data security",
                  icon: Lock,
                  action: "/privacy",
                  actionType: "link",
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl shadow-lg p-8 border border-border flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-2"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div className="h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-sky-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 whitespace-pre-line">
                    {item.description}
                  </p>
                  {item.actionType === 'email' && (
                    <a href={`mailto:${item.action}`} className="text-sky-600 font-medium hover:underline">
                      {item.action}
                    </a>
                  )}
                  {item.actionType === 'button' && (
                    <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
                      {item.action}
                    </Button>
                  )}
                  {item.actionType === 'link' && (
                    <a 
                      href={item.action}
                      className="text-sky-600 font-medium hover:underline"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-16">
            <div className="flex flex-col gap-8 max-w-2xl mx-auto">
              <div className="bg-card rounded-xl shadow-lg p-8 border border-border overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-sky-100 dark:bg-sky-900/20 rounded-full opacity-40"></div>
                {!formSubmitted ? (
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-6 relative">
                      Get in Touch
                      <span className="absolute -bottom-3 left-0 w-16 h-1 bg-sky-600"></span>
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                      <input type="hidden" name="_next" value="https://comfypdf.flux8labs.com/contact?submitted=true" />
                      <input type="hidden" name="_captcha" value="false"></input>
                      <input type="hidden" name="_subject" value="New ComfyPDF Contact Form Submission" />
                      <input type="hidden" name="_template" value="box" />
                      <input type="text" name="_honey" style={{ display: 'none' }} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-base">Name</Label>
                          <Input name="name" placeholder="Your name" required className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-base">Email</Label>
                          <Input name="email" type="email" placeholder="Your email address" required className="h-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-base">Subject</Label>
                        <Select name="subject">
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base">Message</Label>
                        <Textarea name="message" placeholder="How can we help you?" rows={6} required className="resize-none" />
                      </div>
                      <div>
                        <Button type="submit" size="lg" className="w-full bg-sky-500 hover:bg-sky-600 text-white hover:shadow-lg transition-all">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-16 relative z-10">
                    <div className="flex justify-center mb-6">
                      <CheckCircle className="h-24 w-24 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)} variant="outline" size="lg">
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to common questions about our service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Lock className="text-sky-600" />
                  Is my data secure?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! All processing happens entirely in your browser. Your files never leave your device - we use client-side technology to ensure maximum privacy and security. No data is ever sent to our servers.
                </p>
              </div>
              <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Timer className="text-sky-600" />
                  How long are my files kept?
                </h3>
                <p className="text-muted-foreground">
                  Your files are processed locally and are automatically deleted from your browser's memory once processing is complete. We never store or have access to your files.
                </p>
              </div>
              <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Zap className="text-sky-600" />
                  How fast is the processing?
                </h3>
                <p className="text-muted-foreground">
                  Since all processing happens locally in your browser, it's incredibly fast. Most operations take just a few seconds, depending on your device's capabilities and the file size.
                </p>
              </div>
              <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Globe className="text-sky-600" />
                  Do I need to create an account?
                </h3>
                <p className="text-muted-foreground">
                  No account needed! Our tools are freely available and work right in your browser. Just upload your file and start processing - it's that simple and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
