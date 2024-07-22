<template>
  <div class="loader-container">
    <div>
      <div class="grid-class">
        <v-img class="qrImg" src="@/assets/qrCodeAnimated.gif" :width="100" />
      </div>
      <div>
        <span class="pl-3">Redirecting</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  height: 10000px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
}

.qrImg {
  max-width: 100px;
  max-height: 100px;
}

.grid-class {
  display: grid;
}
</style>
