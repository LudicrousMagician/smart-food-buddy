import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Ingredient {
  name: string;
  safety: 'safe' | 'moderate' | 'unsafe';
  reason?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface AnalysisResult {
  id: string;
  foodName: string;
  imageUrl: string;
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  warnings: string[];
  analyzedAt: string;
}

interface AnalysisContextType {
  currentAnalysis: AnalysisResult | null;
  analysisHistory: AnalysisResult[];
  setCurrentAnalysis: (analysis: AnalysisResult) => void;
  addToHistory: (analysis: AnalysisResult) => void;
  clearCurrentAnalysis: () => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem('analysisHistory');
    if (storedHistory) {
      setAnalysisHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addToHistory = (analysis: AnalysisResult) => {
    const updatedHistory = [analysis, ...analysisHistory].slice(0, 20); // Keep last 20
    setAnalysisHistory(updatedHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
  };

  const clearCurrentAnalysis = () => {
    setCurrentAnalysis(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        analysisHistory,
        setCurrentAnalysis,
        addToHistory,
        clearCurrentAnalysis,
        isAnalyzing,
        setIsAnalyzing,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

// Mock analysis data generator for demo
export const generateMockAnalysis = (foodName: string, imageUrl: string): AnalysisResult => {
  const mockIngredients: Ingredient[] = [
    { name: 'Wheat Flour', safety: 'safe' },
    { name: 'Sugar', safety: 'moderate', reason: 'High glycemic index' },
    { name: 'Palm Oil', safety: 'moderate', reason: 'High in saturated fats' },
    { name: 'Salt', safety: 'safe' },
    { name: 'Artificial Colors', safety: 'unsafe', reason: 'May cause allergic reactions' },
    { name: 'Preservatives (E211)', safety: 'moderate', reason: 'Sodium benzoate' },
  ];

  const mockNutrition: NutritionInfo = {
    calories: Math.floor(Math.random() * 300) + 100,
    protein: Math.floor(Math.random() * 15) + 2,
    carbohydrates: Math.floor(Math.random() * 40) + 10,
    fat: Math.floor(Math.random() * 20) + 3,
    fiber: Math.floor(Math.random() * 5) + 1,
    sugar: Math.floor(Math.random() * 15) + 2,
    sodium: Math.floor(Math.random() * 500) + 100,
  };

  const mockWarnings = [
    'Contains gluten - not suitable for celiac patients',
    'High sugar content - diabetics should consume in moderation',
    'Contains artificial preservatives',
  ];

  return {
    id: Date.now().toString(),
    foodName: foodName || 'Food Product',
    imageUrl,
    ingredients: mockIngredients,
    nutrition: mockNutrition,
    warnings: mockWarnings,
    analyzedAt: new Date().toISOString(),
  };
};
