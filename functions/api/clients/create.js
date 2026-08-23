import { randomUUID } from "node:crypto";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const userId = String(body?.userId || "").trim();
    const businessName = String(body?.businessName || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const address = String(body?.address || "").trim();

    if (!userId || !businessName) {
      return Response.json(
        {
          success: false,
          message: "User ID and business name are required",
        },
        { status: 400 }
      );
    }

    const user = await env.DB.prepare(
      `SELECT id, role, status
       FROM users
       WHERE id = ?
       LIMIT 1`
    )
      .bind(userId)
      .first();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.role !== "client") {
      return Response.json(
        {
          success: false,
          message: "User must have client role",
        },
        { status: 400 }
      );
    }

    const existingClient = await env.DB.prepare(
      `SELECT id
       FROM clients
       WHERE user_id = ?
       LIMIT 1`
    )
      .bind(userId)
      .first();

    if (existingClient) {
      return Response.json(
        {
          success: false,
          message: "Client profile already exists",
        },
        { status: 409 }
      );
    }

    const clientId = randomUUID();

    await env.DB.prepare(
      `INSERT INTO clients (
        id,
        user_id,
        business_name,
        phone,
        email,
        address,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        clientId,
        userId,
        businessName,
        phone || null,
        email || null,
        address || null,
        "active"
      )
      .run();

    const client = await env.DB.prepare(
      `SELECT
        id,
        user_id,
        business_name,
        phone,
        email,
        address,
        status,
        created_at,
        updated_at
       FROM clients
       WHERE id = ?
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
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
