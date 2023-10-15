import { AppProps } from "next/app";
import "../styles/globals.css";
import { RegisterContextProvider } from "@/store/Register.Context";
import NavBar from "@/components/Features/NavBar";
import RightContainer from "@/components/Features/RightContainer";
import { useRouter } from "next/router";
import { UserContextProvider } from "@/store/userContext.Context";

export default function ({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showItems =
    router.pathname === "/" ||
    router.pathname === "/Register" ||
    router.pathname === "/404"
      ? false
      : true;

  return (
    <UserContextProvider>
      <RegisterContextProvider>
        <div className="flex flex-row max-w-screen">
          {showItems && <NavBar />}
          <Component {...pageProps} />
          {showItems && <RightContainer />}
        </div>
      </RegisterContextProvider>
    </UserContextProvider>
  );
}
