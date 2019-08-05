<template>
  <v-app>
    <v-app-bar app class="curiosity-blue" dark>
      <v-toolbar-title class="headline text-uppercase mr-5">
        <span>Wi</span>
        <span class="font-weight-light">SECURITY</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text to="/">
          <v-icon left>mdi-home</v-icon>HOME
        </v-btn>
        <v-btn text to="/info">
          <v-icon left>mdi-laptop</v-icon>INFO
        </v-btn>
        <v-btn text to="/aplic">
          <v-icon left>mdi-fuse</v-icon>APLIC
        </v-btn>
        <v-btn text to="/about">
          <v-icon left>mdi-information</v-icon>ABOUT
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>
