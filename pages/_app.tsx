import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/Layout";
import { AuthContext, AuthProvider } from "../context/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";
import { SetStateAction, useContext, useEffect, useState } from "react";
import Register from "./register";
import First from "./first";

import Admin from "./admin";

export default function App({ Component, pageProps }: AppProps) {
  const userContext = useContext(AuthContext);

  // const [line, setLine] = useState();
  // const loadLine = async () => {
  //   await import("@line/liff").then((liff) => {
  //     liff
  //       .init({ liffId: "1657785397-LVBe6BkX" })
  //       .then(async () => {
  //         if (liff.isLoggedIn()) {
  //           console.log("login");
  //           const profile = await liff
  //             .getProfile()
  //             .then((profile: { userId: SetStateAction<undefined> }) => {
  //               setLine(profile.userId);
  //             });
  //         } else {
  //           // liff.login();
  //           console.log("not login");
  //         }
  //       })
  //       .catch(() => {
  //         console.log("error");
  //       });
  //     // lib is error
  //   });
  // };

  if (Component === Register || Component === First || Component === Admin) {
    return (
      <Provider store={store}>
        <AuthProvider>
          <MenuSlideProvider>
            <Component {...pageProps} />
          </MenuSlideProvider>
        </AuthProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <MenuSlideProvider>
          {/* <Layout> */}
            <Component {...pageProps} />
          {/* </Layout> */}
        </MenuSlideProvider>
      </AuthProvider>
    </Provider>
  );
}
