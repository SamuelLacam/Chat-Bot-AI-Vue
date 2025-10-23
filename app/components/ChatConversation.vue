<script setup lang="ts">
import PromptInput from "./chat-conversation/PromptInput.vue";
import TheConversation from "./chat-conversation/TheConversation.vue";
import WelcomeMessage from "./chat-conversation/WelcomeMessage.vue";

// const showWelcomeMessage = ref(true);
// const showConversation = ref(false);
defineProps<{
  showWelcomeMessage: boolean;
  showConversation: boolean;
}>();

// const prompts = ref<string[]>([]);
// const prompt = "";
</script>

<template>
  <main>
    <WelcomeMessage
      v-if="!showConversation"
      :show-welcome-message="showWelcomeMessage"
      @animation-finished="showConversation = true"
    />
    <TheConversation v-else />

    <section :class="{ grow: showWelcomeMessage }">
      <PromptInput
        @send-message="
          (message: string) => {
            showWelcomeMessage = false;
            prompts.push(message);
          }
        "
      />
    </section>
  </main>
</template>

<style scoped>
main {
  flex-grow: 1;
  height: calc(100vh - 60px);
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  /* gap: 15px; */
}

section {
  /* margin: 0 20px; */
  width: 770px;
  align-self: center;
  transition: all 0.5s ease;
  position: relative;
  left: -9px;
  flex: 0 0 30px;
  /* box-shadow: 0 0 15px 5px #f1f5f9; */
  /* box-shadow: 0 -15px 15px #f1f5f9; */
  /* box-shadow: 0 -15px 15px 5px black; */
  box-shadow: 0 -15px 15px 5px #f1f5f9;
  /* flex-basis: 60px;
  flex-grow: 0; */
}

.grow {
  transition: all 0.5s ease;
  flex-grow: 1;
}
</style>
