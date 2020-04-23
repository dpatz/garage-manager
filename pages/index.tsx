import React from "react";
import Head from "next/head";

const Home = (): JSX.Element => (
  <div>
    <Head>
      <title>Garage Manager</title>
    </Head>

    <header className="h-full bg-white">
      <div className="container py-4 mx-auto">
        <h1 className="text-2xl text-center uppercase">
          <strong>Garage</strong>
          <span className="font-thin">Manager</span>
        </h1>
      </div>
    </header>
  </div>
);

export default Home;
