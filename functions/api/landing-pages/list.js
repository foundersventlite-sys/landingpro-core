export async function onRequestGet(context) {
  try {
    const { env } = context;

    const result = await env.DB.prepare(
      `SELECT
        lp.id,
        lp.client_id,
        lp.template,
        lp.title,
        lp.slug,
        lp.status,
        lp.created_at,
        lp.updated_at,
        c.business_name
       FROM landing_pages lp
       INNER JOIN clients c ON c.id = lp.client_id
       ORDER BY lp.created_at DESC`
    ).all();

    return Response.json({
      success: true,
      message: "Landing pages retrieved successfully",
      data: {
        landingPages: result.results || [],
      },
    });
  } catch (error) {
    console.error("List landing pages error:", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
