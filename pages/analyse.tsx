
import { useState, useEffect, useContext } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import { getMonthName } from "@/Reusables/Functions";
import SuggestionCard from "@/components/Common/SuggestionCard";
import Chat from "@/components/Features/Chat";
import MonthlyComparrison from "@/components/Features/MonthlyComparrison";
import { UserContext } from "@/store/userContext.Context";
import { verifyUserToken } from "@/api/Calls";
import Loader from "@/components/Common/Loader";
import { AnalysisContext } from "@/store/Analyse.Context";
import { MonthName } from "@/types/MonthNames";
import { ComplicationsContext } from "@/store/ComplicationsContext";
import { useRouter } from "next/router";
import { currYear, now } from "@/Reusables/Variables";

function Analyse() {
  const router = useRouter();
  const { analysis, clearAnalysis } = useContext(AnalysisContext);
  const { clearDat } = useContext(ReadingsContext);
  const { values, clearValues } = useContext(UserContext);
  const { clearComplications } = useContext(ComplicationsContext);
  const currMonth = getMonthName(now);
  const prevMonth = getMonthName(
    new Date(now.getFullYear(), now.getMonth() - 1)
  );

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
              {analysis.analysisData[prevMonth as MonthName] == null ||
              analysis.analysisData[prevMonth as MonthName] ==
                undefined ? null : (
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

              {analysis.analysisData[currMonth as MonthName] == null ||
              analysis.analysisData[currMonth as MonthName] ==
                undefined ? null : (
                <MonthlyComparrison
                  low={analysis.analysisData[currMonth as MonthName].low | 0}
                  stable={
                    analysis.analysisData[currMonth as MonthName].stable | 0
                  }
                  high={analysis.analysisData[currMonth as MonthName].high | 0}
                  unstable={
                    analysis.analysisData[currMonth as MonthName].low |
                    (0 + analysis.analysisData[currMonth].high) |
                    0
                  }
                  month={currMonth}
                  year={currYear}
                />
              )}
            </div>

            <div className=" w-[100%] h-[43vh] flex flex-row p-3 gap-x-4 ">
              <div className=" h-[100%] w-[50%] overflow-hidden flex flex-col">
                <h5 id="adjustments" className="mb-3">
                  Articles based on your glucose trends
                </h5>
                <div className="w-[100%] h-[100%] flex flex-row gap-x-5">
                  {analysis.AnalysisSuggestions.map((i: any, index) => (
                    
                    <SuggestionCard {...i} key={index} />
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
