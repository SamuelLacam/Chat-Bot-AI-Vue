import { ResultSetHeader } from "mysql2";

export default defineEventHandler(async (event) => {
  const { convId, content, role } = await readBody(event);
  const userId = event.context.user.userId;

  try {
    const db = getPool();
    const [results] = await db.execute<ResultSetHeader>(
      "insert into message (conversation_id, role, content) select ?, ?, ?" +
        " where exists (select 1 from conversation where id = ? and user_id = ?);",
      [convId, role, content, convId, userId],
    );

    return { insertId: results.insertId };
  } catch (error: any) {
    console.log(error.message);
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
