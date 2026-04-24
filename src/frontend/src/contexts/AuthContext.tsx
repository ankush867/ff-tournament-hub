import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { createContext, useContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  principalId: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  // Admin detection: stored in localStorage after backend confirms role
  const storedAdmin =
    typeof window !== "undefined"
      ? localStorage.getItem("ff_is_admin") === "true"
      : false;

  const handleLogout = () => {
    clear();
    queryClient.clear();
    localStorage.removeItem("ff_is_admin");
  };

  const principalId = identity?.getPrincipal().toString() ?? null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        isLoggingIn,
        isAdmin: storedAdmin,
        login,
        logout: handleLogout,
        principalId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
