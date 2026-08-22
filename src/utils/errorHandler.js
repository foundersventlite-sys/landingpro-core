export const getErrorMessage = (error, fallback = "Something went wrong") =>
  error?.message || fallback;

export const handleError = (error, fallback = "Something went wrong") => {
  console.error(error);
  return {
    success: false,
    message: getErrorMessage(error, fallback),
  };
};
