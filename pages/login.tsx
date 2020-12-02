import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useAuth } from "../context/auth-context";
import { EmailInput, PasswordInput } from "../components/inputs";
import { ErrorIcon } from "../components/icons";

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    setError("");

    try {
      await login(email, password);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  });

  return (
    <div>
      <Head>
        <title>Garage Manager - Login</title>
      </Head>

      <main className="container mx-auto">
        <h1 className="mt-16 mb-6 text-2xl text-center text-gray-800">
          Welcome back, please login
        </h1>
        <form
          className="px-4 mx-4 border-green-500 rounded-sm sm:w-full sm:shadow-md sm:border-t-4 sm:bg-white sm:max-w-md sm:mx-auto sm:p-16"
          onSubmit={handleSubmit}
        >
          <EmailInput
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
          <PasswordInput
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setPassword(e.target.value)
            }
          />
          <div
            className={`flex items-center mb-2 ${
              error ? "visible" : "invisible"
            }`}
            data-test-error
          >
            <ErrorIcon />
            <span className="text-red-700">{error || "No errors"}</span>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-sm font-bold text-white uppercase bg-green-500 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
