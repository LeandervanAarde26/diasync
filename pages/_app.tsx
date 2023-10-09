import { AppProps } from "next/app";
import "../styles/globals.css";
import { RegisterContextProvider } from "@/store/Register.Context";
import NavBar from "@/components/partial/NavBar";
import RightContainer from "@/components/partial/RightContainer";
import { useRouter } from "next/router";

export default function ({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showItems = router.pathname === "/" || router.pathname === "/Register" ||  router.pathname === "/404" ? false : true; 
  return (
    <RegisterContextProvider>
      <div className="flex flex-row max-w-screen">
      {showItems && <NavBar/>}
      <Component {...pageProps} />
      {showItems && <RightContainer/>}
      </div>
    </RegisterContextProvider>
  );
}