<script setup lang="ts">
const chatsStore = useChatsStore();
provide("promptSubmit", async (content: string): Promise<{ convId: number; messageId: number }> => {
  const convId = Number(useRoute().params.id);
  const { insertId: messageId } = await chatsStore.createMessage(convId, content, "user");
  return { convId, messageId };
});

const expandedSideBar = inject("expandedSideBar");
const showWelcomeMessage = ref(false);
const showConversation = ref(true);
</script>

<template>
  <div class="layout">
    <!-- Idea for transition (from expanded to collapsed):
    - reduce and rotate SideBarAction in same time
    - fade-out all text
    - fade-out UserSettingsBtn except user-image, and scale user-image -->
    <Transition>
      <OpenSideBar v-if="expandedSideBar" @reduce-side-bar="expandedSideBar = false" />
      <CloseSideBar v-else @extend-side-bar="expandedSideBar = true" />
    </Transition>
    <ChatConversation
      :showWelcomeMessage="showWelcomeMessage"
      :showConversation="showConversation"
    />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
</style>
