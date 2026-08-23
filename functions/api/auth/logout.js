export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const cookieHeader = request.headers.get("Cookie") || "";
    const sessionToken = getCookie(
      cookieHeader,
      "landingpro_session"
    );

    if (sessionToken) {
      const tokenHash = await hashToken(sessionToken);

      await env.DB.prepare(
        "DELETE FROM sessions WHERE token_hash = ?"
      )
        .bind(tokenHash)
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Logout successful",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie":
            "landingpro_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
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
