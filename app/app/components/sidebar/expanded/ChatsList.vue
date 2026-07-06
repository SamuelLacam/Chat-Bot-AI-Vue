<script setup>
import ChatsGroup from "./ChatsList/ChatsGroup.vue";
import SectionDivider from "./ChatsList/SectionDivider.vue";
</script>

<template>
  <ClientOnly>
    <div class="scroll-layout">
      <SectionDivider> Your conversations </SectionDivider>
      <ChatsGroup />
      <SectionDivider> Last 7 days </SectionDivider>
      <!-- <ChatsGroup /> -->
    </div>
  </ClientOnly>
</template>

<style scoped>
.scroll-layout {
  overflow-x: hidden;
}
</style>
