import { useAuthContext } from "../context/AuthContext";
import { PERMISSIONS } from "../config/permissions";

export const usePermission = () => {
  const { user } = useAuthContext();
  const role = user?.role;

  const can = (permission) =>
    Boolean(role && PERMISSIONS[role]?.includes(permission));

  return {
    can,
    isAdmin: role === "admin",
    isClient: role === "client",
  };
};
