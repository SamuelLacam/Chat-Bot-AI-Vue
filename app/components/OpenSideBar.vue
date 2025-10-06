<script setup>
import ChatsList from "./sidebar/expanded/ChatsList.vue";
import SideBarActions from "./sidebar/shared/SideBarActions.vue";
import SideBarHeader from "./sidebar/shared/SideBarHeader.vue";
import UserSettingsBtn from "./sidebar/shared/UserSettingsBtn.vue";
</script>

<template>
  <aside>
    <SideBarHeader @reduce-side-bar="$emit('reduceSideBar')" />
    <SideBarActions />
    <ChatsList />
    <UserSettingsBtn />
  </aside>
</template>

<style scoped>
aside {
  flex-shrink: 0;
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
