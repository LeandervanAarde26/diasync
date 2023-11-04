import { Provider, createContext, useContext, useState } from "react";

type Sex = "Male" | "Female";
type DiabetesTypes = "Type 1" | "Type 2";

interface UserContextType {
  id: number;
  name: string;
  email: string;
  weight: number;
  height: number;
  type: DiabetesTypes;
  sex: Sex;
}

interface UserContext {
  values: UserContextType;
  setValues: (
    stateUpdater: (prevState: UserContextType) => UserContextType,
    action?: any
  ) => void;
  clearValues: () => void;
}

const defaults: UserContextType = {
  id: 0,
  name: "",
  email: "",
  weight: 0,
  height: 0,
  type: "Type 1",
  sex: "Male",
};

export const UserContext = createContext<UserContext>({
  values: defaults,
  setValues: () => {},
  clearValues: () => {},
});

export const UserContextProvider = ({ children }: any) => {
  const [values, setVals] = useState<UserContextType>(defaults);

  const setValues = (
    stateUpdater: (prevState: UserContextType) => UserContextType,
    action?: any
  ) => {
    setVals(stateUpdater);
    // console.log(values);
  };

  const clearValues = () => {
    setVals(defaults);
  };

  const contextValue: UserContext = {
    values: values,
    setValues,
    clearValues,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// L@v3nd3r
