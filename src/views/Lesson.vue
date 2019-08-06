<template>
  <v-container>
    <error-component
      v-if="unavailable && !$wait.is('loading lesson')"
      text="Nu am găsit lecția specificată!"
    ></error-component>
    <v-layout v-if="$wait.is('loading lesson')" align-center justify-center fill-height>
      <v-flex shrink><simple-spinner></simple-spinner></v-flex>
    </v-layout>
    <v-layout v-if="!unavailable && !$wait.is('loading lesson')" align-center justify-center column>
      <v-layout align-center justify-center ma-2>
        <v-flex md8 x12>
          <v-card>
            <v-card-title class="display-2">Simplu</v-card-title>
            <v-card-text class="headline">{{ content.simple.source }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-btn v-if="!load2" text block color="#46658b" x-large @click="load2 = true">
        <v-icon left>mdi-plus-box-outline</v-icon>
        Continua Lectia
      </v-btn>
      <v-expand-transition>
        <v-layout v-if="load2" align-center justify-center ma-2>
          <v-flex md8 xs12>
            <v-card>
              <v-card-title class="display-2">Mediu</v-card-title>
              <v-card-text class="headline">{{ content.medium.source }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expand-transition>
      <v-btn v-if="!load3 && load2" text block color="#46658b" x-large @click="load3 = true">
        <v-icon left>mdi-plus-box-outline</v-icon>
        Continua Lectia
      </v-btn>
      <v-expand-transition>
        <v-layout v-if="load3" align-center justify-center ma-2>
          <v-flex md8 xs12>
            <v-card>
              <v-card-title class="display-2">Complex</v-card-title>
              <v-card-text class="headline">{{ content.complex.source }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expand-transition>
    </v-layout>
  </v-container>
</template>

<script>
import ErrorComponent from "../components/ErrorComponent";
import { firestore } from "../firebase";
import SimpleSpinner from "../components/SimpleSpinner";

export default {
  name: "Lesson",
  components: {
    SimpleSpinner,
    ErrorComponent,
  },
  data() {
    return {
      lesson: {},
      content: {
        simple: {},
        medium: {},
        complex: {},
      },
      unavailable: false,
      load2: false,
      load3: false,
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.loadLesson(to);
    next();
  },
  created() {
    this.loadLesson(this.$route);
  },
  methods: {
    async loadLesson(routeObject) {
      this.$wait.start("loading lesson");
      this.unavailable = false;
      await this.$bind(
        "lesson",
        firestore.collection(`/chapters/${routeObject.params.chapter}/lessons`).doc(routeObject.params.lesson)
      );
      if (this.lesson == null) {
        this.unavailable = true;
        this.$wait.end("loading lesson");
        return;
      }
      await this.$bind(
        "content.simple",
        firestore.collection(`/chapters/${routeObject.params.chapter}/lessons/${this.lesson.id}/content`).doc("simple")
      );
      await this.$bind(
        "content.medium",
        firestore.collection(`/chapters/${routeObject.params.chapter}/lessons/${this.lesson.id}/content`).doc("medium")
      );
      await this.$bind(
        "content.complex",
        firestore.collection(`/chapters/${routeObject.params.chapter}/lessons/${this.lesson.id}/content`).doc("complex")
      );
      this.$wait.end("loading lesson");
    },
  },
};
</script>

<style scoped></style>
