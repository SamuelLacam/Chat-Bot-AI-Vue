<script setup>
import ChatsHandleSideBar from './open-side-bar/ChatsHandleSideBar.vue'
import HeaderSideBar from './open-side-bar/HeaderSideBar.vue'
</script>

<template>
  <aside>
    <HeaderSideBar />
    <ChatsHandleSideBar />
  </aside>
  <main></main>
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
</style>
