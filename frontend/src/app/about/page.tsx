"use client";

import { motion } from "framer-motion";
import { Users, Shield, Zap, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col gap-20 pb-20 pt-8">
      <section className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Our Mission
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-3xl mx-auto"
        >
          ResuVision AI was founded on the belief that everyone deserves a fair chance 
          to showcase their talent. We leverage cutting-edge AI to bridge the gap 
          between job seekers and recruitment systems.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Why We Exist</h2>
          <p className="text-slate-400 leading-relaxed">
            The modern job market is saturated and often opaque. High-quality candidates 
            are frequently filtered out by automated systems that don't see the full 
            picture. Our goal is to give that power back to the candidates.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: Shield, text: "Privacy First" },
              { icon: Zap, text: "Instant Analysis" },
              { icon: Users, text: "Candidate Centric" },
              { icon: Globe, text: "Global Standards" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <item.icon className="text-blue-400" size={20} />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] rounded-[40px] bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-white/10 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800')] opacity-20 grayscale bg-cover bg-center" />
          <div className="relative z-10 text-center p-8">
            <div className="text-6xl font-bold text-white mb-2">10x</div>
            <div className="text-lg text-white/60">Faster Screening Intelligence</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
