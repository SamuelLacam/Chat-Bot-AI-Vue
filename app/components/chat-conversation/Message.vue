<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "marked";

const props = defineProps<{ message: Message }>();
// watch(props.message, (value) => console.log("reply content ", value.content));

const aiMessage = ref("");
watch(
  () => props.message.content,
  async (newVal) => {
    if (props.message.role === "assistant") {
      const markedMessage = await marked.parse(newVal);
      aiMessage.value = DOMPurify.sanitize(markedMessage);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div :class="['message', `message-${message.role}`]">
    <span v-if="message.role === 'user'"> {{ message.content }}</span>
    <span v-else-if="message.role === 'assistant'" v-html="aiMessage"></span>
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
