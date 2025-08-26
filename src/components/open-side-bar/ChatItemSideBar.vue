<script setup>
import EllipsisBtn from "./EllipsisBtn.vue";
</script>

<template>
  <button class="chat-item-container">
    <div class="icon">
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.66683 13.1666H5.3335C2.66683 13.1666 1.3335 12.4999 1.3335 9.16659V5.83325C1.3335 3.16659 2.66683 1.83325 5.3335 1.83325H10.6668C13.3335 1.83325 14.6668 3.16659 14.6668 5.83325V9.16659C14.6668 11.8333 13.3335 13.1666 10.6668 13.1666H10.3335C10.1268 13.1666 9.92683 13.2666 9.80016 13.4333L8.80016 14.7666C8.36016 15.3533 7.64016 15.3533 7.20016 14.7666L6.20016 13.4333C6.0935 13.2866 5.84683 13.1666 5.66683 13.1666Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.6641 7.83333H10.6701"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.99715 7.83333H8.00314"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.32967 7.83333H5.33566"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span class="chat-name">Nom du chat un peu trop long pour être entièrement affiché</span>
    <EllipsisBtn class="menu-ellipsis" />
  </button>
</template>

<style scoped>
.chat-item-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background-color: transparent;
  height: fit-content;
  padding: 0;
  padding-left: 8px;
  border: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000; /* SVG en noir par défaut */
}

.menu-ellipsis {
  position: relative;
  border-radius: 100%;
  transition: all 0.3s ease;
}

.chat-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #475569; /* Texte en gris par défaut */
  font-size: 16px;
  flex: 1; /* Pour que le texte prenne l'espace disponible */
}

/* Hover sur le conteneur principal */
.chat-item-container:hover {
  background-color: #ebf4ff;
}

.chat-item-container:hover .icon:first-child {
  color: #02489b; /* Premier SVG en bleu au hover du conteneur */
}

.chat-item-container:hover .chat-name {
  color: #02489b; /* Texte en bleu au hover du conteneur */
}

.chat-item-container:hover .menu-ellipsis {
  color: #000000; /* Dernier SVG reste noir au hover du conteneur */
}

/* Hover spécifique sur le dernier SVG */
.menu-ellipsis:hover {
  background-color: #77b5ff; /* Background du dernier SVG au hover */
  color: #475569 !important; /* Couleur du dernier SVG au hover (override le noir) */
}

/* .chat-item-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: fit-content;
  padding-left: 15px;
  border-radius: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-ellipsis {
  height: 100%;
  padding-right: 15px;
  border-radius: 0 25px 25px 0;
  transition: all 0.3s ease;
}

.menu-ellipsis:hover {
  color: #77b5ff;
}

.chat-item-container:hover {
  background-color: #ebf4ff;
  color: #02489b !important;
}

.chat-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #475569;
  font-size: 16px;
}
*/
</style>
