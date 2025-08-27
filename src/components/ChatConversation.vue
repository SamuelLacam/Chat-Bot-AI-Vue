<script setup>
import { ref } from "vue";
import PromptInput from "./chat-conversation/PromptInput.vue";

const newChat = ref(true);
</script>

<template>
  <button @click="newChat = !newChat"></button>
  <main>
    <h2 class="new-chat-message">For a question, there is always an answer.</h2>
    <section>
      <PromptInput :class="{ 'new-chat-layout': newChat }" class="chat-layout" />
    </section>
  </main>
</template>

<style scoped>
main {
  width: 770px;
  height: calc(100vh - 60px);
  margin: 30px auto;
}

section {
  margin: 0 20px;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.5s ease;
}

.new-chat-message {
  margin-top: 25%;
  color: #334155;
  text-align: center;
  white-space: nowrap;
}

.chat-layout {
  transition: all 0.5s ease;
  /* margin-top: auto; */
  margin-bottom: 0;
}

.new-chat-layout {
  margin-bottom: 50% !important;
}
</style>
