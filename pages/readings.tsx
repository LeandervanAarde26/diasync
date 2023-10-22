import FilterButtons from "@/components/Common/FilterButtons.component";
import Image from "next/image";
import bloodDrop from "../assets/blood_drop.png";
import {
  MdHistoryToggleOff,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdStarBorder,
  MdOutlineFilterTiltShift,
} from "react-icons/md";
import {useContext} from 'react';
import { ReadingsContext } from "@/store/Readings.Context";
import ReadingGroup from "@/components/Features/ReadingGroup";

function Readings() {
    const { dat, setDat } = useContext(ReadingsContext);
    
  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[110vh] sm:h-screen w-[100%] sm:w-[80%] p-5">
      <div className="flex flex-row w-[100%] h-full">
        <div className="flex flex-col w-[70%] bg-csDanger h-full overflow-scroll">
          <div className="flex flex-row w-[100%] gap-x-1">
            <FilterButtons title={"All time"} roundedLeft="xl" active={false} />
            <FilterButtons title={"30 Days"} active={false} />

            <FilterButtons title={"7 Days"} active={false} />

            <FilterButtons title={"24 Days"} roundedRight="xl" active={false} />
          </div>
        </div>
        <div className="flex flex-col w-[30%] bg-cspurple h-full"></div>
      </div>
    </div>
  );
}

export default Readings;
