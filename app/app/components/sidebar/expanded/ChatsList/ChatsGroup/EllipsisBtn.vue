<script setup lang="ts">
import { ref, watch } from "vue";
import ChatSettingsMenu from "./ChatSettingsMenu.vue";

defineProps<{ chat: chat }>();

const showMenu = ref(false);
const ellipsisBtnRef = ref<HTMLButtonElement | null>(null);
const menuRef = ref<{ rootEl: HTMLElement | null } | null>(null);

function closeMenu(event: Event) {
  if (
    !ellipsisBtnRef.value?.contains(event.target as Element) &&
    menuRef.value?.rootEl != event.target
  ) {
    console.log("close the menu");
    showMenu.value = false;
  }
}

watch(showMenu, (newValue) => {
  if (newValue) {
    document.addEventListener("click", closeMenu);
  } else {
    document.removeEventListener("click", closeMenu);
  }
});

onUnmounted(() => document.removeEventListener("click", closeMenu));
</script>

<template>
  <div class="menu-ellipsis-container">
    <button ref="ellipsisBtnRef" :class="{ 'show-menu': showMenu }" @click="showMenu = !showMenu">
      <svg
        :class="{ 'open-menu': showMenu }"
        width="20"
        height="36"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 8.5C5.32843 8.5 6 9.17157 6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5ZM10 8.5C10.8284 8.5 11.5 9.17157 11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5ZM15.5 8.5C16.3284 8.5 17 9.17157 17 10C17 10.8284 16.3284 11.5 15.5 11.5C14.6716 11.5 14 10.8284 14 10C14 9.17157 14.6716 8.5 15.5 8.5Z"
        />
      </svg>
    </button>
    <ChatSettingsMenu
      v-show="showMenu"
      ref="menuRef"
      :chat="chat"
      @rename="$emit('rename')"
      @delete="$emit('delete')"
    />
  </div>
</template>

<style scoped>
.menu-ellipsis-container {
  /* position: relative; */
  border-radius: 100%;
  transition: all 0.3s ease;
}

.menu-ellipsis-container:hover,
.show-menu {
  background-color: #77b5ff;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  color: #000000; /* SVG en noir par défaut */
  background-color: transparent;
  border: none;
  border-radius: 100%;
}

button > svg {
  transition: all 0.3s ease;
}

.open-menu {
  transform: rotate(90deg);
}
</style>
