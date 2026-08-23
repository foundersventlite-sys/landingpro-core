export async function onRequestGet(context) {
  try {
    const { env } = context;

    const result = await env.DB.prepare(
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
        u.email AS user_email
       FROM clients c
       INNER JOIN users u ON u.id = c.user_id
       ORDER BY c.created_at DESC`
    ).all();

    return Response.json({
      success: true,
      message: "Clients retrieved successfully",
      data: {
        clients: result.results || [],
      },
    });
  } catch (error) {
    console.error("List clients error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
