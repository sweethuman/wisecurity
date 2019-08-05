<template>
  <v-dialog
    key="AccountDialog"
    v-model="dialog"
    :max-width="$store.getters['userManagement/loggedIn'] ? '70%' : '500'"
    :fullscreen="!this.$vuetify.breakpoint.mdAndUp"
    :transition="this.$vuetify.breakpoint.mdAndUp ? 'dialog-transition' : 'dialog-bottom-transition'"
  >
    <template #activator="{ on }">
      <v-flex shrink>
        <component :is="activeButton" v-on="on" />
      </v-flex>
    </template>
    <component :is="activeComponent" @close-dialog="dialog = false" />
  </v-dialog>
</template>

<script>
import LoginButton from "./components/buttons/LoginButton";
import MyProfileButton from "./components/buttons/MyProfileButton";
import ErrorComponent from "../ErrorComponent";
import { auth } from "../../firebase";
import SimpleSpinner from "../SimpleSpinner";

export default {
  name: "AccountDialog",
  components: {
    LogIn: () => ({
      component: import(/* webpackChunkName: 'login' */ "./components/LogIn"),
      // A component to use while the async component is loading
      loading: SimpleSpinner,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
    MyProfile: () => ({
      component: import(/* webpackChunkName: 'myProfile' */ "./components/MyProfile"),
      // A component to use while the async component is loading
      loading: SimpleSpinner,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
    LoginButton,
    MyProfileButton,
    ErrorComponent,
    SimpleSpinner,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    activeComponent() {
      return this.$store.getters["userManagement/loggedIn"] ? "MyProfile" : "LogIn";
    },
    activeButton() {
      return this.$store.getters["userManagement/loggedIn"] ? "MyProfileButton" : "LoginButton";
    },
  },
  async created() {
    let that = this;
    let unsubscribe = auth.onAuthStateChanged(async function(user) {
      if (user) {
        that.$log.debug("logging in already logged in user");
        await that.$store.dispatch("userManagement/bindCurrentUser");
      }
      unsubscribe();
      that.$log.debug("unsubscribed from onAuthStateChanged in AccountDialog");
    });
  },
};
</script>
