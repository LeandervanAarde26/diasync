import { ReadingGroupType } from "@/types/ReadingGroupType";
import { useState, useEffect, useContext } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import { getMonthName } from "@/Reusables/Functions";
import placeHolder from "../assets/tester.png";
import SuggestionCard from "@/components/Common/SuggestionCard";
import Chat from "@/components/Features/Chat";
import MonthlyComparrison from "@/components/Features/MonthlyComparrison";
import { UserContext } from "@/store/userContext.Context";
import { getDataAnalysed } from "@/api/Calls";
import Loader from "@/components/Common/Loader";
import { AnalysisContext } from "@/store/Analyse.Context";
import { MonthName } from "@/types/MonthNames";

function Analyse() {
  const [groupedReadings, setGroupedReadings] = useState<
    Record<string, ReadingGroupType>
  >({});
  const [filter, setFilter] = useState<Record<string, ReadingGroupType>>({});
  const [ready, setReady] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const { analysis } = useContext(AnalysisContext);
  const { dat } = useContext(ReadingsContext);
  const { values } = useContext(UserContext);
  const now = new Date();
  const currMonth = getMonthName(now);
  const prevMonth = getMonthName(
    new Date(now.getFullYear(), now.getMonth() - 1)
  );
  const currYear = now.getFullYear();
  console.log(currYear);

  const DataAnalysation = async () => {
    try {
      // const AIIntegration = await getDataAnalysed(values.id);
      // const jsonStart = AIIntegration.Response.indexOf("{");
      // const jsonEnd = AIIntegration.Response.lastIndexOf("}");
      // const jsonResponse = AIIntegration.Response.substring(
      //   jsonStart,
      //   jsonEnd + 1
      // );
      // const parsedData = JSON.parse(jsonResponse);
      // setData(parsedData);
      // console.log(parsedData);
      // console.log(AIIntegration.Response);
      // // setReady(true);
    } catch (error) {
      console.log("Error analysing data", error);
    }
  };

  useEffect(() => {
    console.log("yea buddy");
    DataAnalysation();
    console.log(analysis);
    console.log(analysis.analysisData[currMonth]);
  }, []);

  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[110vh] sm:h-screen w-[100%] sm:w-[80%]  ">
      {!analysis ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <Loader
            msg={`Hang tight ${values.name}, we're analysing your data!`}
          />
        </div>
      ) : (
        <div className="w-fill h-[100vh] p-5 overflow-scroll">
          <div className="w-[100%]">
            <div className=" w-[100%] h-[43vh] flex flex-row p-3 gap-x-4">
              {analysis.analysisData[prevMonth as MonthName] == null ? null : (
                <MonthlyComparrison
                  low={analysis.analysisData[prevMonth as MonthName]?.low | 0}
                  stable={
                    analysis.analysisData[prevMonth as MonthName]?.stable | 0
                  }
                  high={analysis.analysisData[prevMonth as MonthName]?.high | 0}
                  unstable={
                    (analysis.analysisData[prevMonth as MonthName]?.low +
                      analysis.analysisData[prevMonth]?.high) |
                    0
                  }
                  month={prevMonth}
                  year={currYear}
                />
              )}

              <MonthlyComparrison
                low={analysis.analysisData[currMonth as MonthName].low}
                stable={analysis.analysisData[currMonth as MonthName].stable}
                high={analysis.analysisData[currMonth as MonthName].high}
                unstable={
                  analysis.analysisData[currMonth as MonthName].low +
                  analysis.analysisData[currMonth].high
                }
                month={currMonth}
                year={currYear}
              />
            </div>

            <div className=" w-[100%] h-[43vh] flex flex-row p-3 gap-x-4 ">
              <div className=" h-[100%] w-[50%] overflow-hidden flex flex-col">
                <h5 id="adjustments" className="mb-3">
                  Articles based on your glucose trends
                </h5>
                <div className="w-[100%] h-[100%] flex flex-row gap-x-5">
                  {analysis.AnalysisSuggestions.map((i: any) => (
                    <SuggestionCard {...i} />
                  ))}
                </div>
              </div>

              <div className=" h-[100%] w-[50%] overflow-hidden flex flex-col">
                <h5 id="adjustments" className="mb-3 md:ml-[50px]">
                  Dietary adjustments based on your glucose
                </h5>
                <div className="w-[100%] h-[100%] flex flex-row gap-x-5 justify-end">
                  {analysis.DietarySuggestions.map((i: any) => (
                    <SuggestionCard {...i} />
                  ))}
                </div>
              </div>
            </div>
            <Chat observation={analysis.Observation} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Analyse;
