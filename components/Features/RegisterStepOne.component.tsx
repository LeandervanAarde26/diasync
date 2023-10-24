import Input from "@/components/Common/Input.component";
import { MdPerson4, MdKey, MdEmail} from "react-icons/md";
import { useState, useContext } from "react";
import { RegisterContext } from "@/store/Register.Context";
import { captureValues, togglePassword, updateLabels } from "@/Reusables/Functions";

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

  const onChangeHandler =
    (error: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      captureValues(e, setValues, error);
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

  const handleClick = () => {
    console.log("Hey");
  };

  const comparePasswords = () => {
    if (confirmPassword.valueOf() !== password.valueOf()) {
      setConfirmPasswordError(true);
      setConfirmPasswordLabel("Passwords don't match");
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordLabel("Confirm Password");
    }
  };
  


  return (
    <>
      <h5>Step 1 of 2</h5>
      <div className="flex flex-row flex-wrap gap-x-5 w-full ">
        <Input
          err={firstNameError}
          width={""}
          label={firstNameLabel}
          blur={handleBlur(
            "firstname",
            setFirstNameLabel,
            firstNameError,
            "First Name",
            "Invalid First Name"
          )}
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
          width={""}
          label={lastNameLabel}
          blur={handleBlur(
            "lastName",
            setLastNameLabel,
            lastNameError,
            "Last Name",
            "Invalid Last Name"
          )}
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
  width={""}
  label={emailLabel}
  blur={handleBlur(
    "email",
    setEmailLabel,
    emailError,
    "Email",
    "Invalid Email"
  )}
  name="email"
  change={onChangeHandler(setEmailError)}
  type="text"
  placeholder="eg. John@Doe.com"
  icon={
    <MdEmail
      key="person-icon"
      className="text-cspurple"
      fontSize={22}
    />
  }
  value={email}
/>


      <Input
        err={passwordError}
        width={""}
        label={passwordLabel}
        blur={handleBlur(
          "password",
          setPasswordLabel,
          passwordError,
          
          "Password",
          "Passwords must contain 8 characters, 1 lowercase, 1 uppercase and a special character"
        )}
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
        width={""}
        label={confirmPasswordLabel}
        blur={comparePasswords}
        name="confirmPassword"
        change={onChangeHandler(setConfirmPasswordError)}
        type="password"
        placeholder="eg. P@$$W0Rd54"
        icon={
          <MdKey key="password-icon" className="text-cspurple" fontSize={22} />
        }
        value={confirmPassword}
      />
      {/* Container to center the button */}

      {/* Inner container for inputs */}
    </>
  );
}

export default RegisterStepOne;
