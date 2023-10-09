import AuthContainer from "@/components/partial/AuthContainer";
import Image from "next/image";
import logo from "../assets/Diasync_logo.png";
import data from "@/static/Auth.json";
import RegisterStepOne from "@/components/partial/RegisterStepOne.component";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import RegisterStepTwo from "@/components/partial/RegisterStepTwo.component";
function Register() {
  const [moveOn, setMoveOn] = useState<boolean>(false);

  const goToNextStep = () => {
    setMoveOn((prev: boolean) => !prev);
  };
  return (
    <div className="flex flex-1 h-screen bg-cswhite">
      <AuthContainer />
      {/* Right Container */}
      <div className="bg-csblack h-max w-full sm:w-[45%] sm:h-screen flex flex-col items-center justify-center p-6 gap-y-12 sm: gap-y-4">
        <Image src={logo} height={130} alt="Logo" />
        <h3 className="text-[20pt] sm:text-[28pt]">
          {moveOn ? "" : data.register}
        </h3>

        <div className="flex flex-col gap-y-4 w-full sm:w-[60%]">
          {moveOn ? <RegisterStepTwo /> : <RegisterStepOne />}

          <div className="flex items-center justify-center">
            <Button
              label= {moveOn ? "Register account" : "Continue"}
              type="primary"
              clickHandler={moveOn ? () => console.log("Account create") : goToNextStep}
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
                  console.log("implement this function");
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
