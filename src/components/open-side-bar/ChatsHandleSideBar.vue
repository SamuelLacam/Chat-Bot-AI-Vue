<script setup>
import ChatsListSideBar from './ChatsListSideBar.vue'
import LastChatsDateSideBar from './LastChatsDateSideBar.vue'
import NewChatBtn from './NewChatBtn.vue'
import SearchOnChatBtn from './SearchOnChatBtn.vue'
import UserSettingsBtn from './UserSettingsBtn.vue'
</script>

<template>
  <!-- <div class="side-bar-container"> -->
  <div class="top-btn-container">
    <NewChatBtn />
    <SearchOnChatBtn />
  </div>
  <hr />
  <div class="clear-all-container">
    <span class="label">Your conversations</span>
    <button class="clear-all">Clear All</button>
  </div>
  <hr />
  <ChatsListSideBar />
  <LastChatsDateSideBar />
  <UserSettingsBtn />
  <!-- </div> -->
</template>

<style scoped>
.side-bar-container {
  display: flex;
  flex-direction: column;
}

.top-btn-container {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  margin-bottom: 10px;
  /* max-width: fit-content; */
  /* justify-content: center; */
  /* margin: 0 auto 10px; */
  /* margin-bottom: 10px; */
}

.clear-all-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* line-height: 2rem; */
  padding: 2px 30px;
}

.label {
  font-size: 14px;
  color: #6a6969;
}

.clear-all {
  background: none;
  /* background: rgb(255, 108, 108); */
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #5661f6;
  transition: all 0.3s ease;
}

.clear-all:hover {
  /* background-color: #ff000038; */
  color: #fb5d5d;
}
</style>
