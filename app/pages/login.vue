<script setup lang="ts">
import { FetchError } from "ofetch";
const loginInput = ref<HTMLInputElement | null>(null);
onMounted(() => loginInput.value?.focus());

const errorMessage = ref("");
const formData = ref({
  login: "",
  pwd: "",
});

const login = async () => {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        login: formData.value.login,
        pwd: formData.value.pwd,
      },
    });
    navigateTo("/");
  } catch (error) {
    const fetchError = error as FetchError;
    errorMessage.value = fetchError.data.message;
    // console.log(fetchError.statusMessage);
    // console.log(fetchError.data.message);
  }
};
</script>

<template>
  <main>
    <h3>Access to my space</h3>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <form class="form" @submit.prevent="login">
      <div>
        <div>Email:</div>
        <input ref="loginInput" v-model="formData.login" type="email" name="login" required />
      </div>
      <div>
        <div>Password:</div>
        <input v-model="formData.pwd" type="password" name="password" required />
      </div>
      <button>Connection</button>
      <hr />
    </form>
    <button @click="navigateTo('/register')">Create my account</button>
  </main>
</template>

<style scoped>
main {
  margin: 30px auto;
  width: fit-content;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* gap: 20px; */
}

.form {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

main > * {
  flex-grow: 0;
}

input {
  width: 220px;
}

button {
  align-self: stretch;
}

.error {
  color: red;
}
</style>
