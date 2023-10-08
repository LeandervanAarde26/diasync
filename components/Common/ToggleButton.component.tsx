import { useState } from "react";

type Values = {
  value1: string;
  value2: string;
  label: string;
};

function ToggleButton({ value1, value2, label }: Values) {
  const [slide, setSlide] = useState<boolean>(false);

  const toggleButton = () => {
    setSlide((prev: boolean) => !prev);
  };

  return (
    <div className="flex flex-col w-[47%]">
      <p className={`label text-cswhite`}>{label}</p>
      <div className="relative overflow-hidden flex flex-row p-2 border-[1.5px] border-cswhite rounded-full gap-x-4 h-[40px] w-[100%]">
        <div className="static flex z-4 flex-row gap-x-6 items-center ">
          <div
            className="h-full w-[50%] py-2 flex justify-center items-center absolute cursor-pointer left-0"
            onClick={toggleButton}
          >
            <p
              className={`${
                slide ? "text-cspurple" : "text-cswhite"
              } relative z-50`}
            >
              {value1}
            </p>
          </div>

          <div
            className="h-full w-[50%] py-2 flex justify-center items-center absolute cursor-pointer right-0"
            onClick={toggleButton}
          >
            <p
              className={`${
                slide ? "text-cswhite" : "text-cspurple"
              } relative z-50`}
            >
              {value2}
            </p>
          </div>

          <div
            className={`absolute rounded-full ${
              slide ? "left-0" : "right-0"
            }  top-0  z-0 flex bg-cswhite h-full w-[52%]`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
