export default {
  mounted(el, binding) {
    if (binding.value) {
      document.addEventListener("click");
    }
  },
};
