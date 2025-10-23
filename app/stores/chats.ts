// type Conversations = Map<number, Conversation>;

// type Conversation = {
//   name: string;
//   messages: Map<number, Message>;
// };

// type Message = {
//   role: string;
//   content: string;
// };

// import "~~/types/global";

const addConversation = (
  conversations: Ref<Conversations>,
  convId: number,
  messageId: number,
  content: string,
) => {
  const messages = new Map<number, Message>();
  messages.set(messageId, { role: "user", content });
  conversations.value.set(convId, { name: "", messages });
};

const addMessage = (
  conversations: Ref<Conversations>,
  convId: number,
  messageId: number,
  message: Message,
) => {
  const conversation = conversations.value.get(convId);
  if (conversation) {
    conversation.messages.set(messageId, { role: message.role, content: message.content });
  }
};

export const useChatsStore = defineStore("chats", () => {
  const conversations = ref<Conversations>(new Map());

  const createConversation = async (firstMessage: string) => {
    try {
      const data = await $fetch("/api/chats", {
        method: "POST",
        body: {
          firstMessage,
        },
      });
      addConversation(conversations, data.convId, data.messageId, firstMessage);
      return data.convId;
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const fetchConversations = async () => {
    try {
      const data = await $fetch("/api/chats", {
        method: "GET",
        query: {
          offset: 0,
          limit: 10,
        },
      });
      return data;
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const initializeConversations = async () => {
    if (!conversations.value.size) {
      const convs = await fetchConversations();
      convs.forEach(({ id, name }) => {
        conversations.value.set(id, { name, messages: new Map() });
      });
    }
  };

  const renameConversation = async (newName: string, id: number) => {
    try {
      await $fetch(`/api/chats/${id}`, {
        method: "PATCH",
        body: {
          name: newName,
        },
      });
      const conv = conversations.value.get(id);
      if (conv) conv.name = newName;
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const deleteConversation = async (id: number) => {
    try {
      await $fetch(`/api/chats/${id}`, {
        method: "DELETE",
      });
      conversations.value.delete(id);
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const createMessage = async (convId: number, content: string) => {
    try {
      const data = await $fetch("/api/messages", {
        method: "POST",
        body: {
          convId,
          content,
        },
      });
      addMessage(conversations, convId, data.userMessageInsertId, { content, role: "user" });
      addMessage(conversations, convId, data.aiMessageInsertId, {
        content: data.reply,
        role: "assistant",
      });
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const fetchMessages = async (id: number) => {
    try {
      const data = await $fetch("/api/messages", {
        method: "GET",
        query: {
          chatId: id,
          offset: 0,
          limit: 10,
        },
      });
      return data;
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const initializeMessages = async (id: number) => {
    const conversation = conversations.value.get(id);
    // TODO: on reload page, script should wait the conversation initialization, otherwise the condition throw an Error
    if (!conversation) throw new Error("This conversation is unavailable");
    if (!conversation.messages.size) {
      const messages = await fetchMessages(id);
      messages.forEach(({ id, role, content }) => {
        conversation.messages.set(id, { role, content });
      });
    }
  };

  return {
    conversations,
    createConversation,
    fetchConversations,
    initializeConversations,
    renameConversation,
    deleteConversation,
    createMessage,
    fetchMessages,
    initializeMessages,
  };
});
