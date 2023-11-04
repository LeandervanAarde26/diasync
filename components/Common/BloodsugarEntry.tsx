import {
  MdHistoryToggleOff,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdStarBorder,
  MdOutlineFilterTiltShift,
} from "react-icons/md";
import Image from "next/image";
import bloodDrop from "../../assets/blood_drop.png";
import { bloodSugarEntryType } from "@/types/BloodSugarEntryType";
import tester from '@/assets/glucoTester.png'

function BloodsugarEntry({ blood_sugar_level, time, target }: bloodSugarEntryType) {
  return (
    <div className="cardContainer flex flex-row w-[100%] bg-grad2 h-[8vh] p-5 items-center rounded-3xl justify-between">
      <Image src={tester} alt="Blood Drop" height={30} width={30} />
      <div className="flex flex-row items-center gap-x-1 w-[25%]">
        <MdHistoryToggleOff
          key="password-icon"
          className="text-csMint"
          fontSize={22}
        />
        <p className="text-cswhite">{time}</p>
      </div>

      <div className="flex flex-row items-center gap-x-1 w-[25%]">
        {+blood_sugar_level < 4 ? (
          <MdKeyboardArrowDown
            key="password-icon"
            className="text-cswhite"
            fontSize={22}
          />
        ) : +blood_sugar_level > 12 ? (
          <MdKeyboardArrowUp
            key="password-icon"
            className="text-cswhite"
            fontSize={22}
          />
        ) : (
          <MdStarBorder
            key="password-icon"
            className="text-cswhite"
            fontSize={22}
          />
        )}

        <p className={`text-csblack ${+blood_sugar_level < 4 ? `bg-csyellow` : +blood_sugar_level > 12? `bg-csDanger` : `bg-csgreen`} rounded-2xl p-2 `}>
          <b>{blood_sugar_level}</b> <span className="text-xs">mmol/L</span></p>
      </div>

      <div className="flex flex-row items-center gap-x-1 w-[25%]">
        <MdOutlineFilterTiltShift
          key="password-icon"
          className="text-cswhite"
          fontSize={22}
        />
        <p className='text-cswhite'> {target} <span className="text-xs">mmol/L</span></p>
      </div>
    </div>
  );
}

export default BloodsugarEntry;
