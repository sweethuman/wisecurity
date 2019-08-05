<template>
  <v-snackbar
    v-model="show"
    :top="true"
    :right="true"
    color="error"
    :multi-line="$vuetify.breakpoint.mdAndDown"
    :timeout="7000"
  >
    {{ content }}
    <v-btn class="red accent-3 px-3" style="border-radius: 6px" depressed @click="show = false">Inchide</v-btn>
  </v-snackbar>
</template>

<script>
import Vue from "vue";
export default {
  name: "ErrorSnackbar",
  data() {
    return {
      show: false,
      content: "ERROR SNACKBAR",
    };
  },
  beforeCreate() {
    let that = this;
    Vue.prototype.$showError = function(errorContent) {
      that.content = errorContent;
      that.show = true;
    };
  },
};
</script>

<style scoped></style>
