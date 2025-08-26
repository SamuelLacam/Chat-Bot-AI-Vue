<template>
  <header>
    <div class="brand-name">
      <div class="logo-wrapper">
        <div class="logo">
          <div class="blue-laces"></div>
          <div class="purple-laces"></div>
        </div>
      </div>
      <h1 class="title">GIZELLE</h1>
      <button class="reduce-btn">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            fill="black"
            fill-rule="evenodd"
            d="M10 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8zM9 7H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3zM4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  --logo-size: 24px;
  --logo-border-size: calc(var(--logo-size) / 3);
  --position-blue: 1px;
  --position-purple: calc(var(--logo-size) / 3 + var(--position-blue));
  --position-left-square: calc((var(--position-purple) - var(--position-blue)) * -1 - 1px);
}

.brand-name {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 43px 0 50px 25px;
}

.title {
  margin: 0;
  color: #334155;
  font-size: 24px;
  letter-spacing: 6px;
}

.reduce-btn {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #eaeaea;
  border-radius: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.reduce-btn:hover {
  background-color: #f1f5f9;
}

.logo-wrapper {
  height: calc(var(--logo-size) * 2);
}

.logo {
  position: relative;
  top: 5px;
  width: calc(var(--logo-size) + calc(var(--logo-size) / 3 + 2px));
  height: calc(var(--logo-size) + calc(var(--logo-size) / 3 + 2px));
  transform-origin: center center;
  /* animation: spin 2s linear infinite; */
  transform: rotate(-45deg);
  box-sizing: border-box;
}

/* @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
} */

.blue-laces {
  position: absolute;
  top: var(--position-blue);
  left: var(--position-blue);
  height: var(--logo-size);
  width: var(--logo-size);
  border-right: var(--logo-border-size) solid #459aff;
  border-bottom: var(--logo-border-size) solid #459aff;
  box-sizing: border-box;
}

.purple-laces {
  position: absolute;
  top: var(--position-purple);
  left: var(--position-purple);
  height: var(--logo-size);
  width: var(--logo-size);
  border-top: var(--logo-border-size) solid #6054ff;
  border-left: var(--logo-border-size) solid #6054ff;
  box-sizing: border-box;
  z-index: 1;
}

.purple-laces::before {
  position: absolute;
  content: '';
  left: var(--position-left-square);
  height: var(--logo-border-size);
  width: calc(var(--logo-border-size) + 2px);
  background-color: #459aff;
  box-sizing: border-box;
}

/* .blue-laces {
  position: absolute;
  top: 1px;
  left: 1px;
  height: 75px;
  width: 75px;
  border-right: 25px solid #459aff;
  border-bottom: 25px solid #459aff;
  box-sizing: border-box;
}

.purple-laces {
  position: absolute;
  top: 26px;
  left: 26px;
  height: 75px;
  width: 75px;
  border-top: 25px solid #6054ff;
  border-left: 25px solid #6054ff;
  box-sizing: border-box;
  z-index: 1;
}

.purple-laces::before {
  position: absolute;
  content: '';
  top: 0px;
  left: -26px;
  height: 25px;
  width: 27px;
  background-color: #459aff;
  box-sizing: border-box;
} */
</style>
