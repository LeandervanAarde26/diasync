import { ChartKeyType } from "@/types/ChartKeyType";

function ChartKey({color, title, clickHandler}: ChartKeyType) {
    return (
        <div className={`px-3 py-1 cursor-pointer border border-1 border-csblack rounded-r-xl rounded-l-xl hover:border-2 flex flex-row gap-x-2 items-center `}>
            <div className={`w-3 h-3 border border-[3px] border-${color} rounded-full`}>

            </div>
        <p>{title}</p>
      </div>
    );
}

export default ChartKey;

// csblack