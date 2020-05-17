import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import * as Sentry from "@sentry/node";
import "../styles/index.css";
import { useAuth, AuthProvider } from "../context/auth-context";
import Cookies from "js-cookie";
import { makeServer } from "../mirage";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
});

function Header(): JSX.Element {
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("token"));
  });

  return (
    <header className="flex items-center justify-between h-full bg-white">
      <div className="w-1/6"></div>
      <h1 className="w-4/6 py-4 text-2xl text-center uppercase">
        <Link href="/">
          <a className="mx-auto">
            <strong>Garage</strong>
            <span className="font-thin">Manager</span>
          </a>
        </Link>
      </h1>
      <div className="w-1/6 pr-4 text-right">
        <button
          className={`hover:underline ${isAuthenticated ? "" : "hidden"}`}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

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
