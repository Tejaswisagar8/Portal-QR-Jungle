<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<style>
.heading1 {
  font-size: 35px;
  font-weight: 600;
  color: black;
}

.heading2 {
  font-size: 17px;
  font-weight: 600;
  color: black;
}

.heading3 {
  font-size: 22px;
  font-weight: 600;
  color: black;
}

.greenBlueColor{
  color: #006769;
}

.greyColor{
  color: grey;
  line-height: 10px;
}

.currentFont{
  font-family: "Josefin Sans", sans-serif;
}


.flex-class {
  display: flex;
  flex-wrap: wrap;
}

.borderRadius20px {
  border-radius: 20px !important;
}

.transformedImg{
transform: rotate(-35deg);
}
</style>

<!-- <style>
body {
  overflow-x: hidden;
}
#app {
  background-color: black;
  font-family: "Mukta", sans-serif !important;
}

.yellowFontColor {
  color: #fdcb0a;
}

.flex-class {
  display: flex;
}

.font18px {
  font-size: 18px;
  font-weight: 400;
}

.font50px {
  font-size: 50px;
}

.boxShadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.grid-class {
  display: grid;
}

::-webkit-scrollbar {
  width: 5px !important;
}
::-webkit-scrollbar-track {
  background: #dbdfe8 !important;
}
::-webkit-scrollbar-thumb {
  background-color: #006769 !important;
  border-radius: 5px !important;
}

::selection {
  background: #fdcb0a;
  color: black;
}

.cardBorderRadius10px {
  border-radius: 10px !important;
}
</style> -->
