<template>
  <v-btn class="curiosity-blue" text x-large @click="$emit('click', $event)">
    <v-icon left>mdi-login-variant</v-icon>
    Login
  </v-btn>
</template>

<script>
export default {
  name: "LoginButton",
};
</script>

<style scoped></style>
