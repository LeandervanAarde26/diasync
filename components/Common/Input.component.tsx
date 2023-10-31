import { InputType } from "@/types/Input.type";
import Image from "next/image";
import { useState } from "react";

function Input({
  width,
  label,
  icon,
  placeholder,
  type,
  err,
  name,
  value,
  change,
  blur,
}: // Capture any additional props
InputType) {
  return (
    <div className="flex flex-col gap-y-1">
      <p className={`${err ? `text-csDanger` : `text-cswhite`} label`}>
        {label}
      </p>
      <div
        className={`flex flex-row p-1 px-2 border-[1.5px] ${
          err ? `border-csDanger` : `border-cswhite`
        } rounded-full gap-x-3 w-${width}`}
      >
        {icon}
        <input
          onChange={change}
          onBlur={blur}
          value={value}
          name={name}
          type={type}
          className="w-[100%] bg-csblack"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default Input;
