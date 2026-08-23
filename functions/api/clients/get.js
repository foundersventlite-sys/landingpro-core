export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);

    const clientId = url.searchParams.get("id");

    if (!clientId) {
      return Response.json(
        {
          success: false,
          message: "Client ID is required",
        },
        { status: 400 }
      );
    }

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

    if (!client) {
      return Response.json(
        {
          success: false,
          message: "Client not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Client retrieved successfully",
      data: {
        client,
      },
    });
  } catch (error) {
    console.error("Get client error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
