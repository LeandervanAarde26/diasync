import { bloodSugarEntryType } from "@/types/BloodSugarEntryType";
import BloodsugarEntry from "../Common/BloodsugarEntry";
import { ReadingGroupType } from "@/types/ReadingGroupType";


function ReadingGroup({ date, average, testAmount, tests }: ReadingGroupType) {
  return (
    <>
      <div className="cardscontainer flex flex-row justify-between px-5 mb-3 mt-3">
        <h6 className="text-cswhite">{date}</h6>

        <div className="flex flex-row items-center h-fill gap-x-2">
          <div className="w-[3px] h-[20px] bg-cspurple"></div>
          <h6 className="text-cswhite">Average bg: {average}</h6>
        </div>

        <div className="flex flex-row items-center h-fill gap-x-2">
          <div className="w-[3px] h-[20px] bg-cspurple"></div>
          <h6 className="text-cswhite">Total Tests: {testAmount}</h6>
        </div>
      </div>

      {tests.map((i) => (
        <BloodsugarEntry
          target={"7"}
          blood_sugar_level={i.blood_sugar_level}
          time={i.time}
        />
      ))}
    </>
  );
}

export default ReadingGroup;
