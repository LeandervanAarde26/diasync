import { MdPerson4, MdKey } from "react-icons/md";
import Input from "../Common/Input.component";
import ToggleButton from "../Common/ToggleButton.component";
import Button from "../Button";

function RegisterStepTwo() {
  return (
    <>
      <h5>Step 2 of 2</h5>
      <div className="flex flex-row flex-wrap gap-x-5 w-full ">
        <Input
          err={false}
          width="fit"
          label={"Something"}
          blur={() => {}}
          name="firstname" // Use "firstname" here
          change={() => {}}
          type="text"
          placeholder="eg. John"
          icon={
            <MdPerson4
              key="person-icon"
              className="text-cspurple"
              fontSize={22}
            />
          }
          value={"Table turns"}
        />

        <Input
          err={false}
          width="fit"
          label={"Something"}
          blur={() => {}}
          name="lastName" // Use "lastName" here
          change={() => {}}
          type="text"
          placeholder="eg. Doe"
          icon={
            <MdPerson4
              key="person-icon"
              className="text-cspurple"
              fontSize={22}
            />
          }
          value={"Table turns"}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-x-5 w-full">
        <ToggleButton value1="Type 1" value2="Type 2" label="Diabetes Type" />

        <ToggleButton value1="Male" value2="Female" label="Sex" />
      </div>

      <div className="flex items-center justify-center">
        <Button
          label="Upload CSV Data"
          type="secondary"
          clickHandler={() => console.log("heyy")}
        />
      </div>
    </>
  );
}

export default RegisterStepTwo;
