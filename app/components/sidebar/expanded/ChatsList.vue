<script setup>
import ChatsGroup from "./ChatsList/ChatsGroup.vue";
import DeleteAllChatsBtn from "./ChatsList/DeleteAllChatsBtn.vue";
import SectionDivider from "./ChatsList/SectionDivider.vue";
</script>

<template>
  <ClientOnly>
    <div class="scroll-layout">
      <SectionDivider>
        <template #label>Your conversations </template>
        <template #other>
          <DeleteAllChatsBtn />
        </template>
      </SectionDivider>
      <ChatsGroup />
      <SectionDivider>
        <template #label>Last 7 days</template>
      </SectionDivider>
      <ChatsGroup />
      <ChatsGroup />
    </div>
  </ClientOnly>
</template>

<style scoped>
.scroll-layout {
  overflow-x: hidden;
}
</style>
