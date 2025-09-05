<script setup>
import ChatConversation from "@/components/ChatConversation.vue";
import CloseSideBar from "@/components/CloseSideBar.vue";
import OpenSideBar from "@/components/OpenSideBar.vue";
import { provide, ref } from "vue";

const expandedSideBar = ref(true);
provide("expandedSideBar", expandedSideBar);
</script>

<template>
  <div class="layout">
    <Transition>
      <OpenSideBar v-if="expandedSideBar" @reduce-side-bar="expandedSideBar = false" />
      <CloseSideBar v-else @extend-side-bar="expandedSideBar = true" />
    </Transition>
    <ChatConversation />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
</style>
