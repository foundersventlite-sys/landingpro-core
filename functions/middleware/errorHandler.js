export function errorHandler(error) {
  console.error("API Error:", error);

  return Response.json(
    {
      success: false,
      message: "Internal server error",
    },
    {
      status: 500,
    }
  );
}
