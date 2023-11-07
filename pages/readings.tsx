import FilterButtons from "@/components/Common/FilterButtons.component";
import { useContext, useEffect, useState, useCallback } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import ReadingGroup from "@/components/Features/ReadingGroup";
import { ReadingGroupType } from "@/types/ReadingGroupType";
import Dropzone from "@/components/Features/Dropzone";
import Button from "@/components/Common/Button";
import { getUserReadings, uploadNewData, verifyUserToken } from "@/api/Calls";
import { UserContext } from "@/store/userContext.Context";
import { ComplicationsContext } from "@/store/ComplicationsContext";
import { AnalysisContext } from "@/store/Analyse.Context";
import { useRouter } from "next/router";
import Doughnuts from "@/components/Common/Doughnut";

export default function Readings() {
  const { dat, setDat, clearDat } = useContext(ReadingsContext);
  const router = useRouter();
  const { clearComplications } = useContext(ComplicationsContext);
  const { clearValues } = useContext(UserContext);
  const { clearAnalysis } = useContext(AnalysisContext);
  const { values } = useContext(UserContext);
  const [groupedReadings, setGroupedReadings] = useState<
    Record<string, ReadingGroupType>
  >({});
  const [filter, setFilter] = useState<Record<string, ReadingGroupType>>({});
  const [csv, setCsv] = useState(undefined);
  const highBloodSugars = dat.filter((item) => +item.blood_sugar_level > 12);
  const lowBloodSugars = dat.filter((item) => +item.blood_sugar_level < 4);
  const stableBloodSugars = dat.filter(
    (item) => +item.blood_sugar_level >= 4 && +item.blood_sugar_level <= 12
  );

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
    dat.sort((a: any, b: any) => {
      let keyA = new Date(a.date);
      let keyB = new Date(b.date);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    const map2: any = dat.map((obj: any, i, index) => {
      const tests = dat
        .filter((item) => item.date === obj.date && item.blood_sugar_level)
        .map((item, indx) => ({
          key: indx,
          id: item.id,
          date: item.date,
          time: item.time.split(':').slice(0, 2).join(':'),
          blood_sugar_level: item.blood_sugar_level,
        }))
        .sort((a, b) => a.time.localeCompare(b.time));

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
      
        };

        reader.readAsDataURL(file);
      }
    },
    [setCsv]
  );

  useEffect(() => {
    groupedData();
  }, []);

  const validateToken = async (token: string) => {
    try {
      const verifiedToken = await verifyUserToken(token);
      if (!verifiedToken) {
        clearAnalysis();
        clearDat();
        clearValues();
        clearComplications();
        router.push("/");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        clearAnalysis();
        clearDat();
        clearValues();
        clearComplications();
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userToken = window.sessionStorage.getItem("token");
      if (userToken) {
        const tokenState = validateToken(userToken);
      } else {
        clearAnalysis();
        clearDat();
        clearValues();
        clearComplications();
        router.push("/");
      }
    }
  }, [clearAnalysis, clearComplications, clearDat, clearValues, router, validateToken]);

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

  const onClickHandler = async () => {

    const dataUpload = await uploadNewData(values.id, csv);
    if (dataUpload !== null) {
      console.log("user data has been uploaded");
      const newData = await getUserReadings(values.id);
      const { status, data } = newData;

      if (status == 200) {
        console.log("new data has been fetched. Applying..");
        const useableData = await data.map((i: any, index: number) => ({
          key: index,
          id: i.user.id,
          blood_sugar_level: i.blood_sugar_level,
          date: i.date,
          time: i.time,
        }));
        clearDat();
        setDat((prevValues: any) => [...prevValues, ...useableData]);
      }
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
              clickHandler={() => filterData(2)}
            />
          </div>

          <div className="flex flex-col h-full w-[100%] overflow-scroll gap-y-4 ">
            {filter &&
              Object.entries(filter).map(([index, data] ) => (
                <ReadingGroup
                  key={index}
                  date={data.date}
                  average={data.average}
                  testAmount={data.testAmount}
                  tests={data.tests}
                />
              ))}
          </div>
        </div>

        <div className="hidden md:flex flex-col w-[30%] h-full p-3  gap-y-4 justify-center items-center ">
          
      <div className="flex flex-col justify-center h-auto p-8 items-center w-[100%]">
        <Doughnuts low={ Math.round((lowBloodSugars.length / dat.length) * 100)} stable={Math.round((stableBloodSugars.length / dat.length) * 100)} high={Math.round((highBloodSugars.length / dat.length) * 100)} />
      </div>
          <Dropzone onDrop={onDrop} accept="csv/*" />
          <div className="w-full flex flex-col justify-center items-center">
            <Button
              label="Upload data"
              type="primary"
              clickHandler={onClickHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}