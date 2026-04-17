import { RowDataPacket } from "mysql2";
import { ref, watch } from "vue";

const PROMPT_SYSTEM = `You are a conversation title generator. Your sole purpose is to produce a single, concise title for a conversation based on its content.

## Task
Given the messages of a conversation, output one short title that captures its core topic or intent.

## Rules
- Output ONLY the title — no punctuation at the end, no quotes, no explanation, no preamble
- Length: 2 to 6 words (hard limit)
- Language: match the language of the conversation
- Tense & voice: use noun phrases or gerunds, not full sentences
  - ✅ "Debugging React useEffect Hook"
  - ✅ "Planning a Trip to Kyoto"
  - ❌ "The user wants to debug a React hook"
- Be specific, not generic
  - ✅ "Sorting Algorithms in Python"
  - ❌ "Coding Help"
- Capture intent, not just topic — if the user is troubleshooting, fixing, comparing, learning, creating, include that action
- Never include filler words like "Chat about", "Discussion on", "Conversation regarding"
- If the conversation is very short or unclear, infer the most likely intent from what's available — never output "Unknown" or "Untitled"

## Input format
You will receive the conversation as a series of turns, e.g.:
  User: ...
  Assistant: ...

## Output format
Plain text. The title only. Nothing else.`;

export default defineEventHandler(async (event) => {
  try {
    const { convId, messageId, replyId } = await readBody(event);
    // console.log(`stream: ${messageId}, ${replyId}`);
    // TODO: need a schema validator
    if (
      !convId ||
      Number.isNaN(Number(messageId)) ||
      !messageId ||
      Number.isNaN(Number(messageId)) ||
      !replyId ||
      Number.isNaN(Number(replyId))
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Param error",
        message: "It must have a convId, messageId and reply params and they must be a number",
      });
    }

    const db = getPool();
    const userId = event.context.user.userId;
    const [results] = await db.execute<RowDataPacket[]>(
      "select role, content from message m join conversation c on m.conversation_id = c.id " +
        "where m.id in (?, ?) and c.user_id = ?",
      [messageId, replyId, userId],
    );

    if (results.length < 2 || !results[0].content || !results[1].content) {
      throw createError({
        statusCode: 404,
        statusMessage: "Message/Reply not found",
        message: "No message/reply with this id for this user",
      });
    }

    let convName = "";
    const token = ref("");
    const res = event.node.res;
    const streamController = new AbortController();

    watch(token, (newToken) => {
      res.write(`data: "${newToken}"\n\n`);
      convName += newToken;
    });

    res.on("close", () => {
      if (!res.writableEnded) streamController.abort();
    });

    const messages = results as aiMessages;
    messages.push({ role: "system", content: PROMPT_SYSTEM });
    // TODO: create the AbortController
    await getAnswer(messages, token, streamController);

    await db.execute("update conversation set name = ? where id = ? and user_id = ?", [
      convName,
      convId,
      userId,
    ]);
    res.end();
  } catch (error: any) {
    console.log(error.message);
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
