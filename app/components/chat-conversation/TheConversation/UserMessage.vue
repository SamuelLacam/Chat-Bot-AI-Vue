<script setup>
// import { watch } from "vue";
const props = defineProps({
  prompt: String,
});

// watch(
//   () => props.prompt,
//   () => {
//     console.log(props.prompt);
//   },
// );
</script>

<template>
  <div class="user-message">
    {{ props.prompt }}
  </div>
</template>

<style scoped>
.user-message {
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
