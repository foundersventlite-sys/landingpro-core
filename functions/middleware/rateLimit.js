const requests = new Map();

export function rateLimit(options = {}) {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 60 * 1000;

  return async (context, next) => {
    const { request } = context;

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "unknown";

    const now = Date.now();
    const record = requests.get(ip);

    if (!record || now - record.start >= windowMs) {
      requests.set(ip, {
        count: 1,
        start: now,
      });

      return next();
    }

    if (record.count >= limit) {
      return Response.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((windowMs - (now - record.start)) / 1000)
            ),
          },
        }
      );
    }

    record.count += 1;

    return next();
  };
}
