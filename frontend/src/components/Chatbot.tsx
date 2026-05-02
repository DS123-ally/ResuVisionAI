"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI career advisor. How can I help you improve your resume today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "That's a great question! Based on current industry trends, I recommend focusing on quantifying your impact with specific numbers and metrics. Would you like me to analyze a specific section of your resume?" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-blue-600/20 p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                <Bot size={18} />
              </div>
              <span className="font-semibold text-white">Career Advisor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white",
                  m.role === "user" ? "bg-slate-700" : "bg-blue-600"
                )}>
                  {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={cn(
                  "rounded-2xl px-4 py-2 text-sm leading-relaxed",
                  m.role === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-white/90"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-full border-none bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-opacity hover:opacity-90"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
