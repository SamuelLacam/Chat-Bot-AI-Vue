<script setup>
import { inject } from "vue";
import AppLogo from "../shared/AppLogo.vue";

const expandedSideBar = inject("expandedSideBar");
</script>

<template>
  <header>
    <!-- expanded -->
    <div v-if="expandedSideBar" class="container expanded">
      <div class="brand-name">
        <AppLogo />
        <h1 class="title">GIZELLE</h1>
      </div>
      <button @click="$emit('reduceSideBar')" class="reduce-btn">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            fill="black"
            fill-rule="evenodd"
            d="M10 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8zM9 7H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3zM4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <!-- collapsed -->
    <div v-else class="container">
      <div class="brand-name">
        <AppLogo />
      </div>
    </div>
  </header>
</template>

<style scoped>
.container {
  /* width: 85%; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: 10px; */
  padding: 43px 0 50px;
}

.expanded {
  width: 85%;
}

.brand-name {
  display: flex;
  align-items: center;
}

.title {
  margin: 0;
  color: #334155;
  font-size: 24px;
  letter-spacing: 6px;
}

.reduce-btn {
  width: 40px;
  height: 40px;
  /* margin-left: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  /* border: 1px solid #eaeaea; */
  border: none;
  border-radius: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.reduce-btn:hover {
  background-color: #f1f5f9;
}

/* .blue-laces {
  position: absolute;
  top: 1px;
  left: 1px;
  height: 75px;
  width: 75px;
  border-right: 25px solid #459aff;
  border-bottom: 25px solid #459aff;
  box-sizing: border-box;
}

.purple-laces {
  position: absolute;
  top: 26px;
  left: 26px;
  height: 75px;
  width: 75px;
  border-top: 25px solid #6054ff;
  border-left: 25px solid #6054ff;
  box-sizing: border-box;
  z-index: 1;
}

.purple-laces::before {
  position: absolute;
  content: '';
  top: 0px;
  left: -26px;
  height: 25px;
  width: 27px;
  background-color: #459aff;
  box-sizing: border-box;
} */
</style>
