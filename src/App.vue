<template>
  <v-app>
    <v-app-bar app class="curiosity-blue" dark>
      <v-toolbar-title class="headline text-uppercase mr-5">
        <span>Wi</span>
        <span class="font-weight-light">SECURITY</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text to="/" x-large>
          <v-icon left>mdi-home</v-icon>
          HOME
        </v-btn>
        <v-btn text to="/info" x-large>
          <v-icon left>mdi-laptop</v-icon>
          INFO
        </v-btn>
        <v-btn text to="/aplic" x-large>
          <v-icon left>mdi-fuse</v-icon>
          APLIC
        </v-btn>
        <v-btn text to="/about" x-large>
          <v-icon left>mdi-information</v-icon>
          ABOUT
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
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
import HelloWorld from "./components/HelloWorld";
import ErrorSnackbar from "./components/ErrorSnackbar";

export default {
  name: "App",
  components: {
    ErrorSnackbar,
  },
  data: () => ({
    //
  }),
};
</script>
