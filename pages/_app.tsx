import { AppProps } from "next/app";
import "../styles/globals.css";
import { RegisterContextProvider } from "@/store/Register.Context";

export default function ({ Component, pageProps }: AppProps) {
  return (
    <RegisterContextProvider>
      <Component {...pageProps} />
    </RegisterContextProvider>
  );
}
