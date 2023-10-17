import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
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
  date: "",
  time: "",
  blood_sugar_level: "",
};

export const ReadingsContext = createContext<ReadingsContext>({
  dat: [defaults],
  setDat: () => {},
});

interface ReadingsContextProviderProps {
  children: ReactNode;
}

export const ReadingsContextProvider = ({
  children,
}: ReadingsContextProviderProps) => {
  const [dat, setData] = useState<DataContextType[]>([defaults]);

  const setDat = (
    stateUpdater: (prevState: DataContextType[]) => DataContextType[]
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
