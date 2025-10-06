<script setup>
import { ref } from "vue";
import AIMessage from "./AIMessage.vue";
import UserMessage from "./UserMessage.vue";
import { getAnswer } from "@/composable/useAI.js";

const { prompt } = defineProps({
  prompt: String,
});

const aiMessage = ref("");
// getAnswer(prompt).then((message) => {
//   console.log(message);
//   aiMessage.value = message;
// });
getAnswer(prompt, aiMessage);
</script>

<template>
  <!-- <div></div> -->
  <UserMessage :prompt="prompt" />
  <AIMessage :ai-message="aiMessage" />
</template>
