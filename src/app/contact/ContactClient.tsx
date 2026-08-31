"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const inquiryTypes = [
  { id: "wholesale", label: "Wholesale & Stockist" },
  { id: "collaboration", label: "Brand Collaboration" },
  { id: "press", label: "Press & Media" },
  { id: "feedback", label: "General & Feedback" },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "wholesale",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#E5A855]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[350px] bg-[#C96F32]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono tracking-widest text-[#C7CBD1] hover:text-white transition-all group"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Average response: &lt; 24h</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A855] font-bold block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Let&apos;s start a{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
              conversation.
            </span>
          </h1>
          <p className="text-[#A7ACB4] text-base sm:text-lg leading-relaxed">
            Fill out the form below and our team will get back to you with custom catalog pricing, sample requests, or collaboration details.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative p-7 sm:p-10 rounded-3xl bg-[#111317]/85 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Inquiry Type Radio / Pill Selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#858B94] mb-3">
                        Inquiry Type *
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                            className={`px-4 py-3 rounded-xl text-xs font-medium text-left border transition-all ${
                              formData.inquiryType === type.id
                                ? "bg-[#E5A855]/15 border-[#E5A855] text-white shadow-[0_0_15px_rgba(229,168,85,0.15)]"
                                : "bg-white/[0.02] border-white/10 text-[#A7ACB4] hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#858B94] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-white/10 text-white placeholder-[#5D6470] text-sm focus:outline-none focus:border-[#E5A855] focus:ring-1 focus:ring-[#E5A855] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#858B94] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@example.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-white/10 text-white placeholder-[#5D6470] text-sm focus:outline-none focus:border-[#E5A855] focus:ring-1 focus:ring-[#E5A855] transition-all"
                        />
                      </div>
                    </div>

                    {/* Company & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#858B94] mb-2">
                          Company / Store <span className="text-[#5D6470]">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Gourmet Pantry Co."
                          className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-white/10 text-white placeholder-[#5D6470] text-sm focus:outline-none focus:border-[#E5A855] focus:ring-1 focus:ring-[#E5A855] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#858B94] mb-2">
                          Phone Number <span className="text-[#5D6470]">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-white/10 text-white placeholder-[#5D6470] text-sm focus:outline-none focus:border-[#E5A855] focus:ring-1 focus:ring-[#E5A855] transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#858B94] mb-2">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your distribution needs, order volume, or project..."
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-white/10 text-white placeholder-[#5D6470] text-sm focus:outline-none focus:border-[#E5A855] focus:ring-1 focus:ring-[#E5A855] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 bg-gradient-to-r from-[#E5A855] to-[#C96F32] hover:from-[#E5A855] hover:to-[#E5A855] text-[#0B0C0E] font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_0_25px_rgba(229,168,85,0.3)] hover:shadow-[0_0_35px_rgba(229,168,85,0.5)] transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#0B0C0E] border-t-transparent rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      Inquiry Received
                    </h3>
                    <p className="text-[#A7ACB4] max-w-md mx-auto text-sm leading-relaxed mb-8">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Our culinary partnerships team will review your inquiry and reach back out at <strong className="text-white">{formData.email}</strong> shortly.
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            inquiryType: "wholesale",
                            message: "",
                          });
                        }}
                        className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-white transition-colors"
                      >
                        Send Another Note
                      </button>
                      <Link
                        href="/products"
                        className="px-6 py-3 rounded-full bg-[#E5A855] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                      >
                        Explore Collection
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Direct Contacts Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Cards */}
            <div className="p-7 rounded-3xl bg-[#111317]/60 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#858B94] mb-5">
                Direct Channels
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: "General & Support", email: "hello@lacrispo.com" },
                  { label: "Wholesale & Accounts", email: "wholesale@lacrispo.com" },
                  { label: "Press & Collaborations", email: "press@lacrispo.com" },
                ].map((item) => (
                  <div
                    key={item.email}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-all"
                  >
                    <div>
                      <p className="text-[11px] font-mono text-[#858B94]">{item.label}</p>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-sm font-medium text-white hover:text-[#E5A855] transition-colors"
                      >
                        {item.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(item.email)}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-[#A7ACB4] hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedEmail === item.email ? "✓" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Headquarters & Hours */}
            <div className="p-7 rounded-3xl bg-[#111317]/60 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#858B94] mb-4">
                Headquarters
              </h3>
              <p className="text-sm text-[#F2F2F0] leading-relaxed mb-2 font-medium">
                La Crispo Snacks Corp.
              </p>
              <p className="text-xs text-[#858B94] leading-relaxed mb-4">
                123 Spice Avenue, Flavor Town, CA 90210
              </p>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#858B94]">
                <span>Support Hours</span>
                <span className="text-white font-mono">Mon – Fri / 9am – 6pm EST</span>
              </div>
            </div>

            {/* Socials */}
            <div className="p-7 rounded-3xl bg-[#111317]/60 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#858B94] mb-4">
                Follow The Crunch
              </h3>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", href: "https://instagram.com" },
                  { name: "Twitter (X)", href: "https://x.com" },
                  { name: "LinkedIn", href: "https://linkedin.com" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-[#C7CBD1] hover:text-[#E5A855] transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
