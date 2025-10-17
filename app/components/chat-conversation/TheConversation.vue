<script setup lang="ts">
import Message from "./Message.vue";

// const { prompts } = defineProps({
//   prompts: Array,
// });

const chatsStore = useChatsStore();

const messages = ref<MapIterator<[number, { role: string; content: string }]>>(null!);
const chatId = Number(useRoute().params.id);

onMounted(async () => {
  try {
    await chatsStore.initializeMessages(chatId);
    messages.value = chatsStore.conversations.get(chatId)!.messages.entries();
  } catch (error: any) {
    console.log(error.message);
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="conversation-container">
      <Message
        v-for="[id, { role, content }] in messages"
        :key="id"
        :content="content"
        :role="role"
      />
    </div>
  </div>
</template>

<style scoped>
.space {
  height: 15px;
}

.wrapper {
  flex-grow: 1;
  padding: 0 30px;
  /* margin-bottom: 45px; */
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.conversation-container {
  width: 770px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  gap: 40px;
}

.conversation-container::after {
  content: "";
  display: block;
  height: 30px;
  width: 100px;
}
</style>
