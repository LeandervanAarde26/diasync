import { ComplicationsCardType } from "@/types/ComplicationsCardType";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function ComplicationsCard({
  description,
  heading,
  link,
}: ComplicationsCardType) {
  return (
    <div className=" flex flex-row w-[100%] h-[80px] bg-[#000000] rounded-full p-3 py-2 items-center pl-[5%] gap-x-4 card">
      <MdOutlineFavoriteBorder
        key="password-icon"
        className="text-cswhite"
        fontSize={40}
      />

      <div className="w-[3px] bg-cswhite h-[75%]"></div>

      <div className="flex flex-col w-[62%] py-[10px] ">
        <span className="text-s text-csLightGreen">{heading}</span>
        <span className="text-cswhite text-xs break-all line-clamp-2">
          {description}
        </span>
      </div>
      <a href={`${link}`} target="_blank">
        {" "}
        <span className="text-cswhite text-xs hover:font-bold cursor-pointer">
          Learn more
        </span>
      </a>
    </div>
  );
}
