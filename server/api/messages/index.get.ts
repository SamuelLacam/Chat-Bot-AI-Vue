import { RowDataPacket } from "mysql2";

export default defineEventHandler(async (event) => {
  try {
    const { chatId, offset, limit } = getQuery(event);
    if (
      !chatId ||
      !offset ||
      !limit ||
      Number.isNaN(Number(chatId)) ||
      Number.isNaN(Number(offset)) ||
      Number.isNaN(Number(limit))
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "chatId, limit and offset query param expeted",
      });
    }
    const userId = event.context.user.userId;
    const db = getPool();
    const [results] = await db.execute<RowDataPacket[]>(
      "select m.id, role, content from message m join conversation c on m.conversation_id = c.id" +
        " where c.id = ? and c.user_id = ? order by m.created_at asc limit ? offset ?",
      [chatId, userId, limit, offset],
    );

    return results as { id: number; role: string; content: string }[];
  } catch (error: any) {
    console.log(error.message);
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
