'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

interface ContactSectionProps {
  sourcePage?: string;
}

export default function ContactSection({ sourcePage = 'Website Lead Section' }: ContactSectionProps) {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourcePage,
        }),
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
        setError(data.error || 'Failed to submit form. Please check details.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-14 lg:py-24 overflow-hidden bg-[#0A0A24] text-white">
      {/* Background ambient lighting effects matching live site */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A24] via-[#120d1e] to-[#0A0A24]" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#f71735]/15 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-[#f71735]/10 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Information & Value Pillars */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-[#f71735] text-xs font-semibold tracking-wider uppercase shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#f71735] animate-ping" />
                Contact Us
              </span>

              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-4 leading-tight text-white tracking-tight">
                Get in Touch for <br />
                <span className="grad-text">Support &amp; Queries</span>
              </h2>

              <p className="text-gray-400 mt-5 text-base md:text-lg leading-relaxed max-w-xl">
                We would love to hear from you! Whether you have a question, need assistance, or simply want to share your thoughts, our team is here to help.
              </p>
            </div>

            <div className="space-y-4">
              {/* Pillar 1 */}
              <div className="group flex gap-4 items-center p-4 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-300">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(252,39,121,0.3)]"
                  style={{ background: 'linear-gradient(100deg, #7a0a0a 0%, #d11414 35%, #ee2b2b 60%, #ff8a5e 100%)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Proven Industry Experience</h4>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group flex gap-4 items-center p-4 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-300">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(252,39,121,0.3)]"
                  style={{ background: 'linear-gradient(100deg, #7a0a0a 0%, #d11414 35%, #ee2b2b 60%, #ff8a5e 100%)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H10V4H4V10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10H20V4H14V10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 20H10V14H4V20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14V20H20V14H14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L14 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 10V14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Customized Business Solutions</h4>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group flex gap-4 items-center p-4 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-300">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(252,39,121,0.3)]"
                  style={{ background: 'linear-gradient(100deg, #7a0a0a 0%, #d11414 35%, #ee2b2b 60%, #ff8a5e 100%)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8L20 5L22 7L19 10L17 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 8L4 5L2 7L5 10L7 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L14 11L10 11L7 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11V14L12 16L14 14V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 8V14L12 19L17 14V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Long-Term Partnership</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-[32px] p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f71735]/10 rounded-full blur-2xl pointer-events-none" />

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Thank you for contacting Arvian Business Solutions. Our ecommerce management team will review your requirements and get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-[#f71735] text-white text-xs font-semibold hover:bg-[#cc0000] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 w-full relative z-10">
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-xs rounded-xl">
                      {error}
                    </div>
                  )}

                  {/* Row 1: Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-gray-500 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300"
                    />
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-gray-500 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-gray-500 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-gray-500 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Row 3: City & Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Your City *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-gray-500 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300"
                    />
                    <div className="relative">
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="custom-select w-full h-13 px-5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-gray-400 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#120d1e] text-gray-400">Select Service *</option>
                        <option value="Amazon Account Management" className="bg-[#120d1e] text-white">Amazon Account Management</option>
                        <option value="Flipkart Account Management" className="bg-[#120d1e] text-white">Flipkart Account Management</option>
                        <option value="Blinkit Account Management" className="bg-[#120d1e] text-white">Blinkit Account Management</option>
                        <option value="Meesho Account Management" className="bg-[#120d1e] text-white">Meesho Account Management</option>
                        <option value="Myntra Account Management" className="bg-[#120d1e] text-white">Myntra Account Management</option>
                        <option value="Shopify Account Management" className="bg-[#120d1e] text-white">Shopify Account Management</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="w-full">
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-gray-500 text-sm focus:border-[#f71735] focus:ring-4 focus:ring-[#f71735]/10 outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="premium-btn group relative overflow-hidden w-full h-13 rounded-xl bg-gradient-to-r from-[#f71735] to-[#e01a67] text-white font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(252,39,121,0.3)] flex items-center justify-center disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="shine" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
