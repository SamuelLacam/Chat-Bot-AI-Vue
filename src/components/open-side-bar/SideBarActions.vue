<script setup>
import NewChatBtn from "./NewChatBtn.vue";
import SearchOnChatsBtn from "./SearchOnChatsBtn.vue";
</script>

<template>
  <div class="container">
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
  width: 85%;
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
</style>
