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
}

const defaults: DataContextType = {
  id: 0,
  date: "",
  time: "",
  blood_sugar_level: "",
};

export const ReadingsContext = createContext<ReadingsContext>({
  dat: [],
  setDat: () => {},
});


export const ReadingsContextProvider = ({
  children,
}: any) => {
  const [dat, setData] = useState<DataContextType[]>([]);

  const setDat = (
    stateUpdater: (prevState: DataContextType[]) => DataContextType[],
    action?: any
  ) => {
    setData((prevData) => stateUpdater(prevData));
  };

  const contextValue: ReadingsContext = {
    dat,
    setDat,
  };

  return (
    <ReadingsContext.Provider value={contextValue}>
      {children}
    </ReadingsContext.Provider>
  );
};
