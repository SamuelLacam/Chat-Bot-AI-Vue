<script setup lang="ts">
import Message from "./Message.vue";

const chatsStore = useChatsStore();

// const messages = ref<Conversation["messages"]>(null!);
const convId = Number(useRoute().params.id);
const messages = computed<Conversation["messages"] | undefined>(() => {
  // console.log("messages updated");
  return chatsStore.conversations.get(convId)?.messages;
});

onMounted(async () => {
  try {
    await chatsStore.initializeMessages(convId);
    // messages.value = chatsStore.conversations.get(chatId)!.messages;
  } catch (error: any) {
    console.error(error.message);
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="conversation-container">
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

.conversation-container::after {
  content: "";
  display: block;
  height: 30px;
  width: 100px;
}
</style>
