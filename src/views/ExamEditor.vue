<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xl8 lg10 xs12>
        <v-card>
          <v-card-text>
            <form class="mx-3 mt-3">
              <v-text-field v-model="examData.id" label="Id-ul Examenului"></v-text-field>
              <v-text-field v-model="examData.title" label="Titlul Examenului"></v-text-field>
              <v-text-field v-model="temporaryPayload.question" label="Intrebare"></v-text-field>
              <v-text-field v-model="temporaryPayload.options[0]" label="Optiunea 0"></v-text-field>
              <v-text-field v-model="temporaryPayload.options[1]" label="Optiunea 1"></v-text-field>
              <v-text-field v-model="temporaryPayload.options[2]" label="Optiunea 2"></v-text-field>
              <v-text-field v-model="temporaryPayload.options[3]" label="Optiunea 3"></v-text-field>
              <v-text-field v-model="temporaryPayload.correctAnswer" label="Optiunea 3"></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="loadNextQuestion">Urmatoarea Intreabare</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="saveTest">Salveaza Testul</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { firestore } from "../firebase";

export default {
  name: "ExamEditor",
  data() {
    return {
      temporaryPayload: {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "0", //convert to number when you save
      },
      examData: {
        id: "",
        title: "",
        content: [],
      },
    };
  },
  methods: {
    loadNextQuestion() {
      let temporaryPayload = Object.assign({}, this.temporaryPayload);
      temporaryPayload.correctAnswer = parseInt(temporaryPayload.correctAnswer);
      this.examData.content.push(temporaryPayload);
      this.temporaryPayload.question = "";
      this.temporaryPayload.options = ["", "", "", ""];
      this.temporaryPayload.correctAnswer = "0";
    },
    async saveTest() {
      this.$wait.start("save test");
      let examData = Object.assign({}, this.examData);
      let id = examData.id;
      delete examData.id;
      await firestore
        .collection("exams")
        .doc(id)
        .set(examData);
      this.examData.id = "";
      this.examData.title = "";
      this.examData.content = "";
      this.temporaryPayload.question = "";
      this.temporaryPayload.options = ["", "", "", ""];
      this.temporaryPayload.correctAnswer = "0";
      this.$wait.end("save test");
    },
  },
};
</script>

<style scoped></style>
