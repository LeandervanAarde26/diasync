import Image from "next/image";
import logo from "../assets/Diasync_logo.png";
import AuthContainer from "@/components/partial/AuthContainer";
import Input from "@/components/Common/Input.component";
import { MdPerson4, MdKey } from "react-icons/md";
import Button from "@/components/Button";
import { useState } from "react";
import { emailPattern, passwordPattern } from "@/Reusables/Variables";
import Link from "next/link";
import data from "@/static/Auth.json";

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
  const [emailLabel, setEmailLabel] = useState<string>("Your email");
  const [passwordLabel, setPasswordLabel] = useState<string>("Password");

  const toggleInput = () => {
    setType((prevType) => !prevType);
  };

  const validateInputs = (key: string) => {
    switch (key) {
      case "email":
        const pattern = emailPattern;
        const result = pattern.test(email);
        setEmailErr(!result);
        break;

      case "password":
        const passPattern = passwordPattern;
        const passResult = passPattern.test(password);
        setPasswordErr(!passResult);
      default:
        break;
    }
  };

  const validityChecker = () => {
    if (!emailErr && !passwordErr) {
      return true;
    } else {
      return false;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name == "email" && emailErr) {
      setEmailLabel("Invalid Email entered");
    } else {
      setEmailLabel("Your email");
    }

    if (name == "password" && passwordErr) {
      setPasswordLabel(
        "Passwords must contain 8 characters, 1 lowercase, 1 uppercase and a special character"
      );
    } else {
      setPasswordLabel("Password");
    }
  };

  const handleClick = () => {
    console.log("success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInputs(name);
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  return (
    <div className="flex flex-1 h-screen bg-cswhite ">
      {/* Right Container */}
      <div className="bg-csblack h-screen w-full sm:w-[45%] flex flex-col items-center justify-center p-6 gap-y-12 sm: gap-y-8">
        <Image src={logo} height={150} alt="Logo" />
        <h3 className="text-[20pt] sm:text-[28pt]">{data.login}</h3>
        <div className="flex flex-col gap-y-4 w-full sm:w-[60%]">
          <Input
            err={emailErr}
            width="100%"
            label={emailLabel}
            blur={handleBlur}
            name="email"
            change={handleChange}
            type="text"
            placeholder="eg. John Doe"
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
            change={handleChange}
            blur={handleBlur}
            width="100%"
            name="password"
            label={passwordLabel}
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
