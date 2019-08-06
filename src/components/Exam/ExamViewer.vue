<template>
  <v-layout justify-center my-5>
    <v-flex md8>
      <v-card v-for="(data, i) in examData" :key="i" class="mb-2 elevation-3 grey darken-2" dark>
        <v-card-title class="headline ma-2">
          {{ data.question }}
        </v-card-title>
        <v-divider />
        <v-card-text>
          <simple-selection ref="exerciseCards" :exercise="data" :disabled="answered"></simple-selection>
        </v-card-text>
      </v-card>
      <v-divider id="examResultDivider" class="my-3"></v-divider>
      <v-layout v-if="!answered" align-space-around justify-center row wrap>
        <v-hover>
          <template #default="{ hover }">
            <v-btn
              dark
              color="green"
              large
              rounded
              :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
              @click="finishTest()"
            >
              {{ finishButton }}
              <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </template>
        </v-hover>
      </v-layout>
      <exam-result
        v-if="answered"
        :points="points"
        :max-points="maxPoints"
        :all-points="allPoints"
        :max-all-points="maxAllPoints"
        :text="examResultText"
        :disable-subject-text="true"
      ></exam-result>
      <v-snackbar
        v-model="showSnackbar"
        :color="snackbarData.color"
        :timeout="3000"
        class="font-weight-bold title"
        :multi-line="!$vuetify.breakpoint.mdAndUp"
      >
        {{ snackbarData.text }}
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import SimpleSelection from "./SimpleSelection";
import ExamResult from "./ExamResult";
import { firestore } from "../../firebase";

export default {
  name: "ExamViewer",
  components: { SimpleSelection, ExamResult },
  props: {
    examData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      answered: false,
      points: 0,
      maxPoints: 0,
      allPoints: 0,
      maxAllPoints: 0,
      snackbarData: {
        color: null,
        text: null,
      },
      showSnackbar: null,
      exerciseCards: [],
    };
  },
  computed: {
    finishButton() {
      return "Termina Testul";
    },
    examResultText() {
      return "Ai terminat Testul";
    },
  },
  async created() {
    await this.$bind("examFromFirestore", firestore.collection("exams").doc("maca"));
  },
  async mounted() {
    await this.$vuetify.goTo(0, { duration: 1000 });
  },
  methods: {
    validateAnswers() {
      for (let i = 0; i < this.$refs.exerciseCards.length; i++) {
        if (!this.$refs.exerciseCards[i].isAnswerChecked()) {
          this.snackbarData.color = "warning";
          this.snackbarData.text = "Au ramas Raspunsuri neselectate!";
          this.showSnackbar = true;
          return false;
        }
      }
      return true;
    },
    finishTest() {
      if (this.validateAnswers() === false) return;
      this.answered = true;
      this.calculateCards();
      this.allPoints += this.points;
      this.maxAllPoints += this.maxPoints;
    },
    calculateCards() {
      for (let i = 0; i < this.$refs.exerciseCards.length; i++) {
        this.points += this.$refs.exerciseCards[i].calculateChips();
        this.maxPoints += this.$refs.exerciseCards[i].calculateMaxPoints();
      }
    },
  },
};
</script>

<style scoped></style>
