import Image from "next/image";
import logo from "../assets/Diasync_logo.png";
import AuthContainer from "@/components/Features/AuthContainer";
import Input from "@/components/Common/Input.component";
import { MdPerson4, MdKey } from "react-icons/md";
import Button from "@/components/Common/Button";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import data from "@/static/Auth.json";

import {
  captureValues,
  getDataAndParseJson,
  getMonthName,
  togglePassword,
  updateLabels,
} from "@/Reusables/Functions";
import {
  getComplications,
  getDataAnalysed,
  getUserReadings,
  loginUser,
  obtainUserToken,
} from "@/api/Calls";
import { useRouter } from "next/router";
import { UserContext } from "@/store/userContext.Context";
import { ReadingsContext } from "@/store/Readings.Context";
import { ComplicationsContext } from "@/store/ComplicationsContext";
import { AnalysisContext } from "@/store/Analyse.Context";
import Loader from "@/components/Common/Loader";
const defaultValues = {
  email: "",
  password: "",
};
function index() {
  const [type, setType] = useState<boolean>(true);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [vals, setVals] = useState(defaultValues);
  const { email, password } = vals;
  const [emailLabel, setEmailLabel] = useState<string>("Email");
  const [passwordLabel, setPasswordLabel] = useState<string>("Password");
  const [unauth, setUnAuth] = useState(false);
  const router = useRouter();
  const { values, setValues } = useContext(UserContext);
  const { setComplications } = useContext(ComplicationsContext);
  const { setAnalysis } = useContext(AnalysisContext);
  const { setDat } = useContext(ReadingsContext);
  const [isDataReady, setDataReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toggleInput = () => {
    togglePassword(setType);
  };

  const now = new Date();
const currMonth = getMonthName(now);
const prevMonth = getMonthName(new Date(now.getFullYear(), now.getMonth() - 1));

  const handleBlur =
    (
      key: string,
      stateSetter: React.Dispatch<React.SetStateAction<string>>,
      errorState: boolean,
      originalLabel: string,
      errorLabel: string
    ) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      updateLabels(key, stateSetter, errorState, originalLabel, errorLabel);

      console.log(stateSetter);
    };

  const handleClick = async () => {
    try {
      //Login and token authentication
      setLoading((prev) => !prev);
      const user = await loginUser({ email, password });
      const { firstname, username, id } = user.user;
      const token =
        user.user !== null
          ? await obtainUserToken({ username: username, password: password })
          : null;
      setValues(() => ({
        id: id,
        name: firstname,
        email: email,
        weight: 0,
        height: 0,
        type: "Type 1",
        sex: "Male",
      }));
      const userD = await getUserReadings(id);
      console.log(userD);
      const { status, data } = userD;
      if (status == 200) {
        console.log("data has been fetched");
        const useableData = await data.map((i: any) => ({
          id: i.user.id,
          blood_sugar_level: i.blood_sugar_level,
          date: i.date,
          time: i.time,
        }));
        setDat((prevValues: any) => [...prevValues, ...useableData]);
        const AiComplications = await getDataAndParseJson(() =>
          getComplications(values.id)
        );
        const AiAnalysis = await getDataAndParseJson(() =>
          getDataAnalysed(values.id)
        );
        setAnalysis(prevValues => {
          return {
            ...prevValues,
            ...AiAnalysis
          }
      })

        setComplications((prevValues: any) => [...prevValues, AiComplications]);
        window.sessionStorage.setItem("token", token.access);
        router.push("/home");

        setUnAuth(false);
        setLoading((prev) => !prev);
      }
    } catch (error: any) {
      setLoading(false);
      // Login failed
      console.log(error);
      setUnAuth(true);
      if (error.response && error.response.status === 401) {
        console.log("UNAUTHORISED");
      }
    }
  };

  useEffect(() => {
    if (isDataReady) {
      router.push("/home");
    }
  }, [isDataReady, router]);

  const handleChange =
    (error: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      captureValues(e, setVals, error);
      console.log(vals);
    };

  return (
    <div className="flex flex-1 h-screen bg-cswhite">
      {/* Right Container */}
      <div className="bg-csblack h-screen w-full sm:w-[45%] flex flex-col items-center justify-center p-6 gap-y-12 sm: gap-y-8">
        <Image src={logo} height={150} alt="Logo" />
        {loading ? null : (
          <h3 className="text-[20pt] sm:text-[28pt]">{data.login}</h3>
        )}
        {loading ? (
          <Loader msg={`Loading ${values.name}'s data...`} />
        ) : (
          <>
            {unauth ? (
              <p className={`text-csDanger`}>
                Invalid Credentials, please log in with your account details or
                contact support.
              </p>
            ) : null}
            <div className="flex flex-col gap-y-4 w-full sm:w-[60%]">
              <Input
                err={emailErr}
                width="100%"
                label={emailLabel}
                blur={handleBlur(
                  "email",
                  setEmailLabel,
                  emailErr,
                  "Email",
                  "Invalid email"
                )}
                name="email"
                change={handleChange(setEmailErr)}
                type="text"
                placeholder="eg. John@Doe.com"
                icon={
                  <MdPerson4
                    key="person-icon"
                    className="text-cspurple"
                    fontSize={22}
                  />
                }
                value={email}
              />

              <Input
                err={passwordErr}
                change={handleChange(setPasswordErr)}
                label={passwordLabel}
                blur={handleBlur(
                  "password",
                  setPasswordLabel,
                  passwordErr,
                  "Password",
                  "Passwords must contain 8 characters, 1 lowercase, 1 uppercase and a special character"
                )}
                width="100%"
                name="password"
                type={type ? "password" : "text"}
                placeholder="eg. P@$$W0Rd54"
                value={password}
                icon={
                  <MdKey
                    key="password-icon"
                    className="text-cspurple"
                    fontSize={22}
                    onClick={toggleInput}
                  />
                }
              />

              <div className="flex items-center justify-center">
                <Button
                  label="Log into my account"
                  type="primary"
                  clickHandler={handleClick}
                />
              </div>
              {/* Container to center the button */}
              <span className="text-cswhite text-center ">
                Forgot your password?
              </span>
              <div className="flex items-center">
                <hr className="flex-grow bg-cswhite h-0.5" />
                <span className="text-cswhite mx-2">Or</span>
                <hr className="flex-grow bg-cswhite h-0.5" />
              </div>

              <div className="flex items-center justify-center">
                <Link href="/Register">
                  <Button
                    label="Register a new account"
                    type="outline"
                    clickHandler={() => {
                      console.log("implement this function");
                    }}
                  />
                </Link>
              </div>
            </div>
          </>
        )}
        {/* Inner container for inputs */}
      </div>
      {/* Left container */}

      <AuthContainer />
    </div>
    // Outer div
  );
}

export default index;
