import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/Layout";
import { AuthContext, AuthProvider, AuthType } from "../context/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";
import { SetStateAction, useContext, useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { user, changeUser } = useContext<AuthType>(AuthContext);

  const [line, setLine] = useState();
  const loadLine = async () => {
    await import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(async () => {
          if (liff.isLoggedIn()) {
            console.log("login");
            const profile = await liff
              .getProfile()
              .then((profile: { userId: SetStateAction<undefined> }) => {
                setLine(profile.userId);
              });
          } else {
            liff.login();
            console.log("not login");
          }
        })
        .catch(() => {
          console.log("error");
        });
      // lib is error
    });
  };

  useEffect(() => {
    loadLine();
  }, []);

  console.log("line " + line);

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
