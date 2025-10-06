<script setup>
import { provide, ref } from "vue";

const expandedSideBar = ref(true);
provide("expandedSideBar", expandedSideBar);
</script>

<template>
  <div class="layout">
    <!-- Idea for transition (from expanded to collapsed):
    - reduce and rotate SideBarAction in same time
    - fade-out all text
    - fade-out UserSettingsBtn except user-image, and scale user-image -->
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
