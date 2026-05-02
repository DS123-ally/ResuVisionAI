"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col gap-16 pb-20 pt-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Have questions about our AI analysis? Need technical support? 
          Our team is here to help you navigate your career journey.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto w-full">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email Us", details: "support@resuvision.ai", sub: "Mon-Fri 9am-6pm" },
            { icon: Phone, title: "Call Us", details: "+1 (555) 000-0000", sub: "Direct support line" },
            { icon: MapPin, title: "Visit Us", details: "San Francisco, CA", sub: "Silicon Valley Hub" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 flex gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-slate-200">{item.details}</p>
                <p className="text-sm text-slate-500">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-400">Message</label>
              <textarea 
                rows={5}
                placeholder="How can we help you?"
                className="w-full rounded-3xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <button className="md:col-span-2 w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
              Send Message
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
