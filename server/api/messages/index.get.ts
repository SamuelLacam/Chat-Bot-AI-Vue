import { RowDataPacket } from "mysql2";

export default defineEventHandler(async (event) => {
  try {
    const { chatId, offset, limit } = getQuery(event);
    // console.log(chatId, offset, limit);
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
    const [res1] = await db.execute<RowDataPacket[]>(
      "select m.id, role, content " +
        "from message m join conversation c on m.conversation_id = c.id" +
        " where c.id = ? and c.user_id = ? order by m.id desc limit ? offset ?",
      [chatId, userId, limit, offset],
    );
    const [res2] = await db.execute<RowDataPacket[]>(
      "select count(*) as total from message m join conversation c on m.conversation_id = c.id" +
        " where c.id = ? and c.user_id = ?",
      [chatId, userId],
    );

    const [{ total }] = res2;
    const done = limit >= total;
    const result = { data: res1, done } as {
      data: { id: number; role: string; content: string }[];
      done: boolean;
    };
    return result;
  } catch (error: any) {
    console.log(error.message);
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
