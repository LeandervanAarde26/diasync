import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "@/Reusables/Variables";
import { verifyUserToken } from "@/api/Calls";
import { MonthName } from "@/types/MonthNames";




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

interface TokenData {
  userId: string; 
}

export const timeToSecondsConversion = (time: string) => {
  const [hours, minutes, seconds] = time.split(':');
  const totalSeconds  = (+hours) * 60 * 60 + (+minutes) *60 + (+seconds)
  console.log(totalSeconds)
  return totalSeconds;
}

export const getMonthName = (date: any) => {
  return date.toLocaleString('default', { month: 'long' }) as MonthName;
}

export const getDataAndParseJson = async (get: () => Promise<any>) => {
  const data = await get();
  const jsonStart = data.Response.indexOf("{");
  const jsonEnd = data.Response.lastIndexOf("}");
  const jsonResponse = data.Response.substring(
    jsonStart,
    jsonEnd + 1
  );
  console.log('====================================');
  console.log(jsonResponse);
  console.log(data.Response);
  console.log('====================================');
  const parsedData = JSON.parse(jsonResponse);

  return parsedData;
}

