type aiMessage = { role: "user" | "assistant" | "system"; content: string };

declare global {
  type aiMessages = [aiMessage, ...aiMessage[]];
}

export {};

// type aiMessages = { role: string; content: string }[];
