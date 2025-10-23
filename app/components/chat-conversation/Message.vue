<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "marked";

const props = defineProps<{ content: string; role: string }>();
const aiMessage = ref("");
if (props.role === "assistant") {
  const markedMessage = await marked.parse(props.content);
  aiMessage.value = DOMPurify.sanitize(markedMessage);
}
</script>

<template>
  <div :class="['message', `message-${role}`]">
    <span v-if="role === 'user'"> {{ content }}</span>
    <span v-else-if="role === 'assistant'" v-html="aiMessage"></span>
  </div>
</template>

<style scoped>
.message-assistant {
  align-self: flex-start;
  /* width: 90%; */
  overflow-wrap: break-word;
  line-height: 1.75em;
}

.message-user {
  align-self: flex-end;
  max-width: 70%;
  background-color: white;
  padding: 12px 16px;
  border-radius: 20px;
  box-sizing: border-box;
  /* overflow: hidden; */
  overflow-wrap: break-word;
}
</style>
