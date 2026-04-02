import { RowDataPacket } from "mysql2";
import { ServerError } from "~~/server/utils/ServerError";

export default defineEventHandler(async (event) => {
  try {
    const { offset, limit } = getQuery(event);
    if (!offset || !limit || Number.isNaN(Number(offset)) || Number.isNaN(Number(limit))) {
      throw createError({
        statusCode: 400,
        statusMessage: "limit and offset query param expeted",
      });
    }
    const userId = event.context.user.userId;
    const db = getPool();
    const [results] = await db.execute<RowDataPacket[]>(
      "select id, name from conversation where user_id = ? order by updated_at desc limit ? offset ?",
      [userId, limit, offset],
    );
    return results as { id: number; name: string }[];
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
