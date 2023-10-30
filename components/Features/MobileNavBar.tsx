import { MdHouse, MdReadMore, MdOutlinePoll, MdLogout } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReadingsContext } from "@/store/Readings.Context";
import { useContext } from "react";
import { UserContext } from "@/store/userContext.Context";
import { AnalysisContext } from "@/store/Analyse.Context";
import { ComplicationsContext } from "@/store/ComplicationsContext";
function MobileNavBar() {
  const router = useRouter();
  const { clearDat } = useContext(ReadingsContext);
  const { clearValues } = useContext(UserContext);
  const {clearAnalysis} = useContext(AnalysisContext)
  const {clearComplications} = useContext(ComplicationsContext)

  const logout = async () => {
    await router.push("/");
    clearDat();
    clearValues();
    clearAnalysis();
    clearComplications();
  };

  return (
    <div className="fixed md:hidden bottom-0 left-1/2 transform -translate-x-1/2 w-[82%] h-[10vh] bg-cswhite rounded-full flex justify-between items-center overflow-hidden ">
      <div className="flex flex-row gap-x-6 justify-center items-center w-[100%]">
        <Link href="/home">
          <div
            className={`p-3 rounded-full ${
              router.pathname === "/home" || router.pathname === "/"
                ? "bg-csblue"
                : ""
            }`}
          >
            <MdHouse
              key="person-icon"
              className={` ${
                router.pathname === "/home" ? "text-cswhite" : "text-csblack"
              }`}
              fontSize={35}
            />
          </div>
        </Link>

        <Link href="/readings">
          <div
            className={`p-3 rounded-full ${
              router.pathname === "/readings" ? "bg-csblue" : ""
            }`}
          >
            <MdReadMore
              key="person-icon"
              className={` ${
                router.pathname === "/readings"
                  ? "text-cswhite"
                  : "text-csblack"
              }`}
              fontSize={35}
            />
          </div>
        </Link>

        <Link href="/analyse">
          <div
            className={`p-3 rounded-full ${
              router.pathname === "/analyse" ? "bg-csblue" : ""
            }`}
          >
            <MdOutlinePoll
              key="person-icon"
              className={` ${
                router.pathname === "/analyse" ? "text-cswhite" : "text-csblack"
              }`}
              fontSize={35}
            />
          </div>
        </Link>

        <div className="p-3" onClick={logout}>
          <MdLogout
            key="person-icon"
            className="hover:text-csDanger text-csblack cursor-pointer"
            fontSize={35}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileNavBar;
