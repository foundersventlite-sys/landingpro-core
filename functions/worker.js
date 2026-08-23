import { onRequestPost as adminLogin } from "./api/auth/admin-login.js";
import { onRequestPost as clientLogin } from "./api/auth/client-login.js";
import { onRequestGet as session } from "./api/auth/session.js";
import { onRequestPost as logout } from "./api/auth/logout.js";

import { onRequestGet as listClients } from "./api/clients/list.js";
import { onRequestPost as createClient } from "./api/clients/create.js";
import { onRequestGet as getClient } from "./api/clients/get.js";
import { onRequestPut as updateClient } from "./api/clients/update.js";
import { onRequestDelete as deleteClient } from "./api/clients/delete.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Auth routes
    if (
      url.pathname === "/api/auth/admin-login" &&
      request.method === "POST"
    ) {
      return adminLogin({ request, env });
    }

    if (
      url.pathname === "/api/auth/client-login" &&
      request.method === "POST"
    ) {
      return clientLogin({ request, env });
    }

    if (
      url.pathname === "/api/auth/session" &&
      request.method === "GET"
    ) {
      return session({ request, env });
    }

    if (
      url.pathname === "/api/auth/logout" &&
      request.method === "POST"
    ) {
      return logout({ request, env });
    }

    // Client routes
    if (
      url.pathname === "/api/clients/list" &&
      request.method === "GET"
    ) {
      return listClients({ request, env });
    }

    if (
      url.pathname === "/api/clients/create" &&
      request.method === "POST"
    ) {
      return createClient({ request, env });
    }

    if (
      url.pathname === "/api/clients/get" &&
      request.method === "GET"
    ) {
      return getClient({ request, env });
    }

    if (
      url.pathname === "/api/clients/update" &&
      request.method === "PUT"
    ) {
      return updateClient({ request, env });
    }

    if (
      url.pathname === "/api/clients/delete" &&
      request.method === "DELETE"
    ) {
      return deleteClient({ request, env });
    }

    // Static assets / frontend
    return env.ASSETS.fetch(request);
  },
};
