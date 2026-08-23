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

    if (!userId) {
      return Response.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    if (!businessName) {
      return Response.json(
        {
          success: false,
          message: "Business name is required",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const user = await env.DB.prepare(
      `SELECT id, email, role, name, status
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
          message: "User is not a client",
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
          message: "A client already exists for this user",
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
