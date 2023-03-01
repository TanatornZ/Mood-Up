import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";
import Register from "./register";
import First from "./first";

import Admin from "./admin";
import Conclusion from "./admin/conclusion";
import TeamMoodAdmin from "./admin/teammood";
import Login from "./admin/login";
import Summarize from "./admin/summarize";

export default function App({ Component, pageProps }: AppProps) {
  if (
    Component === Register ||
    Component === First ||
    Component === Admin ||
    Component === Conclusion ||
    Component === TeamMoodAdmin ||
    Component === Login ||
    Component === Summarize
  ) {
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MenuSlideProvider>
      </AuthProvider>
    </Provider>
  );
}
