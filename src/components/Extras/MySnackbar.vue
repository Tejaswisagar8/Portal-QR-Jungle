<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="SnackBarComponent.SnackbarVModel" top timeout="3000">
      <strong>
        <span :class="SnackBarComponent.color">{{
          SnackBarComponent.Message
        }}</span></strong
      >
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbarClose()">
          <v-icon color="white" size="18">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    SnackBarComponent: Object,
  },
  data: () => ({
    SnackbarVModel: true,
    count: 5,
  }),

  methods: {
    snackbarClose() {
      this.SnackBarComponent = {};
    },
  },
};
</script>
