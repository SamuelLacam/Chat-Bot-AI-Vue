import { ResultSetHeader } from "mysql2";
import { getAnswerTest } from "~~/server/utils/ai";

export default defineEventHandler(async (event) => {
  const { convId, content } = await readBody(event);
  const userId = event.context.user.userId;

  try {
    const db = getPool();
    const [userResults] = await db.execute<ResultSetHeader>(
      "insert into message (conversation_id, role, content) select ?, ?, ?" +
        " where exists (select 1 from conversation where id = ? and user_id = ?);",
      [convId, "user", content, convId, userId],
    );

    const reply = await getAnswerTest(content);
    const [aiResults] = await db.execute<ResultSetHeader>(
      "INSERT INTO message (conversation_id, role, content) VALUES (?, ?, ?)",
      [convId, "assistant", reply],
    );

    return {
      userMessageInsertId: userResults.insertId,
      aiMessageInsertId: aiResults.insertId,
      reply,
    };
  } catch (error: any) {
    console.log(error.message);
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
