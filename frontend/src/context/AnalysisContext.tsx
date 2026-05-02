"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface AnalysisData {
  filename: string;
  roles: Record<string, number>;
  skills: Skill[];
  ats_score: number;
  feedback: string[];
}

interface AnalysisContextType {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
