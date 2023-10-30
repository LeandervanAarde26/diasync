import { Provider, createContext, useContext, useState } from "react";

interface ComplicationsContextType {
  heading: string;
  body: string;
  url: string;
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
