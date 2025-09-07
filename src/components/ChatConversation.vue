<script setup>
import { ref } from "vue";
import PromptInput from "./chat-conversation/PromptInput.vue";

// const messageContainer = ref(null);
const showWelcomeMessage = ref(true);
</script>

<template>
  <main>
    <div ref="messageContainer" class="welcome-message-container">
      <Transition name="fade-out">
        <h2 v-if="showWelcomeMessage" class="welcome-message">
          For a question, there is always an answer.
        </h2>
      </Transition>
    </div>
    <div :class="{ grow: !showWelcomeMessage }"></div>
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
  /* height: 100%; */
  transition: all 0.5s ease;
  position: relative;
  /* height: 55%; */
  flex-basis: 60px;
  flex-grow: 0;
}

.grow {
  flex-grow: 1 !important;
}

.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-leave-to {
  opacity: 0;
}

.welcome-message-container {
  position: relative;
  flex-grow: 1;
}

.welcome-message {
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: all 0.5s ease;
  margin-top: auto;
  color: #334155;
  text-align: center;
  white-space: nowrap;
}

.grow {
  transition: all 0.5s ease;
  flex-grow: 1;
}

.prompt-input-layout {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
  height: 60px;
  /* bottom: 0; */
  /* top: 0 !important; */
  /* top: calc(100% - 60px); */
}
</style>
