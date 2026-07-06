<script setup lang="ts">
import "@/assets/main.css";
import { provide, ref } from "vue";

const expandedSideBar = ref(true);
provide("expandedSideBar", expandedSideBar);
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
