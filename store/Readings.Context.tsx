import { Provider, createContext, useContext, useState } from "react";

interface DataContextType {
  date: string;
  time: string;
  blood_sugar_level: string;
}

interface ReadingsContext {
  dat: DataContextType[]; // Change this to an array
  setDat: (
    stateUpdater: (prevState: DataContextType[]) => DataContextType[], // Change this as well
    action?: any
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

export const ReadingsContextProvider = ({ children }: any) => {
  const [dat, setData] = useState<DataContextType[]>([]); // Initialize with an array containing the default object

  const setDat = (
    stateUpdater: (prevState: DataContextType[]) => DataContextType[],
    action?: any
  ) => {
    setData(stateUpdater);
    console.log(dat);
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
