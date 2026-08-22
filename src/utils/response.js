export const successResponse = (data = null, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message = "Something went wrong", code = "ERROR") => ({
  success: false,
  message,
  code,
});
