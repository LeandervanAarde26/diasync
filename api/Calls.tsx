import {
  RegisterType,
  authenticationFields,
  tokenFields,
} from "@/types/AuthTypes";
import axios from "axios";
import cookies from "next/headers";

const url = process.env.NEXT_PUBLIC_DJANGO_URL;

export const obtainUserToken = async ({ username, password }: tokenFields) => {
  let loginReq = `${url}token/`;
  const requestData = await axios.post(loginReq, { username, password });
  if (requestData.status === 200) {
    return requestData.data;
  } else if (requestData.status === 401) {
    // Incorrect username or password
    throw new Error("Token not given");
  } else {
    // Handle other error statuses, if needed
    throw new Error("Token obtaining failed with an unexpected error");
  }
};

export const verifyUserToken = async (token: string) => {
  const loginReq = `${url}token/verify/`;
  const requestData = await axios.post(loginReq, { token });

  if (requestData.status === 200) {
    return true;
  } else if (requestData.status === 401) {
    return false;
  } else {
    // Handle other error statuses, if needed
    throw new Error("Failed to verify user token");
  }
};

export const loginUser = async ({ email, password }: authenticationFields) => {
  let loginReq = `${url}login/`;
  const requestData = await axios.post(loginReq, { email, password });

  if (requestData.status === 200) {
    // Login successful
    return requestData.data;
  } else if (requestData.status === 401) {
    // Incorrect username or password
    throw new Error("Invalid username or password");
  } else {
    // Handle other error statuses, if needed
    throw new Error("Login failed with an unexpected error");
  }
};

export const registerNewUser = async (reqData: RegisterType) => {
  try {
    let regReq = `${url}register/`;
    const request = await axios.post(
      regReq,
      JSON.stringify({
        ...reqData,
        diabetes_type: reqData.type,
        data: reqData.data,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (request.status === 201) {
      console.log("User registered success");
      return reqData;
    } else {
      console.log("registration failed..");
    }
  } catch (error) {
    throw new Error("Registration of new user failed, try again later");
  }
};

// Re1nH@rdt
