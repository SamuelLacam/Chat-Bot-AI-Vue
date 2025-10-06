<script setup>
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";

const props = defineProps({
  aiMessage: String,
});

// computed = recalcul automatique quand la prop change
const markedMessage = computed(() => {
  return props.aiMessage ? DOMPurify.sanitize(marked.parse(props.aiMessage)) : "";
});
</script>

<template>
  <div class="ai-message">
    <span v-html="markedMessage"></span>
  </div>
</template>

<style scoped>
.ai-message {
  align-self: flex-start;
  /* width: 90%; */
  overflow-wrap: break-word;
  line-height: 1.75em;
}
</style>
