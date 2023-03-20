import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import wagmiConfig from "../lib/wagmi";
import { LensProvider } from "@lens-protocol/react-web";
import { UserProvider } from "../components/user-context";
import lensConfig from "../lib/lens";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <WagmiConfig client={wagmiConfig}>
          <LensProvider config={lensConfig}>
            <UserProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </LensProvider>
      </WagmiConfig>
    </>
  );
}
