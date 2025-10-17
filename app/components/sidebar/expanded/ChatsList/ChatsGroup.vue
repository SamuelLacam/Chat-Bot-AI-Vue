<script setup lang="ts">
import ChatItem from "./ChatsGroup/ChatItem.vue";

const chats = ref<Conversations>(null!);
const chatsStore = useChatsStore();

onMounted(async () => {
  try {
    await chatsStore.initializeConversations();
    chats.value = chatsStore.conversations;
  } catch (error: any) {
    console.log(error.message);
  }
});
</script>

<template>
  <div class="chats-container">
    <ChatItem v-for="[id, chat] in chats" :key="id" :chat="{ id, ...chat }" />
  </div>
</template>

<style scoped>
.chats-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
}
</style>
