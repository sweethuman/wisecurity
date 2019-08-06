<template>
  <v-container>
    <error-component
      v-if="unavailable && !$wait.is('loading exam')"
      text="Nu am găsit examenul specificată!"
    ></error-component>
    <v-layout v-if="$wait.is('loading exam')" align-center justify-center fill-height>
      <v-flex shrink><simple-spinner></simple-spinner></v-flex>
    </v-layout>
    <v-layout v-if="!unavailable && !$wait.is('loading exam')" column>
      <span class="display-3 ma-12 text-center">{{ examData.title }}</span>
      <exam-viewer :key="examViewerKey" :exam-data="examData.content"></exam-viewer>
    </v-layout>
  </v-container>
</template>

<script>
import ExamViewer from "../components/Exam/ExamViewer";
import ErrorComponent from "../components/ErrorComponent";
import SimpleSpinner from "../components/SimpleSpinner";
import { firestore } from "../firebase";

export default {
  name: "Exam",
  components: { ExamViewer, ErrorComponent, SimpleSpinner },
  data() {
    return {
      examData: {},
      unavailable: false,
      examViewerKey: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.loadExam(to);
    next();
  },
  created() {
    this.loadExam(this.$route);
  },
  methods: {
    async loadExam(routeObject) {
      this.$wait.start("loading exam");
      this.unavailable = false;
      await this.$bind("examData", firestore.collection("exams").doc(routeObject.params.exam));
      if (this.examData == null) {
        this.unavailable = true;
      }
      this.examViewerKey = routeObject.params.exam;
      this.$wait.end("loading exam");
    },
  },
};
</script>

<style scoped></style>
