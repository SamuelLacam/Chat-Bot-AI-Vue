<script setup>
import ChatsGroup from "./ChatsList/ChatsGroup.vue";
import DeleteAllChatsBtn from "./ChatsList/DeleteAllChatsBtn.vue";
import SectionDivider from "./ChatsList/SectionDivider.vue";
</script>

<template>
  <SectionDivider>
    <template #label>Your conversations </template>
    <template #other>
      <DeleteAllChatsBtn />
    </template>
  </SectionDivider>
  <div class="scroll-layout">
    <ChatsGroup />
    <SectionDivider>
      <template #label>Last 7 days</template>
    </SectionDivider>
  </div>
</template>

<style scoped>
.scroll-layout {
  overflow-x: hidden;
}
</style>
