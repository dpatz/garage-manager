import React, { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import Router from "next/router";

const Home = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  });

  return <div></div>;
};

export default Home;
