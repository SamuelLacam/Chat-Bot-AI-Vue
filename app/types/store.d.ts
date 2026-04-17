type Conversations = Map<number, Conversation>;

type Conversation = {
  name: string;
  messages: Map<number, Message>;
  // abortController: AbortController | undefined;
  // hasUnreadReply: boolean;
};

type Message = {
  role: string;
  content: string;
};
