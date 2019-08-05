<template>
  <v-card>
    <v-app-bar dark class="curiosity-blue-waaw" :flat="$vuetify.breakpoint.lgAndUp">
      <v-btn icon @click="$emit('close-dialog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Profilul Meu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="error" @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('close-dialog')"><v-icon>mdi-content-save</v-icon></v-btn>
    </v-app-bar>
    <v-layout fill-height>
      <v-flex xs12>
        <account-details :scroll-parent="$parent"></account-details>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import AccountDetails from "./modules/AccountDetails";

export default {
  name: "MyProfile",
  components: {
    AccountDetails,
  },
  methods: {
    async logout() {
      await this.$store.dispatch("userManagement/logOut");
    },
  },
};
</script>

<style>
.large-child-icon i {
  font-size: 36px !important;
}
</style>
