<script setup>
import { ref } from "vue";
import PromptInput from "./chat-conversation/PromptInput.vue";

const messageContainer = ref(null);
const showWelcomeMessage = ref(true);
</script>

<template>
  <main>
    <Transition name="fade-out">
      <div v-if="showWelcomeMessage" ref="messageContainer" class="welcome-message-container">
        <h2 class="welcome-message">For a question, there is always an answer.</h2>
      </div>
    </Transition>
    <section>
      <PromptInput
        @sendMessage="showWelcomeMessage = false"
        :class="{ 'welcome-message-layout': showWelcomeMessage }"
        class="prompt-input-layout"
      />
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.5s ease;
}

.welcome-message-container {
  position: relative;
  transition: all 0.5s ease;
}

.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-leave-to {
  opacity: 0;
}

.welcome-message {
  margin-top: 25%;
  right: 0;
  left: 0;
  position: absolute;
  color: #334155;
  text-align: center;
  white-space: nowrap;
}

.prompt-input-layout {
  transition: all 0.5s ease;
  margin-bottom: 0;
}

.welcome-message-layout {
  margin-bottom: 50% !important;
}
</style>
