import { ResultSetHeader } from "mysql2";

export default defineEventHandler(async (event) => {
  let pool;
  let db;
  try {
    const userId = event.context.user.userId;
    const { firstMessage } = await readBody(event);
    pool = getPool();
    db = await pool.getConnection();

    await db.beginTransaction();
    const [convInsert] = await db.execute<ResultSetHeader>(
      "insert into conversation (user_id) values (?)",
      [userId],
    );
    const [messageInsert] = await db.execute<ResultSetHeader>(
      "insert into message (conversation_id, role, content) values (?, ?, ?)",
      [convInsert.insertId, "user", firstMessage],
    );
    await db.commit();

    return { convId: convInsert.insertId, messageId: messageInsert.insertId };
  } catch (error: any) {
    console.error(error.message);
    await db?.rollback();
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
