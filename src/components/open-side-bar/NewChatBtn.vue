<template>
  <button>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.25 9H15.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 15.75V2.25"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span>New chat</span>
  </button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: white;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 69px;
  background: linear-gradient(to right, #459aff, #6054ff);
  transition: all 0.3s ease;
}

button:hover {
  color: white;
}

button span {
  --translate-x: 0px;
  --translate-y: 1px;
  transform: translateX(var(--translate-x)) translateY(var(--translate-y));
  transition: transform 0.3s ease;
}

button:hover span {
  --translate-x: 10px;
}

button svg {
  transition: all 0.3s ease;
}

button:hover svg {
  transform: rotate(90deg);
}
</style>
