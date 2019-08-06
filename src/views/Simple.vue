<template>
  <v-container>
    <v-layout justify-center wrap>
      <v-flex v-for="(examen, i) in examList" :key="i" lg3 md4 sm6 xs12 pa-1>
        <v-card class="pa-5 text-center" :to="generateLink(examen.id)" height="100%">
          <v-card-title primary-title>{{ examen.title }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { firestore } from "../firebase";

export default {
  name: "Simple",
  data() {
    return {
      examList: [],
    };
  },
  created() {
    this.$bind("examList", firestore.collection("exams").orderBy("title", "asc"));
  },
  methods: {
    generateLink(examId) {
      return "/exam/" + examId;
    },
  },
};
</script>

<style scoped></style>
