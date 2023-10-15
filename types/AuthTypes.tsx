import { type } from "os";

export type authenticationFields = {
    email: string;
    password: string;
  };
  
  export type tokenFields = {
    username: any;
    password: string;
  };
  
  export type token = {
    token: string;
  };


export type Sex = "Male" | "Female";
export type DiabetesTypes = "Type 1" | "Type 2";

export type RegisterType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  weight: number;
  height: number;
  type: DiabetesTypes;
  sex: Sex;
  data?:  FileList | null ;
}