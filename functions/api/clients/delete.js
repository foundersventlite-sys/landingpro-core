export async function onRequestDelete(context) {
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
      `SELECT id, user_id
       FROM clients
       WHERE id = ?
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

    await env.DB.prepare(
      `DELETE FROM clients
       WHERE id = ?`
    )
      .bind(clientId)
      .run();

    return Response.json({
      success: true,
      message: "Client deleted successfully",
      data: {
        id: clientId,
      },
    });
  } catch (error) {
    console.error("Delete client error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
