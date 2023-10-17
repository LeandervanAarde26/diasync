import { useRouter } from "next/router";
import ComplicationsCard from "@/components/Common/ComplicationsCard.component";
import Image from "next/image";

import Button from "@/components/Common/Button";
import data from "../static/Dash.json";
import HomeChart from "@/components/Features/HomeChart.component";
import HomeDoughnutChart from "@/components/Features/HomeDoughnutChart.component";
import LearnMore from "@/components/Common/LearnMore.component";
import { useContext, useEffect, useState } from "react";
import {
  getComplications,
  getUserInformation,
  loginUser,
  verifyUserToken,
} from "@/api/Calls";
import { UserContext } from "@/store/userContext.Context";

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
  const { values, setValues } = useContext(UserContext);
  const [ai, setAi] = useState<homePageDataType>({});
  const validateToken = async (token: string) => {
    try {
      const toaks = await verifyUserToken(token);
      // console.log("TOAKS", values);
      // console.log(values);
      if (!toaks) {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        router.push("/");
      }
    }
  };

  const fetchComplications = async () => {
    const AiIntegration = await getComplications(values.id);
    const parsedData = JSON.parse(AiIntegration.Response);
    setAi(parsedData);
    console.log(parsedData, "HOME");

    // if (AiIntegration) {
    //   // Use AiIntegration data here
    // }
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
      let tk = window.sessionStorage.getItem("token");
      if (tk) {
        const tokenState = validateToken(tk);
        try {
          fetchUserData();
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/");
      }
    }
  }, []);

  useEffect(() => {
    fetchComplications();
  }, [values.id]);

  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[110vh] sm:h-screen w-[100%] sm:w-[80%] p-5">
      <HomeChart />
      <HomeDoughnutChart
        low={ai.blood_sugar_distribution?.low || 0}
        stable={ai.blood_sugar_distribution?.stable || 0}
        high={ai.blood_sugar_distribution?.high || 0}
        show={false}
      />

      <div className="flex flex-row gap-x-[15px] h-[43vh] pt-3">
        <HomeDoughnutChart
          low={ai.blood_sugar_distribution?.low || 0}
          stable={ai.blood_sugar_distribution?.stable || 0}
          high={ai.blood_sugar_distribution?.high || 0}
          show={true}
        />

        <div className="flex flex-col w-[100%] md:w-[35%] gap-y-[10px] overflow-scroll">
          <h5 className="text-m">{data.unstableHeading}</h5>

          {ai.complications ? (
            ai.complications.map((complication) => (
              <ComplicationsCard
                heading={complication.heading}
                body={complication.description}
                url={complication.link}
              />
            ))
          ) : (
            <p>No complications data available</p> // Provide a fallback in case complications data is undefined
          )}

          {/* <ComplicationsCard
            heading="Heart Disease"
            body="Some sort of content is going to go here from the Ai that it will generate based on your blood sugar and your blood sugar levels, it's going to be awesome dude."
            url="http://localhost:3000/home"
          />

          <ComplicationsCard
            heading="Heart Disease"
            body="Some sort of content is going to go here from the Ai that it will generate based on your blood sugar and your blood sugar levels, it's going to be awesome dude."
            url="http://localhost:3000/home"
          />
          <ComplicationsCard
            heading="Heart Disease"
            body="Some sort of content is going to go here from the Ai that it will generate based on your blood sugar and your blood sugar levels, it's going to be awesome dude."
            url="http://localhost:3000/home"
          /> */}
        </div>

        <LearnMore />
      </div>
    </div>
  );
}
