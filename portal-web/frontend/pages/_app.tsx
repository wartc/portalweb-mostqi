import "../styles/globals.css";
import Modal from "react-modal";
import type { AppProps } from "next/app";

import { AuthProvider } from "../contexts/AuthContext";

Modal.setAppElement("#__next");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
