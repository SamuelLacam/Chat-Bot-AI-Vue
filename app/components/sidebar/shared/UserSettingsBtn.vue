<script setup lang="ts">
import { inject } from "vue";
import LogoutBtn from "../expanded/LogoutBtn.vue";

const expandedSideBar = inject("expandedSideBar");
</script>

<template>
  <div class="container">
    <!-- Side bar expanded -->
    <div v-if="expandedSideBar" role="button" class="btn-container-expanded">
      <button class="user-image expanded">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 640 640">
          <path
            d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
            fill="#F8FAFC"
          />
        </svg>
      </button>
      <span class="user-label">User Name</span>
      <div class="exit-btn-wrapper">
        <LogoutBtn />
      </div>
    </div>
    <!-- Side bar collapsed -->
    <div v-else class="btn-container-collapsed">
      <button @click.stop class="user-image collapsed">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 640 640">
          <path
            d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
            fill="#F8FAFC"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: auto;
}

.btn-container-expanded {
  width: 90%;
  height: 50px;
  margin: 10px auto 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  /* border: 1px solid #eaeaea; */
  box-shadow: 0 0 0 1px #eaeaea;
  border-radius: 25px;
  padding-left: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-container-collapsed {
  margin: 10px auto 28px;
}

.user-image {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #459aff;
  /* transition: all 0.3s ease; */
  /* will-change: transform; */
}

.expanded {
  width: 34px;
  height: 34px;
}

.collapsed {
  width: 40px;
  height: 40px;
}

.collapsed:hover svg {
  transform: scale(1.4);
}

.user-label {
  flex-grow: 1;
  color: #475569;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.exit-btn-wrapper {
  padding: 7px 7px 7px 0;
  background-color: transparent;
  border: none;
  border-radius: 100%;
  cursor: auto;
}

.btn-container-expanded:hover {
  background-color: #f1f5f9;
}

svg {
  transition: transform 0.3s ease;
}

/* Applique le scale uniquement si btn-container-expanded est hover
   ET que exit-btn n'est PAS hover */
.btn-container-expanded:hover:not(:has(.exit-btn-wrapper:hover)) .user-image svg {
  transform: scale(1.2);
}

.btn-container-expanded:has(.exit-btn-wrapper:hover) {
  background-color: transparent !important;
}
</style>
