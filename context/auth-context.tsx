import React, { useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

interface AuthProviderInterface {
  login: (email: string, password: string) => void;
  logout: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated?: boolean;
}

const AuthContext = React.createContext({
  login: () => undefined,
  logout: () => undefined,
  setIsAuthenticated: () => undefined,
});
AuthContext.displayName = "AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthProvider(props: any): any {
  const [data, setData] = useState({
    isAuthenticated: true,
  });

  const login = React.useCallback(
    async (email: string, password: string) => {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status != 200) {
        setData({
          isAuthenticated: false,
        });
        throw await response.text();
      } else {
        setData({
          isAuthenticated: true,
        });
        Router.push("/");
      }
    },
    [setData]
  );
  const logout = React.useCallback(() => {
    Cookies.remove("token");
    Router.push("/login");

    setData({
      isAuthenticated: false,
    });
  }, [setData]);

  const value = React.useMemo(
    () => ({
      login,
      logout,
      setIsAuthenticated: (isAuthenticated: boolean): void =>
        setData({ isAuthenticated }),
      isAuthenticated: data.isAuthenticated,
    }),
    [login, logout, data.isAuthenticated]
  );

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth(): AuthProviderInterface {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
