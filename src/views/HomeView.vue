<script setup>
import ChatConversation from "@/components/ChatConversation.vue";
import OpenSideBar from "@/components/OpenSideBar.vue";
</script>

<template>
  <div class="layout">
    <OpenSideBar />
    <ChatConversation />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
</style>
