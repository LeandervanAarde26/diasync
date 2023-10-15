import { Provider, createContext, useContext, useState } from "react";

type Sex = "Male" | "Female";
type DiabetesTypes = "Type 1" | "Type 2";

interface RegisterContextType {
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  weight: number;
  height: number;
  type: DiabetesTypes;
  sex: Sex;
  data?:  File | null ;
}

interface RegisterContext {
  values: RegisterContextType;
  setValues: (
    stateUpdater: (prevState: RegisterContextType) => RegisterContextType,
    action?: any
  ) => void;
}

const defaults: RegisterContextType = {
  firstname: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  weight: 0,
  height: 0,
type: "Type 1",
  sex: "Male",
  data: undefined,
};

export const RegisterContext = createContext<RegisterContext>({
  values: defaults,
  setValues: () => {},
});

export const RegisterContextProvider = ({ children }: any) => {
  const [values, setVals] = useState<RegisterContextType>(defaults);

  const setValues = (
    stateUpdater: (prevState: RegisterContextType) => RegisterContextType,
    action?: any
  ) => {
    setVals(stateUpdater);
    console.log(values);
  };

  const contextValue: RegisterContext = {
    values: values,
    setValues,
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};


// L@v3nd3r