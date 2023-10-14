import Image from "next/image";
import logo from "../assets/Diasync_logo.png";
import AuthContainer from "@/components/Features/AuthContainer";
import Input from "@/components/Common/Input.component";
import { MdPerson4, MdKey } from "react-icons/md";
import Button from "@/components/Common/Button";
import { useState } from "react";
import Link from "next/link";
import data from "@/static/Auth.json";
import {
  captureValues,
  togglePassword,
  updateLabels,
} from "@/Reusables/Functions";
import { loginUser, obtainUserToken } from "@/api/Calls";
import { useRouter } from "next/router";

const defaultValues = {
  email: "",
  password: "",
};
function index() {
  const [type, setType] = useState<boolean>(true);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [values, setValues] = useState(defaultValues);
  const { email, password } = values;
  const [emailLabel, setEmailLabel] = useState<string>("Email");
  const [passwordLabel, setPasswordLabel] = useState<string>("Password");
  const [unauth, setUnAuth] = useState(false);
  const router = useRouter();

  const toggleInput = () => {
    togglePassword(setType);
  };

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
      const user = await loginUser({ email, password });

      if (user.token !== null && user.user !== null) {
        const token = await obtainUserToken({
          username: user.user.username,
          password,
        });
        window.sessionStorage.setItem("token", token.access);
        router.push("/home");
        setUnAuth(false);
      }
    } catch (error: any) {
      // Login failed
      console.log(error);
      setUnAuth(true);
      if (error.response && error.response.status === 401) {
        console.log("UNAUTHORISED");
      }
    }
  };

  const handleChange =
    (error: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      captureValues(e, setValues, error);
      console.log(values);
    };

  return (
    <div className="flex flex-1 h-screen bg-cswhite">
      {/* Right Container */}
      <div className="bg-csblack h-screen w-full sm:w-[45%] flex flex-col items-center justify-center p-6 gap-y-12 sm: gap-y-8">
        <Image src={logo} height={150} alt="Logo" />
        <h3 className="text-[20pt] sm:text-[28pt]">{data.login}</h3>

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
        {/* Inner container for inputs */}
      </div>
      {/* Left container */}

      <AuthContainer />
    </div>
    // Outer div
  );
}

export default index;
