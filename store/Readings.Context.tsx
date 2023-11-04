import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
  id: number;
  date: string;
  time: string;
  blood_sugar_level: string;
}

interface ReadingsContext {
  dat: DataContextType[];
  setDat: (
    stateUpdater: (prevState: DataContextType[]) => DataContextType[]
  ) => void;
  clearDat: (
  ) => void;
}

export const ReadingsContext = createContext<ReadingsContext>({
  dat: [],
  setDat: () => {},
  clearDat: () => {},
});

export const ReadingsContextProvider = ({ children }: any) => {
  const [dat, setData] = useState<DataContextType[]>([]);
  const defaults: DataContextType = {
    id: 0,
    date: "",
    time: "",
    blood_sugar_level: "",
  };

  const setDat = (
    stateUpdater: (prevState: DataContextType[]) => DataContextType[],
    action?: any
  ) => {
    setData((prevData) => stateUpdater(prevData));
  };

  const clearDat =(() => {setData([])});

  const contextValue: ReadingsContext = {
    dat,
    setDat,
    clearDat
  };

  return (
    <ReadingsContext.Provider value={contextValue}>
      {children}
    </ReadingsContext.Provider>
  );
};
