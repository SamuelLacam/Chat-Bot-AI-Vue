declare global {
  // store
  type Conversations = Map<number, Conversation>;

  type Conversation = {
    name: string;
    messages: Map<number, Message>;
  };

  type Message = {
    role: string;
    content: string;
  };

  // props
  type chat = {
    id: number;
    name: string;
  };
}

export {};
