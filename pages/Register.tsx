import AuthContainer from "@/components/Features/AuthContainer";
import Image from "next/image";
import logo from "../assets/Diasync_logo.png";
import registerData from "@/static/Auth.json";
import RegisterStepOne from "@/components/Features/RegisterStepOne.component";
import Button from "@/components/Common/Button";
import Link from "next/link";
import { useState, useContext } from "react";
import RegisterStepTwo from "@/components/Features/RegisterStepTwo.component";
import { RegisterContext } from "@/store/Register.Context";
import { registerNewUser } from "@/api/Calls";
import { useRouter } from "next/router";
function Register() {
  const [moveOn, setMoveOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const { values } = useContext(RegisterContext);
  const {
    firstname,
    lastName,
    email,
    password,
    confirmPassword,
    weight,
    height,
  } = values;

  const goToNextStep = () => {
    setMoveOn((prev: boolean) => !prev);
  };

  const stepOneMissingFields =
    firstname == "" ||
    lastName == "" ||
    email == "" ||
    password == "" ||
    confirmPassword == "";

  const stepTwoMissingFields = weight == 0 || height == 0;

  const reigsterNewAccount = async () => {
    try {
      setLoading(prev => !prev);
      const parsedData = {
        first_name: firstname,
        last_name: lastName,
        ...values,
      };
      const newUser = await registerNewUser(parsedData);
      if (newUser) {
        console.log(newUser);
        console.log("---------------");
        console.log("success!");
        setLoading(prev => !prev);
        router.push('/'); 
      }
    } catch (error) {
      console.log("There was an error that occured", error);
      setError(prev => !prev);
    }
  };

  return (
    <div className="flex flex-1 h-screen bg-cswhite">
      <AuthContainer />
      {/* Right Container */}
      <div className="bg-csblack h-max w-full sm:w-[45%] sm:h-screen flex flex-col items-center justify-center p-6 gap-y-10 sm: gap-y-4 ">
        <Image src={logo} height={100} alt="Logo" />
        <h3 className="text-[18pt] sm:text-[20pt]">
          {moveOn ? "" : registerData.register}
        </h3>

        { error &&
          <p className="text-csDanger">*There was an error, please try again later</p>
        }
        <div className="flex flex-col gap-y-4 w-full sm:w-[60%] overflow-scroll">
          {moveOn ? <RegisterStepTwo /> : <RegisterStepOne />}

          <div className="flex items-center justify-center">
            <Button
              label={moveOn ? "Register account" : "Continue"}
              type="primary"
              clickHandler={
                moveOn
                  ? stepTwoMissingFields
                    ? () => console.log("Null")
                    : reigsterNewAccount
                  : goToNextStep
              }
              disabled={stepOneMissingFields}
            />
          </div>

          <div className="flex items-center">
            <hr className="flex-grow bg-cswhite h-0.5" />
            <span className="text-cswhite mx-2">Or</span>
            <hr className="flex-grow bg-cswhite h-0.5" />
          </div>

          <div className="flex items-center justify-center">
            <Link href="/">
              <Button
                label="Login to my account"
                type="outline"
                clickHandler={() => {
                  console.log("Navigating to login");
                }}
              />
            </Link>
          </div>
        </div>
      </div>
      {/* Left container */}
    </div>
    // Outer div
  );
}
export default Register;
