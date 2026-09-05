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
          className="hidden md:block md:w-1/2 bg-cover bg-center min-h-[460px] relative"
          style={{ backgroundImage: "url('/coreporate lady.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#081325]/95 via-[#081325]/50 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-xs uppercase tracking-widest text-[#00C2FF] font-extrabold mb-1">
              EcomVanta Growth Consultancy
            </span>
            <h3 className="text-2xl font-bold leading-tight">
              Scale Your Multi-Channel Online Sales Today
            </h3>
            <p className="text-xs text-blue-200 mt-2">
              Amazon &bull; Flipkart &bull; Blinkit &bull; Myntra &bull; Shopify &bull; Zepto
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
              <Mail className="w-6 h-6 text-[#0066FF]" />
              Book Free Growth Audit
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] mx-auto mt-2 rounded-full" />
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Fill the form below and our marketplace growth specialists will call you back!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#0066FF] rounded-full flex items-center justify-center mx-auto border border-blue-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Inquiry Received!</h3>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Thank you for reaching out to EcomVanta. Our ecommerce strategist will contact you within 2 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-semibold text-sm hover:from-[#0052cc] hover:to-[#003d99] transition-all shadow-md"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <input
                  type="text"
                  required
                  placeholder="Enter Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Phone */}
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-100 text-gray-700 text-xs font-semibold">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-r-lg border border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* City */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <input
                  type="text"
                  required
                  placeholder="Your City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0066FF]" />
                <textarea
                  rows={3}
                  required
                  placeholder="Your Business Requirements / Message *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm tracking-wider uppercase hover:from-[#0052cc] hover:to-[#003d99] shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  'Request Free Strategy Call'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
