import AuthContainer from "@/components/partial/AuthContainer";
import Image from "next/image";
import logo from "../assets/Diasync_logo.png";
import Input from "@/components/Common/Input.component";
import { MdPerson4, MdKey } from "react-icons/md";
import Button from "@/components/Button";
import { useState, useContext } from "react";
import { emailPattern, passwordPattern } from "@/Reusables/Variables";
import Link from "next/link";
import data from "@/static/Auth.json";
import { RegisterContext } from "@/store/Register.Context";

function Register() {
  const { values, setValues } = useContext(RegisterContext);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-1 h-screen bg-cswhite ">
      <AuthContainer />

      <div className="bg-csblack h-screen w-full sm:w-[45%] flex flex-col items-center justify-center p-6 gap-y-12 sm: gap-y-8">
        <Image src={logo} height={150} alt="Logo" />
        <h3 className="text-[20pt] sm:text-[28pt]">{data.register}</h3>

        <Input
          err={false}
          width="100%"
          label="First Name"
          blur={() => null}
          name="firstname"
          change={onChangeHandler}
          type="text"
          placeholder="eg. John Doe"
        />

        <div className="flex flex-col gap-y-4 w-full sm:w-[60%]">
          <div className="flex items-center justify-center">
            <Button label="Continue" type="primary" clickHandler={() => null} />
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
                label="Log into my account"
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
    </div>
  );
}

export default Register;
