export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const body = await request.json();

    const clientId = String(body?.clientId || "").trim();
    const template = String(body?.template || "").trim();
    const title = String(body?.title || "").trim();
    const slug = String(body?.slug || "").trim().toLowerCase();

    if (!clientId) {
      return Response.json(
        {
          success: false,
          message: "Client ID is required",
        },
        { status: 400 }
      );
    }

    if (!template) {
      return Response.json(
        {
          success: false,
          message: "Template is required",
        },
        { status: 400 }
      );
    }

    if (!title) {
      return Response.json(
        {
          success: false,
          message: "Landing page title is required",
        },
        { status: 400 }
      );
    }

    if (!slug) {
      return Response.json(
        {
          success: false,
          message: "Slug is required",
        },
        { status: 400 }
      );
    }

    const client = await env.DB.prepare(
      `SELECT id, user_id, business_name, status
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

    if (client.status !== "active") {
      return Response.json(
        {
          success: false,
          message: "Client account is not active",
        },
        { status: 403 }
      );
    }

    const existing = await env.DB.prepare(
      `SELECT id
       FROM landing_pages
       WHERE slug = ?
       LIMIT 1`
    )
      .bind(slug)
      .first();

    if (existing) {
      return Response.json(
        {
          success: false,
          message: "This slug is already in use",
        },
        { status: 409 }
      );
    }

    const landingPageId = crypto.randomUUID();

    await env.DB.prepare(
      `INSERT INTO landing_pages (
        id,
        client_id,
        template,
        title,
        slug,
        status
      )
      VALUES (?, ?, ?, ?, ?, 'draft')`
    )
      .bind(
        landingPageId,
        clientId,
        template,
        title,
        slug
      )
      .run();

    const landingPage = await env.DB.prepare(
      `SELECT
        id,
        client_id,
        template,
        title,
        slug,
        status,
        created_at,
        updated_at
       FROM landing_pages
       WHERE id = ?
       LIMIT 1`
    )
      .bind(landingPageId)
      .first();

    return Response.json(
      {
        success: true,
        message: "Landing page created successfully",
        data: {
          landingPage,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create landing page error:", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
