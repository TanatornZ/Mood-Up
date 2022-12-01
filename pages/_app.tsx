import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MenuSlideProvider } from "../context/MenuSlideProvider";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MenuSlideProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuSlideProvider>
  );
}
