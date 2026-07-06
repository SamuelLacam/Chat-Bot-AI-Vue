<script setup lang="ts">
import ChatItem from "./ChatsGroup/ChatItem.vue";

const chatsStore = useChatsStore();
const chats = computed<Conversations>(() => chatsStore.conversations);
watch(chats, (value) => console.log("chats", value), { immediate: true });
watch(
  () => chatsStore.conversations,
  (v) => console.log("aaaaaaa"),
  { immediate: true },
);
</script>

<template>
  <div class="chats-container">
    <ChatItem
      @click="chatsStore.unreadChats.delete(id)"
      v-for="[id, chat] in chats"
      :key="id"
      :chat="{ id, ...chat }"
    />
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
