import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { AuthProvider } from "../contexts/AuthContext";
import { Poppins } from "@next/font/google";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

Modal.setAppElement("#__next");

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Toaster />
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </>
  );
}
