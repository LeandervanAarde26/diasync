import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "@/Reusables/Variables";

export const togglePassword = (
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setState((prevType: boolean) => !prevType);
};

const validateInputs = (
  key: string,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  value: any
) => {
  let pattern;
  let result;
  switch (key) {
    case "firstname":
      pattern = namePattern;
      result = pattern.test(value);
      setState(!result);
      break;

    case "lastName":
      pattern = namePattern;
      result = pattern.test(value);
      setState(!result);
      break;

    case "email":
      pattern = emailPattern;
      result = pattern.test(value);
      setState(!result);
      break;

    case "password":
      pattern = passwordPattern;
      result = pattern.test(value);
      setState(!result);
      break;

    case "weight":
     
      if (+(value) < 2 || +(value) > 635) {
        setState(true);
      } else {
        setState(false);
      }
    case "height":
      if (+(value) < 45 || value > +(280)) {
        setState(true);
      } else {
        setState(false);
      }

    default:
      break;
  }
};

export const captureValues = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<any>>,
  error: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { name, value } = e.target;
  setState((prevValues: any) => ({
    ...prevValues,
    [name]: value,
  }));

  validateInputs(name, error, value);
};

export const updateLabels = (
  key: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  errorState: boolean,
  originalLabel: string,
  errorLabel: string
) => {
  if (errorState) {
    setState(errorLabel);
  } else {
    setState(originalLabel);
  }
};


