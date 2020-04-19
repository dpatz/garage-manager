import React from "react";
import App from "next/app";
import * as Sentry from "@sentry/node";
import "../styles/index.css";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
});

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return <Component {...modifiedPageProps} />;
  }
}

export default MyApp;
