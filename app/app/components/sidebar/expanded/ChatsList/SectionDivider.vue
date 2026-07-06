<template>
  <hr />
  <div class="container">
    <div class="label">
      <slot></slot>
    </div>
    <slot name="other"></slot>
  </div>
  <hr />
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0px 30px;
}

.label {
  font-size: 14px;
  color: #6a6969;
}
</style>
