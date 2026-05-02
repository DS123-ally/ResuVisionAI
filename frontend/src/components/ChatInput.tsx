"use client";

import { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/context/AnalysisContext";

export function ChatInput() {
  const { analysisData } = useAnalysis();
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsThinking(true);
    setInput("");

    try {
      const formData = new FormData();
      formData.append("query", userMessage);
      formData.append("context", JSON.stringify(analysisData || {}));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/v1/chat`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting to the AI brain." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Network error. Is the backend running?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Message History */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-3 animate-in fade-in slide-in-from-bottom-2",
            msg.role === 'user' ? "flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-white/10 text-white/50" : "bg-blue-600 text-white"
            )}>
              {msg.role === 'user' ? "U" : <Sparkles size={14} />}
            </div>
            <div className={cn(
              "px-4 py-2 rounded-2xl text-sm max-w-[80%]",
              msg.role === 'user' ? "bg-white/5 text-white" : "bg-blue-600/10 text-white/90 border border-blue-600/20"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-white/5 rounded-full w-3/4" />
              <div className="h-4 bg-white/5 rounded-full w-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md focus-within:border-blue-500/50 transition-all">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
            <Sparkles size={18} />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={analysisData ? "Ask about your resume..." : "Upload a resume first for context..."}
            className="flex-1 bg-transparent border-none px-2 py-2 text-sm text-white placeholder:text-white/30 focus:ring-0 outline-none"
            disabled={isThinking}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
              input.trim() && !isThinking 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:scale-105" 
                : "bg-white/5 text-white/20"
            )}
          >
            {isThinking ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
