<script setup lang="ts">
import ChatItem from "./ChatsGroup/ChatItem.vue";
</script>

<template>
  <div class="chats-container">
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
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
