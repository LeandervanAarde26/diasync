import { useRouter } from "next/router";
import ComplicationsCard from "@/components/Common/ComplicationsCard.component";
import data from "../static/Dash.json";
import HomeChart from "@/components/Features/HomeChart.component";
import HomeDoughnutChart from "@/components/Features/HomeDoughnutChart.component";
import LearnMore from "@/components/Common/LearnMore.component";
import { useContext, useEffect, useState } from "react";
import {
  getComplications,
  getUserInformation,
  verifyUserToken,
} from "@/api/Calls";
import { UserContext } from "@/store/userContext.Context";
import { ReadingsContext } from "@/store/Readings.Context";
import Loader from "@/components/Common/Loader";
import { ComplicationsContext } from "@/store/ComplicationsContext";
import { AnalysisContext } from "@/store/Analyse.Context";
type complication = {
  heading: string;
  description: string;
  link: string;
};

type homePageDataType = {
  blood_sugar_distribution: { low: number; stable: number; high: number };
  blood_sugar_status: string;
  complications: complication[];
};

export default function Home() {
  const router = useRouter();
  const { values, setValues, clearValues } = useContext(UserContext);
  const { dat, clearDat } = useContext(ReadingsContext);
  const { complications, clearComplications } =
    useContext(ComplicationsContext);
  const { clearAnalysis } = useContext(AnalysisContext);

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

  const fetchUserData = async () => {
    try {
      const userData = await getUserInformation(values.id);
      if (userData) {
        setValues((prevValues: any) => ({
          ...prevValues,
          weight: userData.weight,
          height: userData.height,
          type: userData.diabetes_type,
          sex: userData.sex,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userToken = window.sessionStorage.getItem("token");
      if (userToken) {
        const tokenState = validateToken(userToken);
        try {
          fetchUserData();
        } catch (error) {
          console.log(error);
        }
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
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[120vh] sm:h-screen w-[100%] sm:w-[80%] p-5">
      <HomeChart />
      {complications.length > 0? (
        <HomeDoughnutChart
          low={complications[0].blood_sugar_distribution?.low || 0}
          stable={complications[0].blood_sugar_distribution?.stable || 0}
          high={complications[0].blood_sugar_distribution?.high || 0}
          show={false}
        />
      ) : null}

      <div className="flex flex-row gap-x-[30px] h-[38vh] pt-3">
        {complications.length > 0?  (
          <HomeDoughnutChart
            low={complications[0].blood_sugar_distribution?.low || 0}
            stable={complications[0].blood_sugar_distribution?.stable || 0}
            high={complications[0].blood_sugar_distribution?.high || 0}
            show={true}
          />
        ) : null}

        <div className="flex flex-col w-[100%]  overflow-scroll  md:w-[40%] gap-y-[10px] justify-center">
          <h5 className="text-m">{data.unstableHeading}</h5>

          <div className="flex flex-col w-[100%]  gap-y-[10px] overflow-scroll justify-center">
          {complications.length > 0 ? (
            complications[0].complications.map((complication) => (
              <ComplicationsCard {...complication} />
            ))
          ) : (
            <div className="flex flex-col w-[100%] h-[100%] gap-y-[10px] items-center justify-center">
              <Loader msg={`Analysing ${values.name}'s data`} />
            </div>
          )}
          </div>
        </div>
        {/* <LearnMore /> */}
      </div>
    </div>
  );
}
