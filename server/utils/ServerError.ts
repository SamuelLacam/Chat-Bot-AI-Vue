export class ServerError {
  constructor() {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
      message: "Internal problem, please try again later",
    });
  }
}
