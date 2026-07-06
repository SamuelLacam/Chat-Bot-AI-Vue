<script setup>
import AIMessage from "./AIMessage.vue";
import UserMessage from "./UserMessage.vue";

// const { prompt } = defineProps({
//   prompt: String,
// });
const { message } = defineProps({
  message: Object,
});

// const aiMessage = ref("");

// getAnswer(prompt, aiMessage);
</script>

<template>
  <!-- <div></div> -->
  <UserMessage :prompt="prompt" />
  <AIMessage :ai-message="aiMessage" />
</template>
