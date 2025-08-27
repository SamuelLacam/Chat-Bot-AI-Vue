<template>
  <div role="button" class="btn-container">
    <button class="user-image">
      <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 640 640">
        <path
          d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
          fill="#F8FAFC"
        />
      </svg>
    </button>
    <span class="user-label">User Name</span>
    <div class="exit-btn-wrapper">
      <button class="exit-btn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.91812 9.9136C9.77968 9.77592 9.71046 9.61188 9.71046 9.42148C9.71046 9.2311 9.77968 9.06915 9.91812 8.93564L11.164 7.69652H5.86276C5.66718 7.69652 5.50238 7.62957 5.36833 7.49568C5.23428 7.36177 5.16726 7.19713 5.16726 7.00176C5.16726 6.80639 5.23428 6.64277 5.36833 6.51091C5.50238 6.37905 5.66718 6.31312 5.86276 6.31312H11.1289L9.85552 5.04667C9.72879 4.92633 9.66708 4.77253 9.67038 4.58528C9.67369 4.39804 9.74582 4.23527 9.88676 4.09697C10.0187 3.95867 10.1837 3.89117 10.3816 3.89447C10.5795 3.89775 10.7477 3.96823 10.8862 4.10591L13.3307 6.5371C13.4019 6.60958 13.4543 6.6873 13.4879 6.77027C13.5215 6.85326 13.5384 6.9384 13.5384 7.02571C13.5384 7.11302 13.5215 7.19714 13.4879 7.27805C13.4543 7.35896 13.4019 7.43543 13.3307 7.50746L10.8938 9.93106C10.7671 10.0571 10.609 10.1201 10.4197 10.1201C10.2304 10.1201 10.0632 10.0513 9.91812 9.9136ZM1.86235 13.5383C1.4791 13.5383 1.1498 13.4024 0.874449 13.1305C0.5991 12.8586 0.461426 12.5334 0.461426 12.1549V1.85469C0.461426 1.47353 0.5991 1.14602 0.874449 0.872178C1.1498 0.598343 1.4791 0.461426 1.86235 0.461426H6.346C6.54157 0.461426 6.70638 0.530306 6.84043 0.668068C6.97447 0.805841 7.04149 0.972126 7.04149 1.16692C7.04149 1.36172 6.97447 1.52505 6.84043 1.6569C6.70638 1.78876 6.54157 1.85469 6.346 1.85469H1.86235V12.1549H6.346C6.54157 12.1549 6.70638 12.2219 6.84043 12.3558C6.97447 12.4897 7.04149 12.6543 7.04149 12.8497C7.04149 13.0451 6.97447 13.2087 6.84043 13.3406C6.70638 13.4724 6.54157 13.5383 6.346 13.5383H1.86235Z"
            fill="#F8FAFC"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-container {
  width: 90%;
  height: 50px;
  margin: auto auto 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  /* border: 1px solid #eaeaea; */
  box-shadow: 0 0 0 1px #eaeaea;
  border-radius: 25px;
  padding-left: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-image {
  width: 34px;
  height: 34px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #459aff;
  transition: all 0.3s ease;
}

.user-label {
  flex-grow: 1;
  color: #475569;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.exit-btn-wrapper {
  padding: 7px 7px 7px 0;
  background-color: transparent;
  border: none;
  border-radius: 100%;
  cursor: auto;
}

.exit-btn {
  margin-left: auto;
  width: 34px;
  height: 34px;
  /* border: 7px solid white; */
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #8b81ff;
  /* transition: all 0.3s ease; */
  transition: all 0.3s ease;
}

.btn-container:hover {
  background-color: #f1f5f9;
}

/* Applique le scale uniquement si btn-container est hover
   ET que exit-btn n'est PAS hover */
.btn-container:hover:not(:has(.exit-btn-wrapper:hover)) .user-image {
  transform: scale(1.1);
}

.exit-btn:hover {
  transform: scale(1.1);
}

.btn-container:has(.exit-btn-wrapper:hover) {
  background-color: transparent !important;
}

/* .exit-btn:hover {
  margin-right: 0;
  height: 50px;
  width: 50px;
}

.exit-btn svg {
  transition: all 0.3s ease;
}

.exit-btn:hover svg {
  transform: scale(1.4);
}

.btn-container:has(.exit-btn:hover) {
  background-color: transparent !important;
  padding-right: 0;
} */

/* .btn-container {
  width: 90%;
  margin: auto auto 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 25px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-container:hover {
  background-color: #f1f5f9;
}

.user-image {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #459aff;
}

.user-label {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.exit-btn {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100%;
  background-color: #8b81ff;
} */
</style>
