"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, FileText, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ResumeUpload } from "@/components/ResumeUpload";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
        >
          <Sparkles size={16} />
          <span>Next-Gen Resume Intelligence</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Elevate Your Career with <br />
          <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            AI-Powered Analysis
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Unlock your professional potential. ResuVision AI analyzes your resume, 
          calculates ATS scores, and provides real-time career guidance through 
          advanced neural insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link 
            href="/dashboard" 
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/40"
          >
            Get Started Free
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/about" 
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold backdrop-blur-sm transition-all hover:bg-white/10"
          >
            How it Works
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <ResumeUpload />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          {
            title: "ATS Optimization",
            description: "Industry-leading parsing engine that mirrors how modern applicant tracking systems view your profile.",
            icon: Target,
            color: "text-blue-400",
            bg: "bg-blue-400/10"
          },
          {
            title: "Skill Heatmaps",
            description: "Visual breakdown of your core competencies and functional experience categories.",
            icon: BarChart3,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10"
          },
          {
            title: "AI Career Coach",
            description: "A floating advisor ready to give you context-aware suggestions for resume improvement.",
            icon: Bot,
            color: "text-purple-400",
            bg: "bg-purple-400/10"
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/20"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", feature.bg, feature.color)}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="rounded-[40px] bg-gradient-to-br from-blue-600/20 via-slate-900 to-emerald-600/10 border border-white/10 p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Accuracy", value: "99.8%" },
            { label: "Resumes Analyzed", value: "50k+" },
            { label: "Companies", value: "1.2k" },
            { label: "Placement Rate", value: "85%" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
