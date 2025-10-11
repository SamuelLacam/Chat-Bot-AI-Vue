<script setup lang="ts">
import ChatItem from "./ChatsGroup/ChatItem.vue";

type Chat = {
  id: number;
  name: string;
};

const chats = ref<Chat[]>([]);
try {
  const data = await $fetch<Chat[]>("/api/chats", {
    method: "GET",
    query: {
      offset: 0,
      limit: 10,
    },
  });
  chats.value.push(...data);
  // const { data, error } = await useFetch("/api/chats", {
  //   method: "GET",
  //   query: {
  //     offset: 0,
  //     limit: 10,
  //   },
  // });
  // chats.value.push(...data);
} catch (error) {}

const removeFromList = (idToDelete: number) => {
  chats.value = chats.value.filter(({ id }) => id !== idToDelete);
};
</script>

<template>
  <div class="chats-container">
    <ChatItem
      v-for="(chat, index) in chats"
      :key="index"
      :chat="chat"
      @delete="(idToDelete: number) => removeFromList(idToDelete)"
    />
  </div>
</template>

<style scoped>
.chats-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
}
</style>
