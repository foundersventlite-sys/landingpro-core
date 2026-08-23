import { createContext, useContext, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();

  const value = useMemo(() => auth, [
    auth.user,
    auth.loading,
    auth.isAuthenticated,
    auth.isAdmin,
    auth.isClient,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
