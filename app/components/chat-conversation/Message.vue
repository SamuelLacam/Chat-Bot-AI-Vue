<script setup lang="ts">
defineProps<{ content: string; role: string }>();
</script>

<template>
  <div :class="['message', `message-${role}`]">
    <span v-if="role === 'user'"> {{ content }}</span>
    <span v-else-if="role === 'assistant'" v-html="content"></span>
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
