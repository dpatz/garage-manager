import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useAuth } from "../context/auth-context";
import { Response, Server } from "miragejs";
import Cookies from "js-cookie";

new Server({
  routes(): void {
    this.post("/api/auth", (_, request) => {
      const json = JSON.parse(request.requestBody);
      if (json.email === "dan@example.com") {
        Cookies.set("token", "123");
        return new Response(200);
      } else {
        return new Response(401, {}, "Invalid username or password");
      }
    });
  },
});

type InputProps = {
  label: string;
};

const Input = ({
  label,
  ...attrs
}: InputProps & React.HTMLProps<HTMLInputElement>): JSX.Element => (
  <label className="text-sm font-bold text-gray-600">
    {label}
    <input className="block w-full mt-1 mb-4 form-input" {...attrs} />
  </label>
);

const EmailInput = (
  props: InputProps | React.HTMLProps<HTMLInputElement>
): JSX.Element => (
  <Input
    label="Email Address"
    name="email"
    type="email"
    autoComplete="username"
    {...props}
  />
);

const PasswordInput = (
  props: InputProps | React.HTMLProps<HTMLInputElement>
): JSX.Element => (
  <Input
    label="Password"
    name="password"
    type="password"
    autoComplete="current-password"
    {...props}
  />
);

const ErrorIcon = (): JSX.Element => (
  <div
    style={{
      width: "16px",
      height: "12px",
    }}
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="#c53030"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 3C5.25 2.58579 5.58579 2.25 6 2.25C6.41421 2.25 6.75 2.58579 6.75 3V6.75C6.75 7.16421 6.41421 7.5 6 7.5C5.58579 7.5 5.25 7.16421 5.25 6.75V3ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 9C5.25 8.58579 5.58579 8.25 6 8.25C6.41421 8.25 6.75 8.58579 6.75 9C6.75 9.41421 6.41421 9.75 6 9.75C5.58579 9.75 5.25 9.41421 5.25 9Z"
        fill="white"
      ></path>
    </svg>
  </div>
);

const Home = (): JSX.Element => {
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
        <h1 className="mt-8 mb-6 text-2xl text-center text-gray-800 md:mt-16">
          Welcome back, please login
        </h1>
        <form
          className="p-4 mx-4 bg-white border-t-4 border-blue-500 rounded-sm shadow-md md:w-1/3 lg:w-1/3 md:mx-auto md:p-16"
          onSubmit={handleSubmit}
        >
          <EmailInput
            autoFocus
            value={email}
            onInput={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
          <PasswordInput
            value={password}
            onInput={(e: React.ChangeEvent<HTMLInputElement>): void =>
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
            className="block w-full p-3 text-sm font-bold text-white uppercase bg-blue-500 rounded-md"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
