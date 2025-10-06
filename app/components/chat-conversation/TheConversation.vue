<script setup>
import QuestionAnswer from "./TheConversation/QuestionAnswer.vue";

const { prompts } = defineProps({
  prompts: Array,
});
</script>

<template>
  <div class="wrapper">
    <div class="conversation-container">
      <QuestionAnswer v-for="(prompt, index) in prompts" :key="index" :prompt="prompt" />
    </div>
  </div>
</template>

<style scoped>
.space {
  height: 15px;
}

.wrapper {
  flex-grow: 1;
  padding: 0 30px;
  /* margin-bottom: 45px; */
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.conversation-container {
  width: 770px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  gap: 40px;
}

.conversation-container::after {
  content: "";
  display: block;
  height: 30px;
  width: 100px;
}
</style>
