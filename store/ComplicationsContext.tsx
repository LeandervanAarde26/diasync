import { Provider, createContext, useContext, useState } from "react";

type ComplicationType = {
  heading: string;
  body: string;
  url: string;
}

type DistrbutionType = {
  stable: number;
  high: number;
  low: number;
}


interface ComplicationsContextType{
  complications: ComplicationType[];
  blood_sugar_distribution: DistrbutionType
  blood_sugar_status: string;
}

interface ComplicationsContext {
  complications: ComplicationsContextType[];
  setComplications: (
    stateUpdater: (
      prevState: ComplicationsContextType[]
    ) => ComplicationsContextType[]
  ) => void;
  clearComplications: () => void;
}

export const ComplicationsContext = createContext<ComplicationsContext>({
  complications: [],
  setComplications: () => {},
  clearComplications: () => {},
});

export const ComplicationsProvider = ({ children }: any) => {
  const [complications, setComps] = useState<ComplicationsContextType[]>([]);
  const setComplications = (
    stateUpdater: (
      prevState: ComplicationsContextType[]
    ) => ComplicationsContextType[],
    action?: any
  ) => {
    setComps((prevData) => stateUpdater(prevData));
  };

  const clearComplications = () => {
    setComps([]);
  };
  const contextValue: ComplicationsContext = {
    complications,
    setComplications,
    clearComplications,
  };

  return (
    <ComplicationsContext.Provider value={contextValue}>
      {children}
    </ComplicationsContext.Provider>
  );
};
