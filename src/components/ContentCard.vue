<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card dark :elevation="hover ? 24 : 2" :style="{ 'border-radius': borderRadius }">
        <v-img :src="content.photo" :lazy-src="content.lazyPhoto" aspect-ratio="1.3">
          <template #placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </template>
          <v-layout
            column
            fill-height
            align-end
            ma-0
            class="default-transition"
            :class="{ 'hovered--opacity': hover }"
            :style="{ background: `linear-gradient(${gradient})` }"
          >
            <v-spacer></v-spacer>
            <v-flex shrink pa-0>
              <v-card-text class="display-2 font-weight-light pb-1 text-end">{{ content.title }}</v-card-text>
            </v-flex>
            <v-flex shrink pa-0>
              <v-card-text class="pt-0 text-end" :class="{ 'hovered--text': hover }">
                {{ content.description }}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-img>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import CardContent from "../constructors/CardContent";
export default {
  name: "ContentCard",
  props: {
    gradient: {
      type: String,
      default: "10deg, rgba(131,58,180,0.9) 10%, rgba(253,29,29,0.5) 76%, rgba(252,176,69,0.4) 100%",
    },
    content: {
      type: CardContent,
      required: true,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    borderRadius() {
      if (this.round === true) return "20px";
      else return "0";
    },
  },
};
</script>

<style scoped>
.hovered--opacity {
  opacity: 0.4;
}
</style>
