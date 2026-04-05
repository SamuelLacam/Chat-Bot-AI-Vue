// TODO: refactor or install a lib like openai

export const getAnswer = async (messageId, replyId, onChunk) => {
  console.log(`useAI: ${replyId}`);
  const response = await fetch(`/api/messages/${messageId}/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ replyId }),
  });
  console.log(response);
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Append new chunk to buffer
      buffer += decoder.decode(value, { stream: true });

      // Process complete lines from buffer
      while (true) {
        const lineEnd = buffer.indexOf("\n");
        if (lineEnd === -1) break;

        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);

        // console.log(line);
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed) {
              // console.log(parsed);
              // ref.value.content += parsed;
              onChunk(parsed);
              // await new Promise((resolve) => setTimeout(resolve, 20));
            }
          } catch (e) {
            // Ignore invalid JSON
            // console.log(e.message);
          }
        }
      }
    }
  } finally {
    reader.cancel();
  }
};

export const getConvName = async (convId, messageId, replyId, onChunk) => {
  const response = await fetch(`/api/chats/auto-name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ convId, messageId, replyId }),
  });
  console.log(response);
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Append new chunk to buffer
      buffer += decoder.decode(value, { stream: true });

      // Process complete lines from buffer
      while (true) {
        const lineEnd = buffer.indexOf("\n");
        if (lineEnd === -1) break;

        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);

        // console.log(line);
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed) {
              // console.log(parsed);
              // ref.value.content += parsed;
              onChunk(parsed);
              // await new Promise((resolve) => setTimeout(resolve, 20));
            }
          } catch (e) {
            // Ignore invalid JSON
            // console.log(e.message);
          }
        }
      }
    }
  } finally {
    reader.cancel();
  }
};

// ----- NO STREAM -----//
// export const getAnswer = async (prompt) => {
//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "Bearer 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",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "mistralai/mistral-small-3.2-24b-instruct:free",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     }),
//   });
//   const data = await response.json();
//   return data.choices[0].message.content;
// };
