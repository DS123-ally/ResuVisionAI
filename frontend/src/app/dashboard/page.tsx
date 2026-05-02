"use client";

import { motion } from "framer-motion";
import { BarChart, PieChart, TrendingUp, AlertCircle, CheckCircle2, Download, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/ChatInput";
import { useAnalysis } from "@/context/AnalysisContext";

export default function Dashboard() {
  const { analysisData } = useAnalysis();

  // Use real data from context or fall back to mock data if none exists
  const atsScore = analysisData?.ats_score || 0;
  const filename = analysisData?.filename || "No Resume Uploaded";
  const feedback = analysisData?.feedback || [
    "Upload a resume to see detailed improvement areas.",
    "Our AI will analyze your impact and keywords."
  ];
  const skills = analysisData?.skills || [
    { name: "Placeholder Skill", level: 0 }
  ];

  const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-orange-500", "bg-red-500"];

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resume Dashboard</h1>
          <p className="text-slate-400">Analysis for: <span className="text-white font-medium">{filename}</span></p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {!analysisData && (
        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm flex items-center gap-3">
          <AlertCircle size={18} />
          You haven't uploaded a resume yet. Visit the Home page to start your analysis.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ATS Score Gauge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-[40px] bg-white/5 border border-white/10 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <TrendingUp size={24} className="text-emerald-400 opacity-20" />
          </div>
          <h3 className="text-xl font-bold mb-8">ATS Score</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - atsScore / 100)}
                className="text-blue-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-bold">{atsScore}</span>
              <span className="text-sm text-slate-400 uppercase tracking-widest font-semibold">
                {atsScore > 80 ? "Excellent" : atsScore > 60 ? "Good" : "Needs Improvement"}
              </span>
            </div>
          </div>
          <div className="mt-8 flex gap-2 items-center text-emerald-400 bg-emerald-400/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 size={14} />
            AI Verified Analysis
          </div>
        </motion.div>

        {/* Skill Heatmap */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-8 rounded-[40px] bg-white/5 border border-white/10"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Skill Heatmap</h3>
            <BarChart size={20} className="text-slate-500" />
          </div>
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-slate-400">{skill.level}% Proficiency</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={cn("h-full rounded-full", colors[i % colors.length])}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Critical Feedback */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 p-8 rounded-[40px] bg-gradient-to-br from-blue-500/10 to-transparent border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-blue-400" />
            <h3 className="text-xl font-bold">AI Improvement Suggestions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback.map((text, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-slate-300">
                <span className="text-blue-400 font-bold">•</span>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* AI Chat Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 p-8 rounded-[40px] bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-blue-400" />
            <h3 className="text-xl font-bold">AI Insights</h3>
          </div>
          <ChatInput />
        </motion.div>
      </div>
    </div>
  );
}
