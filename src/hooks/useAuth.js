import { useEffect, useState } from "react";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.me()
      .then((response) => setUser(response?.data || response?.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const loggedInUser = response?.data || response?.user || null;
    setUser(loggedInUser);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === "admin",
    isClient: user?.role === "client",
    login,
    logout,
  };
};
