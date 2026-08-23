export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const user = await env.DB.prepare(
      `SELECT id, email, password_hash, role, name, status
       FROM users
       WHERE email = ? AND role = 'admin'
       LIMIT 1`
    )
      .bind(email)
      .first();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    if (user.status !== "active") {
      return Response.json(
        {
          success: false,
          message: "Account is not active",
        },
        { status: 403 }
      );
    }

    const passwordHash = await hashPassword(password);

    if (passwordHash !== user.password_hash) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const sessionId = crypto.randomUUID();
    const sessionToken = crypto.randomUUID();

    const tokenHash = await hashPassword(sessionToken);

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    await env.DB.prepare(
      `INSERT INTO sessions (
        id,
        user_id,
        token_hash,
        expires_at
      ) VALUES (?, ?, ?, ?)`
    )
      .bind(
        sessionId,
        user.id,
        tokenHash,
        expiresAt
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
          },
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": [
            `landingpro_session=${sessionToken}`,
            "HttpOnly",
            "Secure",
            "SameSite=Lax",
            "Path=/",
            "Max-Age=604800",
          ].join("; "),
        },
      }
    );
  } catch (error) {
    console.error("Admin login error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

async function hashPassword(value) {
  const data = new TextEncoder().encode(value);

  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
      }
