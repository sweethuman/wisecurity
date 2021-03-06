<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Acasă</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/info">
          <v-list-item-icon>
            <v-icon>mdi-laptop</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>INFO</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="mdi-fuse" :value="false">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>APLIC</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item to="/simple">
            <v-list-item-title>Simplu</v-list-item-title>
          </v-list-item>
          <v-list-item to="/game/0">
            <v-list-item-title>Medium</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="$store.getters['userManagement/loggedIn'] && $store.state.userManagement.currentUser.admin === true"
          to="/editor"
        >
          <v-list-item-icon>
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>EDITOR</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="darkTheme = !darkTheme">
          <v-list-item-icon>
            <v-icon>{{ darkTheme ? "mdi-brightness-3" : "mdi-white-balance-sunny" }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ darkSwitchLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app hide-on-scroll class="curiosity-blue" dark>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon href="/">
        <img src="./assets/logo.png" alt="logo" style="height:44px" />
      </v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase mr-5">
        <span>Wi</span>
        <span class="font-weight-light">SECURITY</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="$vuetify.breakpoint.lgAndUp">
        <v-btn text to="/" x-large>
          <v-icon left>mdi-home</v-icon>
          Acasă
        </v-btn>
        <v-btn text to="/info" x-large>
          <v-icon left>mdi-laptop</v-icon>
          INFO
        </v-btn>
        <v-menu v-model="menuOpen" open-on-hover close-on-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text x-large v-on="on">
              <v-icon left>mdi-fuse</v-icon>
              APLIC
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/simple">
              <v-list-item-title>Simplu</v-list-item-title>
            </v-list-item>
            <v-list-item to="/game/0">
              <v-list-item-title>Mediu</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="$store.getters['userManagement/loggedIn'] && $store.state.userManagement.currentUser.admin === true"
          text
          to="/editor"
          x-large
        >
          <v-icon left>mdi-file-document-edit-outline</v-icon>
          EDITOR
        </v-btn>
        <v-btn text x-large @click="darkTheme = !darkTheme">
          <v-icon left>{{ darkTheme ? "mdi-brightness-3" : "mdi-white-balance-sunny" }}</v-icon>
          {{ darkSwitchLabel }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <account-dialog></account-dialog>
    </v-app-bar>

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>

    <v-footer dark absolute app class="pa-0">
      <v-card class="flex curiosity-blue" flat>
        <v-card-actions class="justify-center">
          <span class="subheading">
            Versiunea
            <strong>Alpha</strong>
          </span>
          <span class="mx-2">—</span>
          <span class="subheading">
            &copy;2019 —
            <strong>EDU+</strong>
            de Gheorghe Avram si Vlad Schiller
          </span>
        </v-card-actions>
      </v-card>
    </v-footer>
    <error-snackbar></error-snackbar>
  </v-app>
</template>

<script>
import ErrorSnackbar from "./components/ErrorSnackbar";
import AccountDialog from "./components/AccountDialog/index";

export default {
  name: "App",
  components: {
    AccountDialog,
    ErrorSnackbar,
  },
  data() {
    return {
      darkTheme: false,
      menuOpen: false,
      drawer: false,
    };
  },
  computed: {
    darkSwitchLabel() {
      return this.$vuetify.theme.dark ? "Switch to Light Theme" : "Switch to Dark Theme";
    },
  },
  watch: {
    "$wait.any": function(newValue) {
      // eslint-disable-next-line no-undef
      if (newValue === true) NProgress.start();
      // eslint-disable-next-line no-undef
      else NProgress.done();
    },
    darkTheme(newValue) {
      localStorage.darkTheme = newValue;
      this.$vuetify.theme.dark = newValue;
    },
  },
  beforeCreate() {
    // eslint-disable-next-line no-undef
    NProgress.configure({ easing: "ease-out", speed: 1000, trickleSpeed: 500 });
  },
  created() {
    if (localStorage.darkTheme === "true") {
      this.darkTheme = true;
    }
  },
};
</script>
