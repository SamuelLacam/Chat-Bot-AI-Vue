<script setup lang="ts">
import Message from "./Message.vue";

const root = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);
const chatsStore = useChatsStore();

// const messages = ref<Conversation["messages"]>(null!);
const convId = Number(useRoute().params.id);
const conv = chatsStore.conversations.get(convId);
const messages = computed(() => {
  console.log("messages updated");
  // return chatsStore.conversations.get(convId)?.messages;
  return conv!.ids.map((id) => [id, conv!.messages.get(id)!] as const);
});

// const pageIsScrollable = () => {
//   return root.value!.scrollHeight > root.value!.clientHeight;
// };

onMounted(async () => {
  try {
    await chatsStore.initializeMessages(convId, target, root);
    // messages.value = chatsStore.conversations.get(chatId)!.messages;
  } catch (error: any) {
    await navigateTo("/");
    console.error(error.message);
  }
});
</script>

<template>
  <div ref="root" class="wrapper">
    <div class="conversation-container">
      <div ref="target"></div>
      <Message v-for="[id, msg] in messages" :key="id" :message="msg" />
      <br />
    </div>
  </div>
</template>

<style scoped>
.space {
  height: 15px;
}

.wrapper {
  flex-grow: 1;
  padding: 0 30px;
  /* margin-bottom: 45px; */
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.conversation-container {
  width: 770px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  gap: 40px;
}

/* .conversation-container::after {
  content: "";
  display: block;
  height: 30px;
  width: 100px;
} */
</style>
