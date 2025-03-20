import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import "../styles/style.scss";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";
import { MenuProvider } from "@/context/MenuContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MenuProvider>
        <div className="l-wrapper">
          <Header />
          <main className="l-main l-container">
            <Aside />
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </MenuProvider>
    </AuthProvider>
  );
}
