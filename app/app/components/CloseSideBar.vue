<script setup lang="ts">
import SideBarActions from "./sidebar/shared/SideBarActions.vue";
import SideBarHeader from "./sidebar/shared/SideBarHeader.vue";
import UserSettingsBtn from "./sidebar/shared/UserSettingsBtn.vue";
</script>

<template>
  <aside @click="$emit('extendSideBar')">
    <SideBarHeader />
    <SideBarActions />
    <UserSettingsBtn />
  </aside>
</template>

<style scoped>
aside {
  background-color: white;
  height: 100vh;
  width: 60px;
  border-bottom-right-radius: 26px;
  border-top-right-radius: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: e-resize;
}
</style>
