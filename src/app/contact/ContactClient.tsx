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
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--text-primary)] pt-28 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#E5A855]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[350px] bg-[#C96F32]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-glass)] hover:bg-[var(--surface-glass-solid)] border border-[var(--border)] text-xs font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
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

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Average response: &lt; 24h</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--accent-gold)] font-bold block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
            Let&apos;s start a{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[var(--text-primary)] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
              conversation.
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
            Fill out the form below and our team will get back to you with custom catalog pricing, sample requests, or collaboration details.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative p-7 sm:p-10 rounded-3xl bg-[var(--surface-card)] border border-[var(--border)] backdrop-blur-xl shadow-[var(--shadow-card)]">
              
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
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                        Inquiry Type *
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                            className={`px-4 py-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                              formData.inquiryType === type.id
                                ? "bg-[var(--accent-gold-subtle)] border-[var(--accent-gold)] text-[var(--text-primary)] font-bold shadow-sm"
                                : "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)]/50 hover:text-[var(--text-primary)]"
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
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-4 py-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--input-placeholder)] text-sm focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@example.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--input-placeholder)] text-sm focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Company & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                          Company / Store <span className="text-[var(--text-muted)]">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Gourmet Pantry Co."
                          className="w-full px-4 py-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--input-placeholder)] text-sm focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                          Phone Number <span className="text-[var(--text-muted)]">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--input-placeholder)] text-sm focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your distribution needs, order volume, or project..."
                        className="w-full px-4 py-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--input-placeholder)] text-sm focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 bg-gradient-to-r from-[#E5A855] to-[#C96F32] hover:from-[#E5A855] hover:to-[#E5A855] text-[#0B0C0E] font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_0_25px_rgba(229,168,85,0.3)] hover:shadow-[0_0_35px_rgba(229,168,85,0.5)] transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
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
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
                      Inquiry Received
                    </h3>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed mb-8">
                      Thank you, <strong className="text-[var(--text-primary)]">{formData.name}</strong>. Our culinary partnerships team will review your inquiry and reach back out at <strong className="text-[var(--text-primary)]">{formData.email}</strong> shortly.
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
                        className="px-6 py-3 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        Send Another Note
                      </button>
                      <Link
                        href="/products"
                        className="px-6 py-3 rounded-full bg-[#E5A855] text-black font-bold text-xs uppercase tracking-wider hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
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
            <div className="p-7 rounded-3xl bg-[var(--surface-card)] border border-[var(--border)] backdrop-blur-xl shadow-[var(--shadow-card)]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-5">
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
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] hover:border-[var(--accent-gold)]/50 transition-all"
                  >
                    <div>
                      <p className="text-[11px] font-mono text-[var(--text-muted)]">{item.label}</p>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
                      >
                        {item.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(item.email)}
                      className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copiedEmail === item.email ? "✓" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Instant Connect */}
            <div className="p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/30 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#25D366] block mb-1 font-bold">
                    Instant Messaging
                  </span>
                  <h4 className="text-base font-bold text-[var(--text-primary)] mb-1">
                    Chat with Us on WhatsApp
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Direct chat with our culinary & sales team.
                  </p>
                </div>
                <a
                  href="https://wa.me/919995566396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all hover:scale-105 active:scale-100 flex items-center gap-2"
                >
                  <span>WhatsApp</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>

            {/* Headquarters & Hours */}
            <div className="p-7 rounded-3xl bg-[var(--surface-card)] border border-[var(--border)] backdrop-blur-xl shadow-[var(--shadow-card)]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">
                Headquarters
              </h3>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-1 font-semibold">
                Hebron Consumables Enterprises
              </p>
              <p className="text-xs text-[var(--accent-gold)] font-mono mb-2">
                A Brand of Hebron Group
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Pettah, Trivandrum, Kerala – 695024, India
              </p>
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Support Hours</span>
                <span className="text-[var(--text-primary)] font-mono">Mon – Sat / 9am – 7pm IST</span>
              </div>
            </div>

            {/* Socials */}
            <div className="p-7 rounded-3xl bg-[var(--surface-card)] border border-[var(--border)] backdrop-blur-xl shadow-[var(--shadow-card)]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">
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
                    className="flex-1 py-2.5 text-center rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-all"
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
