'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

export default function ContactUsPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sourcePage: 'Contact Us Dedicated Page' }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          service: '',
          message: '',
        });
      } else {
        setError(data.error || 'Failed to submit form.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20">
        
        {/* HERO BANNER */}
        <section
          className="relative py-20 bg-cover bg-center text-white overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(rgba(10, 10, 36, 0.85), rgba(10, 10, 36, 0.9)), url('/contact-bg.webp')",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-red-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                EcomVanta | Contact Us
              </h1>
              <p className="text-gray-300 text-base italic">
                Your Marketplace Growth Partner — From Setup to Sales
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="tel:+918787249407"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-[#f71735] hover:border-[#f71735] transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#f71735]" />
                  <span>+91 878 724 9407</span>
                </a>

                <a
                  href="mailto:ecomvanta40@gmail.com"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-[#f71735] hover:border-[#f71735] transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#f71735]" />
                  <span>ecomvanta40@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="relative w-72 sm:w-80 h-auto">
              <Image
                src="/Contact-mobile-img.webp"
                alt="Contact Mobile"
                width={350}
                height={400}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* HAPPY TO ANSWER QUESTIONS BANNER */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-24 h-24 mx-auto mb-2">
              <Image src="/chat.png" alt="Chat" width={96} height={96} className="w-full h-full object-contain" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              We will be happy to answer your questions
            </h2>
            
            <span className="inline-block text-[#f71735] font-extrabold text-lg uppercase tracking-wider">
              Let&apos;s Talk
            </span>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              We specialize in eCommerce account management services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites. From product listings to advertising and performance optimization, we handle everything to maximize your online sales.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/918787249407?text=Hi%20EcomVanta%2C%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-black text-sm hover:bg-emerald-700 transition-all shadow-xl"
              >
                <span>Chat With Us on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* MAIN CONTACT DETAILS & FORM */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Office Details */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs font-bold text-[#f71735] uppercase tracking-widest">Our Office</span>
                  <h3 className="text-3xl font-black text-gray-900 mt-2">Visit EcomVanta HQ</h3>
                  <p className="text-gray-600 text-sm mt-3">
                    Feel free to reach out to our team or schedule a consultation call with our marketplace specialists.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                    <MapPin className="w-6 h-6 text-[#f71735] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Location</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        New Delhi, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                    <Phone className="w-6 h-6 text-[#f71735] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Call &amp; Mobile Support</h4>
                      <p className="text-xs text-gray-600 mt-1">Phone: +91 878 724 9407</p>
                      <p className="text-xs text-gray-600">Hours: Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                    <Mail className="w-6 h-6 text-[#f71735] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Email Inquiries</h4>
                      <p className="text-xs text-gray-600 mt-1">ecomvanta40@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Google Map Iframe */}
                <div className="rounded-3xl overflow-hidden shadow-md border border-gray-200 aspect-[16/10]">
                  <iframe
                    title="EcomVanta Office Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column: Interactive Lead Form */}
              <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Send Us a Direct Message</h3>

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Message Received!</h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Thank you for contacting Arvian Business Solutions. Our account manager will get back to you within 2-4 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-[#f71735] text-white text-xs font-bold hover:bg-[#cc0000]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 text-[#f71735] text-xs font-semibold rounded-xl border border-red-200">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#f71735] outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#f71735] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#f71735] outline-none"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#f71735] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="City *"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#f71735] outline-none"
                      />
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:border-[#f71735] outline-none cursor-pointer"
                      >
                        <option value="" disabled>Select Service *</option>
                        <option value="Amazon Account Management">Amazon Account Management</option>
                        <option value="Flipkart Account Management">Flipkart Account Management</option>
                        <option value="Blinkit Account Management">Blinkit Account Management</option>
                        <option value="Meesho Account Management">Meesho Account Management</option>
                        <option value="Myntra Account Management">Myntra Account Management</option>
                        <option value="Shopify Store Management">Shopify Store Management</option>
                      </select>
                    </div>

                    <textarea
                      rows={5}
                      placeholder="How can we help your e-commerce brand grow?..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl border border-gray-300 text-sm focus:border-[#f71735] outline-none resize-none"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="arvianPulseBtn w-full py-4 rounded-xl bg-[#f71735] text-white font-extrabold text-sm hover:bg-[#cc0000] shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Contact Us Page" />
    </>
  );
}
