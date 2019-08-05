<template>
  <v-app>
    <v-app-bar app class="curiosity-blue" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Wi</span>
        <span class="font-weight-light">SECURITY</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text to="/">HOME</v-btn>
        <v-btn text to="/info">INFO</v-btn>
        <v-btn text to="/aplic">APLIC</v-btn>
        <v-btn text to="/about">ABOUT</v-btn>
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
