import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import { AnalysisProvider } from "@/context/AnalysisContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResuVision AI | Smart Resume Analysis",
  description: "AI-powered platform for resume extraction, skill analysis, and career advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased selection:bg-blue-500/30`}>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f615,transparent)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_50%,#10b98108,transparent)] pointer-events-none" />
        <AnalysisProvider>
          <Navbar />
          <main className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
          <Chatbot />
        </AnalysisProvider>
      </body>
    </html>
  );
}
