import FilterButtons from "@/components/Common/FilterButtons.component";
import { useContext, useEffect, useState, useCallback } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import ReadingGroup from "@/components/Features/ReadingGroup";
import { ReadingGroupType } from "@/types/ReadingGroupType";
import Dropzone from "@/components/Features/Dropzone";
import Button from "@/components/Common/Button";
import ChartKey from "@/components/Common/ChartKey";

function Readings() {
  const { dat, setDat } = useContext(ReadingsContext);
  const [groupedReadings, setGroupedReadings] = useState< Record<string, ReadingGroupType>>({});
  const [filter, setFilter] = useState<Record<string, ReadingGroupType>>({});
  const [csv, setCsv] = useState(undefined);
  const highBloodSugars = dat.filter((item) => +item.blood_sugar_level > 12);
  const lowBloodSugars = dat.filter((item) => +item.blood_sugar_level < 4);
  const stableBloodSugars = dat.filter((item) => +item.blood_sugar_level >= 4 && +item.blood_sugar_level <= 12);

  const [chart, setChart] = useState({
    high:
      Math.round((highBloodSugars.length / dat.length) * 100).toString() + "%",
    stable:
      Math.round((stableBloodSugars.length / dat.length) * 100).toString() +
      "%",
    low:
      Math.round((lowBloodSugars.length / dat.length) * 100).toString() + "%",
  });
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

      const dailyAverage = tests.reduce((accumulator, curr) => {
        const bloodSugarLevel = parseInt(curr.blood_sugar_level);
        return accumulator + bloodSugarLevel / tests.length;
      }, 0);

      const readableDate = new Date(obj.date).toDateString();

      setGroupedReadings((prev: any) => ({
        ...prev,
        [obj.date]: {
          date: readableDate,
          average: dailyAverage.toFixed(1),
          testAmount: tests.length,
          tests: tests,
        },
      }));
      setFilter((prev: any) => ({
        ...prev,
        [obj.date]: {
          date: readableDate,
          average: dailyAverage.toFixed(1),
          testAmount: tests.length,
          tests: tests,
        },
      }));
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const dataUrl = e.target.result;
          setCsv(dataUrl);
          console.log(dataUrl)
        };
      
        reader.readAsDataURL(file);
      }
    },
    [setCsv]
  );

  useEffect(() => {
    groupedData();
  }, [dat]);

  const filterData = async (amount: number) => {
    setFilter(groupedReadings);
    const d = new Date();
    const filteredAmount = new Date(d);
    filteredAmount.setDate(d.getDate() - amount);

    if (groupedReadings && amount > 0) {
      const filteredData = Object.entries(groupedReadings).filter(
        ([date, data]) => {
          const dayDate = new Date(date);
          return dayDate >= filteredAmount;
        }
      );
      const updatedData: Record<string, ReadingGroupType> = {};
      filteredData.forEach(([date, data]) => {
        updatedData[date] = data;
      });
      setFilter(updatedData);
    }
  };

  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[110vh] sm:h-screen w-[100%] sm:w-[80%] p-5">
      <div className="flex flex-row w-[100%] h-full">
        <div className="flex flex-col w-[100%] md:w-[70%] h-full overflow-hidden">
          <div className="flex flex-row w-[100%] gap-x-1 mb-3">
            <FilterButtons
              title={"All time"}
              roundedLeft="xl"
              active={false}
              clickHandler={() => filterData(0)}
            />
            <FilterButtons
              title={"30 Days"}
              active={false}
              clickHandler={() => filterData(30)}
            />

            <FilterButtons
              title={"7 Days"}
              active={false}
              clickHandler={() => filterData(7)}
            />

            <FilterButtons
              title={"24 Hours"}
              roundedRight="xl"
              active={false}
              clickHandler={() => filterData(1)}
            />
          </div>

          <div className="flex flex-col h-full w-[100%] overflow-scroll gap-y-4">
            {filter &&
              Object.entries(filter).map(([date, data]) => (
                <ReadingGroup
                  key={data.testAmount}
                  date={data.date}
                  average={data.average}
                  testAmount={data.testAmount}
                  tests={data.tests}
                />
              ))}
          </div>
        </div>

        <div className="hidden md:flex flex-col w-[30%] h-full p-3  gap-y-4">
          <div className="flex flex-col bg-csblack h-full w-full rounded-2xl justify-center items-center justify-between pt-10 pb-5">
            <h5>Based on your readings:</h5>
            <div className="w-[80px] h-[80%] flex flex-col  bg-csblue rounded-2xl overflow-hidden">
              <div className={`w-[100%] h-[${chart.high}] bg-csDanger`}></div>
              <div className={`w-[100%] h-[${chart.stable}] bg-csgreen`}></div>
              <div className={`w-[100%] h-[${chart.low}] bg-csyellow`}></div>
            </div>

            <div className="keyContainer flex flex-row w-[100%] gap-x-3 justify-center items-cente h-[40px] ">
              <ChartKey
                borderColor="cswhite"
                paddingH="px-3"
                paddingV=""
                texColor="cswhite"
                title={"High"}
                color={"csDanger"}
              />
              <ChartKey
                borderColor="cswhite"
                paddingH="px-3"
                paddingV=""
                texColor="cswhite"
                title={"Stable"}
                color={"csgreen"}
              />

              <ChartKey
                borderColor="cswhite"
                paddingH="px-3"
                paddingV=""
                texColor="cswhite"
                title={"Low"}
                color={"csyellow"}
              />
            </div>
          </div>
          <Dropzone onDrop={onDrop} accept="csv/*" />
          <div className="w-full flex flex-col justify-center items-center">
            <Button
              label="Upload and replace data"
              type="primary"
              clickHandler={() => console.log("upload")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Readings;
