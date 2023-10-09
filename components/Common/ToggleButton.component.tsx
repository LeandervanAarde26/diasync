import { useState } from "react";

type Values<T> = {
  value1: T;
  value2: T;
  label: string;
  onSelect: (selectedValue: T) => void;
};

function ToggleButton<T>({ value1, value2, label, onSelect }: Values<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(value1 as T);

  const toggleButton = () => {
    const newValue = selectedValue === value1 ? value2 : value1;
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  return (
    <div className="flex flex-col w-[47%]">
      <p className={`label text-cswhite`}>{label}</p>
      <div className="relative overflow-hidden flex flex-row p-2 border-[1.5px] border-cswhite rounded-full gap-x-4 h-[40px] w-[100%]">
        <div className="static flex z-4 flex-row gap-x-6 items-center ">
          <div
            className={`h-full w-[50%] py-2 flex justify-center items-center absolute cursor-pointer left-0 ${
              selectedValue === value1 ? "text-cspurple" : "text-cswhite"
            } transition-colors duration-300 z-50`}
            onClick={toggleButton}
          >
            <p>{value1 as string}</p>
          </div>

          <div
            className={`h-full w-[50%] py-2 flex justify-center items-center absolute cursor-pointer right-0 ${
              selectedValue === value2 ? "text-cspurple" : "text-cswhite"
            } transition-colors duration-300  z-50`}
            onClick={toggleButton}
          >
            <p>{value2 as string}</p>
          </div>

          <div
            className={`absolute rounded-full ${
              selectedValue === value1 ? "left-0" : "right-0"
            } top-0 z-0 flex bg-cswhite h-full w-[52%] transition-transform duration-300`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
