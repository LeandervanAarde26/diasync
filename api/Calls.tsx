import {
  RegisterType,
  authenticationFields,
  tokenFields,
} from "@/types/AuthTypes";
import axios from "axios";
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
  console.log(loginReq)
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

    console.log(requestData.data);

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
    console.log(regReq)
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

export const getUserInformation = async (id: number) => {
  let requestURL = `${url}users/${id}/`;
  console.log(requestURL);
  const request: any = await axios
    .get(requestURL)
    .then((res) => {
      console.log(res);
      console.log("User fetched");
      return res.data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });

  return request;
};

export const getUserReadings = async (id: number) => {
  let requestURL = `${url}data/?userid=${id}`;
  const request: any = await axios
    .get(requestURL)
    .then((res) => {
      console.log("User data fetched");
      return res;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });

  return request;
};

export const getComplications = async (id: number) => {
  let requestURL = `${url}complications/?userid=${id}`;
  let request: any = await axios
    .get(requestURL)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return request;
};

export const getDataAnalysed = async (id: number) => {
  let requestURL = `${url}analyse/?userid=${id}`;
  let request = await axios
    .get(requestURL)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return request;
};

export const uploadNewData = async (id: number, data: any) => {
  let requestURL = `${url}uploadData/?userid=${id}`;
  // console.log(request);
  console.log(requestURL);
  let request = await axios
    .post(
      requestURL,
      JSON.stringify({
        data,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("failed err " + err);
      return null;
    });

  return request;
};

export const getRobotResponse = async (body: string) => {
  let requestURL = `${url}chat/`;
  let request = await axios
  .post(requestURL, JSON.stringify({
    message: body,
  }),
  {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => {
      console.log(res)
      return res;
  })
  .catch(err => {
    console.log(err);
    return null
  });

  return request
}
// Re1nH@rdt
//R1a@n432
