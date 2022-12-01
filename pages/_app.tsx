import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { MenuSlideProvider } from "../context/MenuSlideProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MenuSlideProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuSlideProvider>
  );
}
