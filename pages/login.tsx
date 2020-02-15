import React from "react";
import Head from "next/head";
import Link from "next/link";

const Home = (): JSX.Element => (
  <div>
    <Head>
      <title>Garage Manager - Login</title>
    </Head>

    <header className="h-full bg-white">
      <div className="container mx-auto py-4 text-2xl text-center uppercase">
        <Link href="/">
          <a>
            <span className="font-bold">Garage</span>
            <span className="font-thin">Manager</span>
          </a>
        </Link>
      </div>
    </header>
    <main className="container mx-auto">
      <h1 className="mt-16 mb-6 text-2xl text-center text-gray-800">
        Welcome back, please login
      </h1>
      <form className="w-1/3 mx-auto p-16 bg-white shadow-md rounded-sm border-t-4 border-blue-500">
        <label className="text-gray-600 font-bold text-sm">
          Email
          <input
            name="email"
            type="email"
            className="block mt-1 mb-4 p-2 w-full text-lg text-gray-800 border-gray-300 border-2 rounded-sm"
            autoComplete="username"
          />
        </label>
        <label className="text-gray-600 font-bold text-sm">
          Password
          <input
            name="password"
            type="password"
            className="block mt-1 mb-8 p-2 w-full text-lg text-gray-800 border-gray-300 border-2 rounded-sm"
            autoComplete="current-password"
          />
        </label>
        <Link href="/">
          <button className="block p-3 w-full bg-blue-500 text-white text-sm uppercase font-bold rounded-full">
            Login
          </button>
        </Link>
      </form>
    </main>
  </div>
);

export default Home;
