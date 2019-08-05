<template>
  <v-container>
    <v-layout column class="mb-5">
      <v-flex xs12>
        <v-card dark elevation="24">
          <v-img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=2000&q=80"
            lazy-src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=100&q=80"
            aspect-ratio="4"
          >
            <template #placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </template>
            <v-layout column align-center justify-center fill-height style="background:  rgba(19,39,67, 0.8)">
              <v-flex shrink>
                <v-card-title
                  :class="{
                    'display-4': $vuetify.breakpoint.lgAndUp,
                    'display-3': $vuetify.breakpoint.mdOnly || $vuetify.breakpoint.smOnly,
                    'display-2': $vuetify.breakpoint.xsOnly,
                  }"
                  class="text-uppercase font-weight-medium"
                  style="text-shadow: 15px 5px 15px #000"
                >
                  WI
                  <span class="font-weight-light">SECURITY</span>
                </v-card-title>
              </v-flex>
              <v-flex shrink>
                <v-card-text class="display-1 font-weight-light" style="text-shadow: 15px 5px 15px #000">
                  Scutul tau virtual!
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex lg4 xs12 pa-1>
        <v-card>
          <v-card-title>LOREM IPSUM</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12 pa-1>
        <v-card>
          <v-card-title>LOREM IPSUM</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12 pa-1>
        <v-card>
          <v-card-title>LOREM IPSUM</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 pa-1>
        <v-card>
          <v-card-title>LOREM IPSUM</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 pa-1>
        <v-card>
          <v-card-title>LOREM IPSUM</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
