import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ref, watch } from "vue";

export default defineEventHandler(async (event) => {
  try {
    const messageId = event.context.params?.messageId;
    const { replyId } = await readBody(event);
    // console.log(`stream: ${messageId}, ${replyId}`);
    if (
      !messageId ||
      Number.isNaN(Number(messageId)) ||
      !replyId ||
      Number.isNaN(Number(replyId))
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Param error",
        message: "It must have a messageId and reply params and they must be a number",
      });
    }

    const db = getPool();
    const userId = event.context.user.userId;
    const [results] = await db.execute<RowDataPacket[]>(
      "select conversation_id, content from message m join conversation c on m.conversation_id = c.id " +
        "where m.id = ? and c.user_id = ?",
      [messageId, userId],
    );
    const content: string | undefined = results[0].content;
    if (!content) {
      throw createError({
        statusCode: 404,
        statusMessage: "Message not found",
        message: "No message with this id for this user",
      });
    }

    let reply = "";
    const token = ref("");
    const res = event.node.res;

    watch(token, (newToken) => {
      res.write(`data: "${newToken}"\n\n`);
      reply += newToken;
    });
    await getAnswer(content, token);

    await db.execute<ResultSetHeader>(
      "update message set conversation_id = ?, content = ?, role = ? where id = ?",
      [results[0].conversation_id, reply, "assistant", replyId],
    );
    res.end();
  } catch (error: any) {
    console.log(error.message);
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
