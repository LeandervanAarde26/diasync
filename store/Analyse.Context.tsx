import { getMonthName } from "@/Reusables/Functions";
import { Provider, createContext, useContext, useState } from "react";
import { ComplicationsContext } from "./ComplicationsContext";

type AnalysisData = {
  stable: number;
  low: number;
  high: number;
  unstable: number;
};

type DietarySuggestion = {
  heading: string;
  description: string;
  link: string;
};

type AnalysisSuggestion = {
  heading: string;
  description: string;
  link: string;
};

interface AnalyseContextType {
  analysisData: { [month: string]: AnalysisData };
  Observation: string;
  DietarySuggestions: DietarySuggestion[];
  AnalysisSuggestions: AnalysisSuggestion[];
}

interface AnalysisContext {
  analysis: AnalyseContextType;
  setAnalysis: (
    stateUpdater: (prevState: AnalyseContextType) => AnalyseContextType
  ) => void;
  clearAnalysis: () => void;
}

export const AnalysisContext = createContext<AnalysisContext>({
  analysis: {
    analysisData: {},
    Observation: '',
    DietarySuggestions: [],
    AnalysisSuggestions: [],
  },
  setAnalysis: () => {},
  clearAnalysis: () => {},
});

export const AnalysisProvider = ({ children }: any) => {
  const [analysis, setAnalise] = useState<AnalyseContextType>({
    analysisData: {},
    Observation: '',
    DietarySuggestions: [],
    AnalysisSuggestions: [],
  });

  const setAnalysis = (
    stateUpdater: (prevState: AnalyseContextType) => AnalyseContextType,
    action?: any
  ) => {
    setAnalise((newData) => stateUpdater(newData));
  };

  const clearAnalysis = () => {
    setAnalise({
      analysisData: {},
      Observation: '',
      DietarySuggestions: [],
      AnalysisSuggestions: [],
    });
  };

  const contextValue: AnalysisContext = {
    analysis,
    setAnalysis,
    clearAnalysis,
  };

  return (
    <AnalysisContext.Provider value={contextValue}>
      {children}
    </AnalysisContext.Provider>
  );
};
