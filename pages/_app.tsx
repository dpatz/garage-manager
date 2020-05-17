import React from "react";
import Head from "next/head";
import "../styles/index.css";
import { makeServer } from "../mirage";
import * as Sentry from "@sentry/node";
import { AuthProvider } from "../context/auth-context";
import { Header } from "../components/header";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps, err }: any): JSX.Element {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const modifiedPageProps = { ...pageProps, err };

  return (
    <AuthProvider>
      <Head>
        <title>Garage Manager</title>
      </Head>
      <Header />
      <Component {...modifiedPageProps} />
    </AuthProvider>
  );
}

export default MyApp;
