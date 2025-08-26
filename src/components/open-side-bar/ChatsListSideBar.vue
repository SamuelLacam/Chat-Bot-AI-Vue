<script setup lang="ts">
import ChatItemSideBar from './ChatItemSideBar.vue'
</script>

<template>
  <div class="chats-container">
    <ChatItemSideBar />
    <ChatItemSideBar />
    <ChatItemSideBar />
    <ChatItemSideBar />
    <ChatItemSideBar />
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
