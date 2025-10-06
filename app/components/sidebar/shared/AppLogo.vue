<template>
  <div class="logo-wrapper">
    <div class="logo">
      <div class="blue-laces"></div>
      <div class="purple-laces"></div>
    </div>
  </div>
</template>

<style scoped>
.logo-wrapper {
  --logo-size: 24px;
  --logo-border-size: calc(var(--logo-size) / 3);
  --position-blue: 1px;
  --position-purple: calc(var(--logo-size) / 3 + var(--position-blue));
  --position-left-square: calc((var(--position-purple) - var(--position-blue)) * -1 - 1px);
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
  transform: rotate(-45deg);
  box-sizing: border-box;
}

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
  content: "";
  left: var(--position-left-square);
  height: var(--logo-border-size);
  width: calc(var(--logo-border-size) + 2px);
  background-color: #459aff;
  box-sizing: border-box;
}
</style>
