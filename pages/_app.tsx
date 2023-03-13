import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import Register from "./register";
import First from "./first";
import Admin from "./admin";
import Login from "./admin/login";
import Summarize from "./admin/summarize";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import { setLineUser } from "../store/auth-slice";

export default function App({ Component, pageProps }: AppProps) {

  if (
    Component === Register ||
    Component === First ||
    Component === Admin ||
    Component === Login ||
    Component === Summarize
  ) {
    return (
      <Provider store={store}>
        <MenuSlideProvider>
          <Component {...pageProps} />
        </MenuSlideProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <MenuSlideProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MenuSlideProvider>
    </Provider>
  );
}
