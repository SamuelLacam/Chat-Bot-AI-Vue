<script setup>
import QuestionAnswer from "./TheConversation/QuestionAnswer.vue";

const { prompts } = defineProps({
  prompts: Array,
});
</script>

<template>
  <div class="conversation-container">
    <QuestionAnswer v-for="(prompt, index) in prompts" :key="index" :prompt="prompt" />
  </div>
</template>

<style scoped>
.conversation-container {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
