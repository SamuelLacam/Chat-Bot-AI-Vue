import jwt from "jwt";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const url = getRequestURL(event);
  const publicPath = [
    "/_nuxt",
    "/api/auth/login",
    "/api/auth/register",
    "/login",
    "/register",
    "favicon.ico",
  ];
  const isPublic = publicPath.some((path) => url.pathname.startsWith(path));
  if (isPublic) return;

  const token = getCookie(event, "Gizelle-jwt-auth");
  //TODO: refactor
  if (!token) {
    if (url.pathname.startsWith("/api")) {
      throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
    }
    console.error("no jwt token");
    return sendRedirect(event, "/login");
  }
  try {
    const decoded = jwt.verify(token, config.jwtKey);
    event.context.user = decoded as AuthPayload;
  } catch (error: any) {
    if (url.pathname.startsWith("/api")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid token or expired",
      });
    }
    console.error(error.message);
    return sendRedirect(event, "/login");
  }

  // try {
  //   const token = getCookie(event, "Gizelle-jwt-auth");
  //   if (!token) throw Error("Unauthenticated");
  //   const decoded = jwt.verify(token, config.jwtKey);
  //   event.context.user = decoded;
  // } catch (error) {}
});
