import jwt from "jwt";
import { RowDataPacket } from "mysql2";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { login, pwd } = await readBody(event);
  const db = getPool();

  try {
    const [results] = await db.execute<RowDataPacket[]>(
      "select id from user where login = ? and password = ?",
      [login, pwd],
    );
    const userId = results[0]?.id;
    // console.log("userId", userId);
    // console.log("result[0]", results);
    if (userId) {
      const token = jwt.encode({ userId, exp: Math.floor(Date.now()) + 3600000 }, config.jwtKey);
      setCookie(event, "Gizelle-jwt-auth", token, {
        path: "/",
        httpOnly: true,
        maxAge: 3600,
        secure: true,
        sameSite: "strict",
      });
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Authentification error",
        message: "Wrong email or password",
      });
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Server error",
      message: "Internal problem, please try again later",
    });
  }
});
