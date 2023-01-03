import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";
import { useEffect } from "react";
import liff from "@line/liff";

// const liffId = "1657785397-LVBe6BkX";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const loadLine = async () => {
      await liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(() => {
          // Start to use liff's api
          console.log("success");
        })
        .catch((err) => {
          // Error happens during initialization
          console.log(err.code, err.message);
        });
    };
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
