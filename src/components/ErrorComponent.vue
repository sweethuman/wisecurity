<template>
  <v-layout fill-height fill-width ma-0 align-center justify-center>
    <v-card dark color="#FF5252">
      <v-layout
        align-center
        justify-space-between
        :column="$vuetify.breakpoint.mdAndDown"
        :ma-3="$vuetify.breakpoint.xs"
        :ma-4="$vuetify.breakpoint.sm"
        :ma-5="$vuetify.breakpoint.mdAndUp"
      >
        <v-flex shrink lg6 xl4>
          <svg :height="svgHeight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-self-center">
            <path
              id="error-icon"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
              stroke="#FFFFFF"
              fill="#FFFFFF"
            ></path>
          </svg>
        </v-flex>
        <v-flex grow lg6 xl8>
          <v-card-text class="text-xs-center px-0" :class="[textSize]">{{ text }}</v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "ErrorComponent",
  props: {
    text: {
      type: String,
      default: "Elemntul care trebuia sa apara a esuat. off :(",
    },
  },
  computed: {
    textSize() {
      if (this.$vuetify.breakpoint.mdAndUp) return "display-4";
      if (this.$vuetify.breakpoint.xs) return "display-2";
      return "display-3";
    },
    svgHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "500px";
      return "250px";
    },
  },
};
</script>

<style scoped></style>
