import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const loadLine = async () => {
    await import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("error");
        });
      // liff.login();
      // lib is error
      console.log(liff.isLoggedIn);
    });
  };

  useEffect(() => {
    loadLine();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <MenuSlideProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MenuSlideProvider>
      </AuthProvider>
    </Provider>
  );
}
