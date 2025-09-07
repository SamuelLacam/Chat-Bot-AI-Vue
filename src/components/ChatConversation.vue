<script setup>
import { ref } from "vue";
import AIConversation from "./chat-conversation/AIConversation.vue";
import PromptInput from "./chat-conversation/PromptInput.vue";
import WelcomeMessage from "./chat-conversation/WelcomeMessage.vue";

const showWelcomeMessage = ref(true);
const showConversation = ref(false);
</script>

<template>
  <main>
    <WelcomeMessage
      v-if="!showConversation"
      :showWelcomeMessage="showWelcomeMessage"
      @animation-finished="showConversation = true"
    />

    <AIConversation v-else />

    <section :class="{ grow: showWelcomeMessage }">
      <PromptInput @sendMessage="showWelcomeMessage = false" class="prompt-input-layout" />
    </section>
  </main>
</template>

<style scoped>
main {
  width: 770px;
  height: calc(100vh - 60px);
  margin: 30px auto;
  display: flex;
  flex-direction: column;
}

section {
  margin: 0 20px;
  transition: all 0.5s ease;
  position: relative;
  flex-basis: 60px;
  flex-grow: 0;
}

/* quand showWelcomeMessage === true -> section grandit */
.grow {
  transition: all 0.5s ease;
  flex-grow: 1;
}

.prompt-input-layout {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
  height: 60px;
}
</style>
