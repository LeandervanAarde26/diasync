import Input from "@/components/Common/Input.component";
import { MdPerson4, MdKey } from "react-icons/md";
import Button from "@/components/Button";
import { useState, useContext } from "react";
import { RegisterContext } from "@/store/Register.Context";
import { captureValues, togglePassword } from "@/Reusables/Functions";

function RegisterStepOne() {
  const { values, setValues } = useContext(RegisterContext);
  const { firstname, lastName, email, password, confirmPassword } = values;
  const [type, setType] = useState<boolean>(true);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

  const [firstNameLabel, setFirstNameLabel] = useState<string>("First Name");
  const [lastNameLabel, setLastNameLabel] = useState<string>("Last Name");
  const [emailLabel, setEmailLabel] = useState<string>("Email");
  const [passwordLabel, setPasswordLabel] = useState<string>("Password");
  const [confirmPasswordLabel, setConfirmPasswordLabel] =
    useState<string>("Confirm Password");

    const [error, setError] = useState<boolean>(false);
  const togglePasswordInput = () => {
    togglePassword(setType);
  };

  const onChangeHandler = (error: React.Dispatch<React.SetStateAction<boolean>>) =>(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    captureValues(e, setValues, error);
  };

  return (
    <>
      <h5>Step 1 of 2</h5>
      <div className="flex flex-row flex-wrap gap-x-5 w-full ">
        <Input
          err={firstNameError}
          width="fit"
          label={firstNameLabel}
          blur={() => {}}
          name="firstname" // Use "firstname" here
          change={onChangeHandler(setFirstNameError)}
          type="text"
          placeholder="eg. John"
          icon={
            <MdPerson4
              key="person-icon"
              className="text-cspurple"
              fontSize={22}
            />
          }
          value={firstname}
        />

        <Input
          err={lastNameError}
          width="fit"
          label={lastNameLabel}
          blur={() => {}}
          name="lastName" // Use "lastName" here
          change={onChangeHandler(setLastNameError)}
          type="text"
          placeholder="eg. Doe"
          icon={
            <MdPerson4
              key="person-icon"
              className="text-cspurple"
              fontSize={22}
            />
          }
          value={lastName}
        />
      </div>

      <Input
        err={emailError}
        width="screen"
        label={emailLabel}
        blur={() => {}}
        name="email"
        change={onChangeHandler(setEmailError)}
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
        err={passwordError}
        width="screen"
        label={passwordLabel}
        blur={() => {}}
        name="password"
        change={onChangeHandler(setPasswordError)}
        type={type ? "password" : "text"}
        placeholder="eg. P@$$W0Rd54"
        icon={
          <MdKey
            key="password-icon"
            className="text-cspurple"
            fontSize={22}
            onClick={togglePasswordInput}
          />
        }
        value={password}
      />

      <Input
        err={confirmPasswordError}
        width="screen"
        label={confirmPasswordLabel}
        blur={() => {}}
        name="confirmPassword"
        change={onChangeHandler(setConfirmPasswordError)}
        type="password"
        placeholder="eg. P@$$W0Rd54"
        icon={
          <MdKey key="password-icon" className="text-cspurple" fontSize={22} />
        }
        value={confirmPassword}
      />

      <div className="flex items-center justify-center">
        <Button
          label="Continue"
          type="primary"
          clickHandler={() => console.log("Hey there")}
        />
      </div>
      {/* Container to center the button */}

      {/* Inner container for inputs */}
    </>
  );
}

export default RegisterStepOne;
