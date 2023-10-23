import {
  MdHistoryToggleOff,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdStarBorder,
  MdOutlineFilterTiltShift,
} from "react-icons/md";
import Image from "next/image";
import bloodDrop from "../../assets/blood_drop.png";

export type EntryType = {
  blood_sugar_level: any;
  time: any;
  target: any;
};

function BloodsugarEntry({ blood_sugar_level, time, target }: EntryType) {
  return (
    <div className="cardContainer flex flex-row w-[100%] bg-csblack h-[8vh] p-5 items-center rounded-3xl justify-between">
      <Image src={bloodDrop} alt="Blood Drop" height={30} width={30} />
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
            className="text-csyellow"
            fontSize={22}
          />
        ) : +blood_sugar_level > 12 ? (
          <MdKeyboardArrowUp
            key="password-icon"
            className="text-csDanger"
            fontSize={22}
          />
        ) : (
          <MdStarBorder
            key="password-icon"
            className="text-csgreen"
            fontSize={22}
          />
        )}

        <p className={`text-${+blood_sugar_level < 4 ? `csyellow` : +blood_sugar_level > 12? `csDanger` : `csgreen`}`}>{blood_sugar_level} mmol/L</p>
      </div>

      <div className="flex flex-row items-center gap-x-1 w-[25%]">
        <MdOutlineFilterTiltShift
          key="password-icon"
          className="text-cswhite"
          fontSize={22}
        />
        <p className='text-cswhite'> {target} mmol/L</p>
      </div>
    </div>
  );
}

export default BloodsugarEntry;
