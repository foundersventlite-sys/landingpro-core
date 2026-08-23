export async function clientAuth(context) {
  const { request, env } = context;

  const cookieHeader = request.headers.get("Cookie") || "";
  const sessionToken = getCookie(
    cookieHeader,
    "landingpro_session"
  );

  if (!sessionToken) {
    return {
      authenticated: false,
      response: Response.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      ),
    };
  }

  const tokenHash = await hashToken(sessionToken);

  const session = await env.DB.prepare(
    `SELECT
      sessions.id,
      sessions.user_id,
      sessions.expires_at,
      users.email,
      users.role,
      users.name,
      users.status
     FROM sessions
     INNER JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = ?
     LIMIT 1`
  )
    .bind(tokenHash)
    .first();

  if (!session) {
    return {
      authenticated: false,
      response: Response.json(
        {
          success: false,
          message: "Invalid session",
        },
        { status: 401 }
      ),
    };
  }

  if (new Date(session.expires_at).getTime() <= Date.now()) {
    await env.DB.prepare(
      "DELETE FROM sessions WHERE id = ?"
    )
      .bind(session.id)
      .run();

    return {
      authenticated: false,
      response: Response.json(
        {
          success: false,
          message: "Session expired",
        },
        { status: 401 }
      ),
    };
  }

  if (session.status !== "active") {
    return {
      authenticated: false,
      response: Response.json(
        {
          success: false,
          message: "Account is not active",
        },
        { status: 403 }
      ),
    };
  }

  if (session.role !== "client") {
    return {
      authenticated: false,
      response: Response.json(
        {
          success: false,
          message: "Client access required",
        },
        { status: 403 }
      ),
    };
  }

  return {
    authenticated: true,
    user: {
      id: session.user_id,
      email: session.email,
      role: session.role,
      name: session.name,
    },
    session: {
      id: session.id,
      expiresAt: session.expires_at,
    },
  };
}

function getCookie(cookieHeader, name) {
  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");

    if (key === name) {
      return valueParts.join("=");
    }
  }

  return null;
}

async function hashToken(token) {
  const data = new TextEncoder().encode(token);

  const hash = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
