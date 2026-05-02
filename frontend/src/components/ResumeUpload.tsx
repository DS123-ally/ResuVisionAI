"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRouter } from "next/navigation";

export function ResumeUpload() {
  const router = useRouter();
  const { setAnalysisData } = useAnalysis();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(10); // Start progress

    const formData = new FormData();
    formData.append("file", file);

    try { 
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(p => (p < 90 ? p + 10 : p));
      }, 200);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/v1/analyze`, {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (response.ok) {
        const data = await response.json();
        setAnalysisData(data);
        setProgress(100);
        setTimeout(() => {
          setSuccess(true);
          setIsUploading(false);
          router.push("/dashboard");
        }, 500);
      } else {
        const data = await response.json();
        setError(data.detail || "Analysis failed. Please try again.");
        setIsUploading(false);
      }
    } catch (err) {
      setError("Network error. Please ensure the backend is running.");
      setIsUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setSuccess(false);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-1">
      <div className="relative p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full" />

        <div 
          {...getRootProps()} 
          className={cn(
            "relative z-10 border-2 border-dashed rounded-[2rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer",
            isDragActive ? "border-blue-400 bg-blue-400/5 scale-[0.98]" : "border-white/10 hover:border-white/20 hover:bg-white/5",
            file && !error ? "border-emerald-500/50 bg-emerald-500/5" : ""
          )}
        >
          <input {...getInputProps()} />
          
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600/20 to-blue-600/5 flex items-center justify-center text-blue-400 mb-6 shadow-inner">
                  <Upload size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Drop your resume here</h3>
                <p className="text-slate-400 max-w-xs">
                  Supports <span className="text-blue-400 font-semibold">.PDF</span> and <span className="text-blue-400 font-semibold">.DOCX</span> files up to 5MB.
                </p>
              </motion.div>
            ) : success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Ready for Dashboard</h3>
                <p className="text-slate-400 mb-6">{file.name}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-medium"
                >
                  Upload Another
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="file"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <FileText size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{file.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                
                {isUploading && (
                  <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  {!isUploading && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="p-2 rounded-full hover:bg-white/10 text-slate-400"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        {file && !success && !isUploading && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleUpload}
            className="w-full mt-8 py-4 rounded-[1.5rem] bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-600/40 transition-all active:scale-[0.98]"
          >
            Start Analysis
          </motion.button>
        )}
      </div>
    </div>
  );
}
