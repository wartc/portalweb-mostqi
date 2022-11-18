import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import Modal from "react-modal";
import "../styles/globals.css";

import { AuthProvider } from "../contexts/AuthContext";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

Modal.setAppElement("#__next");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
