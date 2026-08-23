export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");
    const businessName = String(body?.businessName || "").trim();
    const phone = String(body?.phone || "").trim();
    const address = String(body?.address || "").trim();

    if (!name || !email || !password || !businessName) {
      return Response.json(
        {
          success: false,
          message:
            "Name, email, password and business name are required",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          message: "Password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    const existingUser = await env.DB.prepare(
      `SELECT id
       FROM users
       WHERE email = ?
       LIMIT 1`
    )
      .bind(email)
      .first();

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 409 }
      );
    }

    const userId = crypto.randomUUID();
    const clientId = crypto.randomUUID();

    const passwordHashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(password)
    );

    const passwordHash = Array.from(
      new Uint8Array(passwordHashBuffer)
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    await env.DB.prepare(
      `INSERT INTO users (
        id,
        email,
        password_hash,
        role,
        name,
        status
      )
      VALUES (?, ?, ?, 'client', ?, 'active')`
    )
      .bind(
        userId,
        email,
        passwordHash,
        name
      )
      .run();

    await env.DB.prepare(
      `INSERT INTO clients (
        id,
        user_id,
        business_name,
        phone,
        email,
        address,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, 'active')`
    )
      .bind(
        clientId,
        userId,
        businessName,
        phone || null,
        email,
        address || null
      )
      .run();

    const client = await env.DB.prepare(
      `SELECT
        c.id,
        c.user_id,
        c.business_name,
        c.phone,
        c.email,
        c.address,
        c.status,
        c.created_at,
        c.updated_at,
        u.name,
        u.email AS user_email,
        u.role AS user_role
       FROM clients c
       INNER JOIN users u ON u.id = c.user_id
       WHERE c.id = ?
       LIMIT 1`
    )
      .bind(clientId)
      .first();

    return Response.json(
      {
        success: true,
        message: "Client created successfully",
        data: {
          client,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create client error:", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
