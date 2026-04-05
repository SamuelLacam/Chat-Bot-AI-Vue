import { ref } from "vue";
import { getAnswer, getConvName } from "~/composable/useAI";
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
  messages.set(messageId, reactive({ role: "user", content }));
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
    conversation.messages.set(messageId, reactive({ ...message }));
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
      return { convId: data.convId, messageId: data.messageId };
    } catch (error: any) {
      console.log(error.statusMessage || error.message);
      throw new Error("Fetch error");
    }
  };

  const fetchConversations = async () => {
    // try {
    //   const { data } = await useFetch("/api/chats", {
    //     method: "GET",
    //     query: {
    //       offset: 0,
    //       limit: 10,
    //     },
    //   });
    //   return data.value;
    // } catch (error: any) {
    //   console.log(error.statusMessage || error.message);
    //   throw new Error("Fetch error");
    // }
    const headers = useRequestHeaders(["cookie"]);
    try {
      const data = await $fetch("/api/chats", {
        headers,
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
    // console.log("[API] /api/chats call", {
    //   time: new Date().toISOString(),
    //   from: process.server ? "server" : "client",
    // });
    if (!conversations.value.size) {
      const convs = await fetchConversations();
      convs.forEach(({ id, name }) => {
        conversations.value.set(id, { name, messages: new Map() });
      });
      return convs;
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

  const createMessage = async (convId: number, content: string, role: string) => {
    try {
      const { insertId } = await $fetch("/api/messages", {
        method: "POST",
        body: {
          convId,
          content,
          role,
        },
      });
      addMessage(conversations, convId, insertId, { content, role });
      return { insertId };
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

  const initializeMessages = async (convId: number) => {
    const conversation = conversations.value.get(convId);
    if (!conversation) throw new Error("This conversation is unavailable");
    if (!conversation.messages.size) {
      const messages = await fetchMessages(convId);
      messages.forEach(({ id, role, content }) => {
        addMessage(conversations, convId, id, { role, content });
        // conversation.messages.set(id, { role, content });
      });
    }
  };

  const streamAssistantReply = async (convId: number, messageId: number, replyId: number) => {
    // const storedReply = ref(conversations.value.get(convId)?.messages.get(replyId));
    // console.log(`storedReply: ${storedReply.value}`);

    await getAnswer(messageId, replyId, (chunk: string) => {
      const msg = conversations.value.get(convId)?.messages.get(replyId);
      if (msg) msg.content += chunk;
    });
    console.log(conversations.value.get(convId)?.messages.get(replyId)?.content);

    // const reply = await getAnswer(messageId, replyId);
    // addMessage(conversations, convId, replyId + 1, { role: "assistant", content: reply });
    // console.log(conversations.value.get(convId)?.messages.get(replyId + 1)?.content);
  };

  const streamChatName = async (convId: number, messageId: number, replyId: number) => {
    await getConvName(convId, messageId, replyId, (chunk: string) => {
      const conv = conversations.value.get(convId);
      if (conv) conv.name += chunk;
    });
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
    streamAssistantReply,
    streamChatName,
  };
});
