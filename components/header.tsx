import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth-context";
import Cookies from "js-cookie";

export function Header(): JSX.Element {
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("token"));
  });

  return (
    <header className="flex items-center justify-between bg-white">
      <div className="w-1/6 pl-4">
        {isAuthenticated && (
          <Link href="/activity">
            <a className={`hover:underline focus:outline-none focus:underline`}>
              Activity
            </a>
          </Link>
        )}
      </div>

      <h1 className="w-4/6 py-4 text-2xl text-center">
        <Link href="/">
          <a className="font-bold uppercase focus:outline-none focus:underline hover:underline">
            Garagely
          </a>
        </Link>
      </h1>

      <div className="w-1/6 pr-4 text-right">
        {isAuthenticated && (
          <button
            className={`hover:underline focus:outline-none focus:underline`}
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
