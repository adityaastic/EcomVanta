'use client';

import React, { useState } from 'react';
import { Mail, User, Phone, MapPin, MessageSquare, X, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourcePage?: string;
}

export default function ContactPopupModal({ isOpen, onClose, sourcePage = 'Consultation Popup' }: ContactPopupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/popup', {
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
        setFormData({ name: '', email: '', phone: '', city: '', message: '' });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#081325] text-white flex items-center justify-center hover:bg-[#0066FF] transition-colors shadow-md cursor-pointer border border-white/20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Section */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center min-h-[480px] relative"
          style={{ backgroundImage: "url('/coreporate lady.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-end p-8 text-white z-10">
            <span className="text-xs uppercase tracking-widest !text-[#00C2FF] font-black mb-2 drop-shadow-sm">
              EcomVanta Growth Consultancy
            </span>
            <h3 className="text-2xl lg:text-3xl font-black !text-white leading-tight drop-shadow-md">
              Scale Your Multi-Channel Online Sales Today
            </h3>
            <p className="text-xs font-semibold !text-blue-100 mt-2.5 tracking-wide drop-shadow-sm">
              Amazon &bull; Flipkart &bull; Blinkit &bull; Myntra &bull; Shopify &bull; Zepto
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 flex flex-col justify-center bg-white">
          <div className="text-center mb-5">
            <div className="md:hidden flex justify-center mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-[11px] font-black uppercase tracking-wider">
                EcomVanta Growth Consultancy
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066FF] flex-shrink-0" />
              <span>Submit Your Query & Get Free Audit</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] mx-auto mt-2 rounded-full" />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Submit your requirements below — our specialist will connect with you promptly!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#0066FF] rounded-full flex items-center justify-center mx-auto border border-blue-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Inquiry Received!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out to EcomVanta. Our ecommerce strategist will contact you within 2 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-semibold text-sm hover:from-[#0052cc] hover:to-[#003d99] transition-all shadow-md cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50/70 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50/70 focus:bg-white"
                />
              </div>

              {/* Phone */}
              <div className="relative flex">
                <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-r-xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50/70 focus:bg-white"
                />
              </div>

              {/* City */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <input
                  type="text"
                  required
                  placeholder="City Name *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50/70 focus:bg-white"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <textarea
                  rows={3}
                  required
                  placeholder="Your Query / Requirements *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50/70 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm sm:text-base tracking-wide uppercase hover:from-[#0052cc] hover:to-[#003d99] shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Query & Request Call</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
