<script setup lang="ts">
const chatsStore = useChatsStore();
provide("promptSubmit", async (firstMessage: string, reply: Function) => {
  const { convId, messageId } = await chatsStore.createConversation(firstMessage);
  await navigateTo(`/chat/${convId}`);
  const replyId = await reply(convId, messageId);
  console.log("REPLYID:", replyId);
  chatsStore.streamChatName(convId, messageId, replyId);
  // return { convId, messageId };
});

const expandedSideBar = inject("expandedSideBar");
const showWelcomeMessage = ref(true);
const showConversation = ref(false);

try {
  await useAsyncData("conversations", chatsStore.initializeConversations);
  // await chatsStore.initializeConversations();
} catch (error: any) {
  console.log(error.message);
}
// onMounted(async () => {});
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
