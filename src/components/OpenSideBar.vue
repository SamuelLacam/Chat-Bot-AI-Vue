<script setup>
import ChatsList from "./open-side-bar/ChatsList.vue";
import SideBarActions from "./open-side-bar/SideBarActions.vue";
import SideBarHeader from "./open-side-bar/SideBarHeader.vue";
import UserSettingsBtn from "./open-side-bar/UserSettingsBtn.vue";
</script>

<template>
  <aside>
    <SideBarHeader />
    <SideBarActions />
    <ChatsList />
    <UserSettingsBtn />
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 300px;
  box-sizing: border-box;
  background-color: white;
  /* background-color: rgb(190, 190, 190); */
  border-bottom-right-radius: 26px;
  border-top-right-radius: 26px;
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
</style>
