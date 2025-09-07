<script setup>
defineProps({
  showWelcomeMessage: Boolean,
});
</script>

<template>
  <div class="welcome-message-container">
    <Transition name="fade-out" @after-leave="$emit('animation-finished')">
      <h2 v-if="showWelcomeMessage" class="welcome-message">
        For a question, there is always an answer.
      </h2>
    </Transition>
  </div>
  <!-- counterbalance grow to keep the welcome-message in same place -->
  <div :class="{ grow: !showWelcomeMessage }"></div>
</template>

<style scoped>
.welcome-message-container {
  position: relative;
  flex-grow: 1;
}

.welcome-message {
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: all 0.5s ease;
  margin-top: auto;
  color: #334155;
  text-align: center;
  white-space: nowrap;
}

/* même utilitaire que dans App.vue */
.grow {
  transition: all 0.5s ease;
  flex-grow: 1;
}

/* animation identique */
.fade-out-leave-active {
  transition: opacity 0.5s ease;
}
.fade-out-leave-to {
  opacity: 0;
}
</style>
