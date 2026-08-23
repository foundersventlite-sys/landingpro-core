import { onRequestPost as adminLogin } from "./api/auth/admin-login.js";
import { onRequestPost as clientLogin } from "./api/auth/client-login.js";
import { onRequestGet as session } from "./api/auth/session.js";
import { onRequestPost as logout } from "./api/auth/logout.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/auth/admin-login" && request.method === "POST") {
      return adminLogin({ request, env });
    }

    if (url.pathname === "/api/auth/client-login" && request.method === "POST") {
      return clientLogin({ request, env });
    }

    if (url.pathname === "/api/auth/session" && request.method === "GET") {
      return session({ request, env });
    }

    if (url.pathname === "/api/auth/logout" && request.method === "POST") {
      return logout({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
