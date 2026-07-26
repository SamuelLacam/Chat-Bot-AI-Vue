export const createServerError = () => {
  return createError({
    statusCode: 500,
    statusMessage: "Server error",
    message: "Internal problem, please try again later",
  });
};
