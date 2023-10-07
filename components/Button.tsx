import { ButtonType } from "@/types/ButtonTypes";

export default function ({
  label,
  id,
  type,
  disabled,
  clickHandler,
}: ButtonType) {
  const zeroFunction = () => {
    return null;
  };

  // Access the button class based on the 'type' prop from the Tailwind CSS configuration

  let buttonClassStyles = "";
  let buttonText = "";

  switch (type) {
    case "primary":
      buttonClassStyles =
        "bg-csblue hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300  hover:bg-csDarkBlue rounded-full ";
      buttonText = "text-cswhite";
      break;
    case "secondary":
      buttonClassStyles =
        "border-2 border-cspurple hover:bg-cspurple hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300 rounded-full";
      buttonText = "text-cswhite";
      break;
    case "outline":
      buttonClassStyles =
      "border-2 border-cswhite hover:border-4 hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300 rounded-full";
    buttonText = "text-cswhite";
    break;
    case "tertiary":
      buttonClassStyles =
        "bg-cspurple hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300  hover:bg-cspurple ";
      buttonText = "text-cswhite";
      break;
    default:
      break;
  }

  return (
    <div
      className={`${buttonClassStyles} h-fit w-fit flex justify-center items-center py-2 px-12`}
      onClick={disabled ? () => zeroFunction : clickHandler}
      id={id}
    >
      <p className={buttonText}>{label}</p>
    </div>
  );
}
