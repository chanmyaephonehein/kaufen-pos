import Layout from "@/components/Layout";
import { store } from "@/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kaufen POS</title>
      </Head>
      <SessionProvider>
        <Provider store={store}>
          <Layout>
            <Component />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}
