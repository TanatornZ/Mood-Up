import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";

export default function App({ Component, pageProps }: AppProps) {
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
