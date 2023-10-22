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
import { useContext, useEffect, useState } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import ReadingGroup, {
  ReadingGroupType,
} from "@/components/Features/ReadingGroup";
import BloodsugarEntry from "@/components/Common/BloodsugarEntry";
import { EntryType } from "perf_hooks";

function Readings() {
  const { dat, setDat } = useContext(ReadingsContext);
  const [groupedReadings, setGroupedReadings] = useState<[ReadingGroupType]>();

  const groupedData = () => {
    const map2: any = dat.map((obj: any, i) => {
      console.log(obj.date);
      const tests = dat
        .filter((item) => item.date === obj.date && item.blood_sugar_level)
        .map((item) => ({
          id: item.id,
          date: item.date,
          time: item.time,
          blood_sugar_level: item.blood_sugar_level,
        }));
      setGroupedReadings((prev: any) => ({
        ...prev,
        [obj.date]: {
          date: obj.date,
          average: "12",
          testAmount: tests.length,
          tests: tests,
        },
      }));
    });
    console.log(map2);
  };

  useEffect(() => {
    groupedData();
  }, []);
  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[110vh] sm:h-screen w-[100%] sm:w-[80%] p-5">
      <div className="flex flex-row w-[100%] h-full">
        <div className="flex flex-col w-[70%] h-full overflow-hidden">
          <div className="flex flex-row w-[100%] gap-x-1 mb-3">
            <FilterButtons title={"All time"} roundedLeft="xl" active={false} />
            <FilterButtons title={"30 Days"} active={false} />

            <FilterButtons title={"7 Days"} active={false} />

            <FilterButtons title={"24 Days"} roundedRight="xl" active={false} />
          </div>

          <div className="flex flex-col h-full w-[100%] overflow-scroll gap-y-4">
            {groupedReadings &&
              Object.entries(groupedReadings).map(([date, data]) => (
                <ReadingGroup
                  key={date} // Assuming you have a unique key for each ReadingGroup
                  date={data.date}
                  average={data.average}
                  testAmount={data.testAmount}
                  tests={data.tests}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col w-[30%]  h-full"></div>
      </div>
    </div>
  );
}

export default Readings;
