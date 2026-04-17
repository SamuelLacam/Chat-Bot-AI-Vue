// meta-llama/llama-3.3-8b-instruct:free
// mistralai/mistral-small-3.2-24b-instruct:free
// mistralai/mistral-small-24b-instruct-2501:free
// deepseek/deepseek-chat-v3.1:free
// arcee-ai/trinity-large-preview:free
// nvidia/nemotron-3-nano-30b-a3b:free

import { Ref } from "vue";

// export const getAnswerTest = async (prompt: string) => {
//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "Bearer ",
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
//   return data.choices[0].message.content as string;
// };

const config = useRuntimeConfig();
// TODO: handle ai provider error
export const getAnswer = async (
  messages: aiMessages,
  ref: Ref<string>,
  streamController: AbortController,
) => {
  let reader;
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages,
        stream: true,
      }),
      signal: streamController.signal,
    });

    reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is not readable");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // if (done) {
      //   console.log("done: ", done);
      //   break;
      // }

      // Append new chunk to buffer
      buffer += decoder.decode(value, { stream: true });
      console.log(buffer);

      // Process complete lines from buffer
      while (true) {
        const lineEnd = buffer.indexOf("\n");
        if (lineEnd === -1) break;

        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);

        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0].delta.content;
            if (content) {
              // console.log(content);
              ref.value = content;
              // await new Promise((resolve) => setTimeout(resolve, 20));
            }
          } catch (e) {
            // Ignore invalid JSON
          }
        }
      }
    }
  } catch (error: any) {
    // console.error(error.message);
  } finally {
    reader?.cancel();
  }
};
