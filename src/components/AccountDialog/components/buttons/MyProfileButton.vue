<template>
  <v-btn class="curiosity-blue" text large @click="$emit('click', $event)">
    <v-icon left>mdi-account</v-icon>
    {{ $store.state.userManagement.currentUser.forename }}
  </v-btn>
</template>

<script>
export default {
  name: "MyProfileButton",
};
</script>

<style scoped></style>
