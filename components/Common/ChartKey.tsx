import { ChartKeyType } from "@/types/ChartKeyType";

export default function ChartKey({color, title, clickHandler, borderColor, paddingH, paddingV, texColor}: ChartKeyType) {
    return (
        <div className={`${paddingH} ${paddingV} cursor-pointer border border-1 border-${borderColor} rounded-r-xl rounded-l-xl hover:border-2 flex flex-row gap-x-2 items-center w-max `}>
            <div className={`w-3 h-3 border border-[3px] border-${color} rounded-full`}>

            </div>
        <p className={`text-${texColor}`}>{title}</p>
      </div>
    );
}



// csblack