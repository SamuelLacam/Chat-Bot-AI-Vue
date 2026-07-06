type Conversations = Map<number, Conversation>;

type Conversation = {
  name: string;
  messages: Map<number, Message>;
  ids: number[];
  done: boolean;
};

type Message = {
  role: string;
  content: string;
};
