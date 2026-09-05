'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp
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
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#07101E] text-white border-t border-slate-800">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#07101E] via-[#0B1B36] to-[#07101E]" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#0066FF]/15 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#00C2FF]/15 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-[#0066FF]/15 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Information & Value Pillars */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-md border border-cyan-500/20 text-[#00C2FF] text-xs font-bold tracking-wider uppercase shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
                Connect With Us
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 leading-tight text-white tracking-tight">
                Scale Your Marketplace <br />
                <span className="grad-text-glow">Revenues with EcomVanta</span>
              </h2>

              <p className="text-slate-300 mt-5 text-base md:text-lg leading-relaxed max-w-xl">
                Ready to take your Amazon, Flipkart, Meesho, and Quick-Commerce stores to the next level? Get a customized growth roadmap and free catalog audit.
              </p>
            </div>

            <div className="space-y-4">
              {/* Pillar 1 */}
              <div className="group flex gap-4 items-center p-4 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-300 shadow-sm">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 bg-gradient-to-tr from-[#0066FF] to-[#00C2FF]"
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Data-Driven Marketplace Growth</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Custom PPC, catalogue SEO &amp; inventory algorithms</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group flex gap-4 items-center p-4 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-300 shadow-sm">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 bg-gradient-to-tr from-[#0066FF] to-[#00C2FF]"
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">End-to-End Account Management</h4>
                  <p className="text-xs text-slate-400 mt-0.5">From onboarding to daily orders &amp; customer queries</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group flex gap-4 items-center p-4 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-300 shadow-sm">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 bg-gradient-to-tr from-[#0066FF] to-[#00C2FF]"
                >
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">100% Policy Compliance &amp; Support</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Dedicated key account manager for fast scaling</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/[0.1] rounded-[32px] p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,102,255,0.15)]">
              
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0066FF]/20 rounded-full blur-2xl pointer-events-none" />

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out to EcomVanta. Our senior marketplace strategist will review your brand and contact you within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C2FF] text-white text-xs font-bold hover:brightness-110 transition-all shadow-md"
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
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder:text-slate-400 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300"
                    />
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder:text-slate-400 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Business Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder:text-slate-400 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder:text-slate-400 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Row 3: City & Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Your City / Region *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="custom-input w-full h-13 px-5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder:text-slate-400 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300"
                    />
                    <div className="relative">
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="custom-select w-full h-13 px-5 rounded-xl bg-[#0d1e38] border border-white/[0.12] text-slate-200 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#07101E] text-slate-400">Select Marketplace *</option>
                        <option value="Amazon Account Management" className="bg-[#07101E] text-white">Amazon Account Management</option>
                        <option value="Flipkart Account Management" className="bg-[#07101E] text-white">Flipkart Account Management</option>
                        <option value="Blinkit & Zepto Onboarding" className="bg-[#07101E] text-white">Blinkit &amp; Zepto Onboarding</option>
                        <option value="Meesho Account Management" className="bg-[#07101E] text-white">Meesho Account Management</option>
                        <option value="Myntra & Nykaa Growth" className="bg-[#07101E] text-white">Myntra &amp; Nykaa Growth</option>
                        <option value="Shopify Store Management" className="bg-[#07101E] text-white">Shopify &amp; D2C Growth</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="w-full">
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="Tell us about your brand, SKU count, or key goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder:text-slate-400 text-sm focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/20 outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="premium-btn group relative overflow-hidden w-full h-14 rounded-2xl bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#00C2FF] text-white font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer shadow-[0_10px_35px_rgba(0,102,255,0.4)] flex items-center justify-center disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform duration-300 font-bold">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Claim Free Strategy Audit Call</span>
                          <ArrowRight className="w-4 h-4" />
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

