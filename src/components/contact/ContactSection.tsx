import React, { useState } from 'react';
import { Send, Mail, Check, Copy, ArrowUpRight } from 'lucide-react';
import { BrandIcon } from '../ui/BrandIcons';
import { Magnetic } from '../motion/Magnetic';

interface ContactSectionProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCursorHover }) => {
  const [topic, setTopic] = useState<string>('AI Systems');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = 'ankit@kalkivision.ai';
  const topics = ['AI Systems', 'Backend / Rust', 'Full-Stack', 'Collaboration', 'Say Hello'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-[#030407] relative overflow-hidden">
      {/* Background Subtle Gradient Field */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(120,175,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-6 max-w-4xl">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
            <span>INITIATE CONTACT // 08</span>
          </div>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.96] text-[#F8FAFC]">
            LET'S BUILD <br />
            <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
              SOMETHING
            </span> <br />
            WORTH SHIPPING.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            Open to conversations regarding software engineering, multi-agent AI systems, backend infrastructure, and technical opportunities.
          </p>
        </div>

        {/* Grid: Form & Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-16 h-16 rounded-full bg-[rgba(120,175,255,0.1)] border border-[#78AFFF] flex items-center justify-center mx-auto text-[#78AFFF]">
                  <Send className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold uppercase text-[#F8FAFC]">
                  TRANSMISSION DISPATCHED
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  Thank you for reaching out, {formData.name}. I'll get back to you shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                
                {/* Topic Selector */}
                <div className="space-y-2">
                  <label className="text-xs text-[#475569] uppercase">I'M INTERESTED IN DISCUSSING...</label>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTopic(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          topic === t
                            ? 'bg-[#78AFFF] text-[#030407] font-bold shadow-[0_0_15px_rgba(120,175,255,0.3)]'
                            : 'bg-[#10141E] text-[#94A3B8] border border-[rgba(255,255,255,0.06)] hover:text-[#F8FAFC]'
                        }`}
                      >
                        [{t}]
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#475569] uppercase">YOUR NAME // IDENTIFIER</label>
                  <input
                    type="text"
                    required
                    placeholder="Ankit Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#030407] border border-[rgba(255,255,255,0.08)] text-sm text-[#F8FAFC] placeholder-[#475569] focus:border-[#78AFFF] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#475569] uppercase">EMAIL ADDRESS // DESTINATION</label>
                  <input
                    type="email"
                    required
                    placeholder="ankit@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#030407] border border-[rgba(255,255,255,0.08)] text-sm text-[#F8FAFC] placeholder-[#475569] focus:border-[#78AFFF] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#475569] uppercase">TRANSMISSION MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, system architecture, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#030407] border border-[rgba(255,255,255,0.08)] text-sm text-[#F8FAFC] placeholder-[#475569] focus:border-[#78AFFF] focus:outline-none transition-colors"
                  />
                </div>

                <Magnetic strength={0.25} className="w-full">
                  <button
                    type="submit"
                    onMouseEnter={() => onCursorHover(true, 'SEND', 'button')}
                    onMouseLeave={() => onCursorHover(false)}
                    className="w-full py-4 rounded-xl bg-[#78AFFF] text-[#030407] text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] shadow-[0_0_20px_rgba(120,175,255,0.3)] transition-all flex items-center justify-center space-x-2"
                  >
                    <span>TRANSMIT MESSAGE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

          {/* Right: Direct Channels */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-mono text-xs text-[#475569] uppercase tracking-widest">
                DIRECT CONNECT CHANNELS
              </h3>

              {/* Email Box with 1-Click Copy */}
              <div className="p-6 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] space-y-3 font-mono">
                <div className="text-xs text-[#78AFFF] flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT INBOX</span>
                </div>
                <div className="text-base text-[#F8FAFC] font-bold select-all">
                  {emailAddress}
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.08)] text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/Ankitkr-ak007"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => onCursorHover(true, 'GITHUB', 'link')}
                onMouseLeave={() => onCursorHover(false)}
                className="p-6 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] transition-all flex items-center justify-between group font-mono"
              >
                <div className="flex items-center space-x-3 text-sm text-[#F8FAFC] font-bold">
                  <BrandIcon name="github" className="w-5 h-5 text-[#78AFFF]" />
                  <span>GITHUB / Ankitkr-ak007</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#475569] group-hover:text-[#78AFFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => onCursorHover(true, 'LINKEDIN', 'link')}
                onMouseLeave={() => onCursorHover(false)}
                className="p-6 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] transition-all flex items-center justify-between group font-mono"
              >
                <div className="flex items-center space-x-3 text-sm text-[#F8FAFC] font-bold">
                  <svg className="w-5 h-5 fill-current text-[#38BDF8]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LINKEDIN / ANKIT KUMAR</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#475569] group-hover:text-[#38BDF8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Availability Pill */}
            <div className="p-4 rounded-xl bg-[rgba(16,20,30,0.85)] border border-[rgba(120,175,255,0.25)] font-mono text-xs text-[#B7D7FF] flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>CURRENTLY AVAILABLE FOR SUMMER 2026 ROLES & AI INITIATIVES</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
