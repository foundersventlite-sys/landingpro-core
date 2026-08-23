export async function onRequestPut(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const clientId = String(body?.id || "").trim();

    if (!clientId) {
      return Response.json(
        {
          success: false,
          message: "Client ID is required",
        },
        { status: 400 }
      );
    }

    const existingClient = await env.DB.prepare(
      `SELECT id
       FROM clients
       WHERE id = ?
       LIMIT 1`
    )
      .bind(clientId)
      .first();

    if (!existingClient) {
      return Response.json(
        {
          success: false,
          message: "Client not found",
        },
        { status: 404 }
      );
    }

    const fields = [];
    const values = [];

    if (body.businessName !== undefined) {
      fields.push("business_name = ?");
      values.push(String(body.businessName).trim());
    }

    if (body.phone !== undefined) {
      fields.push("phone = ?");
      values.push(String(body.phone).trim());
    }

    if (body.email !== undefined) {
      fields.push("email = ?");
      values.push(String(body.email).trim().toLowerCase());
    }

    if (body.address !== undefined) {
      fields.push("address = ?");
      values.push(String(body.address).trim());
    }

    if (body.status !== undefined) {
      const status = String(body.status).trim();

      if (!["active", "suspended", "inactive"].includes(status)) {
        return Response.json(
          {
            success: false,
            message: "Invalid client status",
          },
          { status: 400 }
        );
      }

      fields.push("status = ?");
      values.push(status);
    }

    if (fields.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No fields to update",
        },
        { status: 400 }
      );
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");

    values.push(clientId);

    await env.DB.prepare(
      `UPDATE clients
       SET ${fields.join(", ")}
       WHERE id = ?`
    )
      .bind(...values)
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

    return Response.json({
      success: true,
      message: "Client updated successfully",
      data: {
        client,
      },
    });
  } catch (error) {
    console.error("Update client error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
