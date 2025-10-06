import jwt from "jwt";
import { ResultSetHeader } from "mysql2";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { login, pwd } = await readBody(event);
  const db = getPool();

  try {
    const [results] = await db.execute<ResultSetHeader>(
      "insert into user (login, password) values (?, ?)",
      [login, pwd],
    );
    const token = jwt.encode(
      {
        userId: results.insertId,
        exp: Math.floor(Date.now()) + 3600000,
      },
      config.jwtKey,
    );
    setCookie(event, "Gizelle-jwt-auth", token, {
      path: "/",
      httpOnly: true,
      maxAge: 3600,
      secure: true,
      sameSite: "strict",
    });
  } catch (error: any) {
    // MySQL error for unique key
    if (error.code === "ER_DUP_ENTRY") {
      throw createError({
        statusCode: 400,
        statusMessage: "Duplicate email entry",
        message: "This email is already used",
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Server error",
      message: "Internal problem, please try again later",
    });
  }
});
