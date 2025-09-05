<script setup>
import { inject } from "vue";
import NewChatBtn from "../shared/NewChatBtn.vue";
import SearchOnChatsBtn from "../shared/SearchOnChatsBtn.vue";

const expandedSideBar = inject("expandedSideBar");
</script>

<template>
  <div :class="{ extanted: expandedSideBar, collapsed: !expandedSideBar }" class="container">
    <NewChatBtn />
    <SearchOnChatsBtn />
  </div>
</template>

<style scoped>
.side-bar-container {
  display: flex;
  flex-direction: column;
}

.container {
  margin: 0 auto;
  display: flex;
  /* gap: 10px; */
  justify-content: space-between;
  margin-bottom: 10px;
  /* max-width: fit-content; */
  /* justify-content: center; */
  /* margin: 0 auto 10px; */
  /* margin-bottom: 10px; */
}

.extanted {
  width: 85%;
}

.collapsed {
  flex-direction: column;
  gap: 10px;
}
</style>
