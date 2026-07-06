<script setup>
const loginInput = ref(null);
onMounted(() => loginInput.value.focus());

const formData = ref({
  login: "",
  pwd: "",
  confirmPwd: "",
});
const register = async () => {
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        login: formData.value.login,
        pwd: formData.value.pwd,
        confirmPwd: formData.value.pwd,
      },
    });
    navigateTo("/");
  } catch (error) {
    console.log(error.statusMessage);
    console.log(error.data.message);
  }
};
</script>

<template>
  <main>
    <h3>Create my account</h3>
    <form class="form" @submit.prevent="register">
      <div>
        <div>Email:</div>
        <input ref="loginInput" v-model="formData.login" type="email" name="login" required />
      </div>
      <div>
        <div>Password:</div>
        <input v-model="formData.pwd" type="password" name="password" required />
      </div>
      <div>
        <div>Confirm Password:</div>
        <input v-model="formData.confirmPwd" type="password" name="confirmPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <hr />
    <button @click="navigateTo('/login')">I have already an account</button>
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

input {
  width: 220px;
}

button {
  align-self: stretch;
}
</style>
