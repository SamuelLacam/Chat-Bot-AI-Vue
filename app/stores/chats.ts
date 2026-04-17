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
  messages.set(messageId, reactive<Message>({ role: "user", content }));
  conversations.value.set(convId, {
    name: "",
    messages,
  });
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
  const activeStreams = reactive<Map<number, AbortController>>(new Map());
  const unreadChats = reactive<Set<number>>(new Set());

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
        conversations.value.set(id, {
          name,
          messages: new Map<number, Message>(),
        });
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

  const deleteConversation = async (convId: number) => {
    try {
      const conv = conversations.value.get(convId);
      activeStreams.get(convId)?.abort();
      await $fetch(`/api/chats/${convId}`, {
        method: "DELETE",
      });
      conversations.value.delete(convId);
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
    const conv = conversations.value.get(convId);
    const msg = conv?.messages.get(replyId);
    if (!conv || !msg) return;
    const abortController = new AbortController();
    activeStreams.set(convId, abortController);

    await getAnswer(messageId, replyId, abortController, (chunk: string) => {
      msg.content += chunk;
    });
    console.log(conversations.value.get(convId)?.messages.get(replyId)?.content);
    activeStreams.delete(convId);
    const currentConvId = Number(useRoute().params.id);
    if (currentConvId !== convId) {
      unreadChats.add(convId);
    }
    // const reply = await getAnswer(messageId, replyId);
    // addMessage(conversations, convId, replyId + 1, { role: "assistant", content: reply });
    // console.log(conversations.value.get(convId)?.messages.get(replyId + 1)?.content);
  };

  const streamChatName = async (convId: number, messageId: number, replyId: number) => {
    const conv = conversations.value.get(convId);
    console.log("stream chat name", conv);
    if (!conv) return;
    await getConvName(convId, messageId, replyId, (chunk: string) => {
      // const conv = conversations.value.get(convId);
      // if (conv)
      conv.name += chunk;
    });
  };

  const abortReply = (convId: number) => {
    const conv = conversations.value.get(convId);
    if (!conv) return;
    activeStreams.get(convId)?.abort();
    activeStreams.delete(convId);
  };

  return {
    conversations,
    activeStreams,
    unreadChats,
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
    abortReply,
  };
});
