// meta-llama/llama-3.3-8b-instruct:free

import { Ref } from "vue";

export const getAnswerTest = async (prompt: string) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content as string;
};

export const getAnswer = async (prompt: string, ref: Ref<string>) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    }),
  });

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
      // if (done) {
      //   console.log("done: ", done);
      //   break;
      // }

      // Append new chunk to buffer
      buffer += decoder.decode(value, { stream: true });

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
              ref.value += content;
              await new Promise((resolve) => setTimeout(resolve, 20));
            }
          } catch (e) {
            // Ignore invalid JSON
          }
        }
      }
    }
  } finally {
    reader.cancel();
  }
};
