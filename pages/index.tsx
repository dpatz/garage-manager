import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import Router from "next/router";
import { Garage } from "../components/garage";

const HomePage = (): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isOpen, setIsOpen] = useState(null) as [boolean | null, any];

  useEffect(() => {
    const setGarageStatus = async (): Promise<void> => {
      const response = await fetch("/api/garage_status");

      if (response.status === 401) {
        console.log("Not authenticated");
        logout();
        return;
      }

      if (response.status !== 200) {
        console.log("Something went wrong");
        return;
      }

      const data = await response.json();
      setIsOpen(data.isOpen);
    };
    setGarageStatus();
  }, [setIsOpen, logout]);

  const toggleGarageStatus = async (): Promise<void> => {
    const response = await fetch("/api/garage_toggle");

    if (response.status === 401) {
      console.log("Not authenticated");
      logout();
      return;
    }

    if (response.status !== 200) {
      console.log("Something went wrong");
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center flex-grow h-full">
      <button
        className={`w-full max-w-md mx-4 bg-red-100 ${
          isOpen === null ? "opacity-50" : ""
        }`}
        aria-label="Garage"
        disabled={isOpen === null}
        onClick={toggleGarageStatus}
      >
        <Garage isOpen={isOpen} />
      </button>
    </div>
  );
};

export default HomePage;
