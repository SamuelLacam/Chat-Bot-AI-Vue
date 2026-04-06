import jwt from "jwt";

const isPublicPath = (url: URL): boolean => {
  const publicPath = [
    "/_nuxt",
    "/api/auth/login",
    "/api/auth/register",
    "/login",
    "/register",
    "favicon.ico",
  ];
  return publicPath.some((path) => url.pathname.startsWith(path));
};

const isApiPath = (url: URL) => url.pathname.startsWith("/api");

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (isPublicPath(url)) return;

  try {
    const token = getCookie(event, "Gizelle-jwt-auth");
    if (!token) throw Error("Unauthenticated");

    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtKey);

    event.context.user = decoded as AuthPayload;
  } catch (error: any) {
    console.error(error.message);
    if (isApiPath(url)) {
      throw createError({
        statusCode: 401,
        statusMessage: "JWT Error",
        message: error.message,
      });
    }
    return sendRedirect(event, "/login");
  }
});
