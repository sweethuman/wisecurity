<template>
  <v-card>
    <v-card-text>
      <h2 v-if="text != null" class="display-3 font-weight-regular mb-3 text-center">{{ text }}</h2>
      <h3 v-if="!disableSubjectText" class="display-2">
        Pe Subiect ai
        <span class="red--text">{{ points }}</span>
        puncte din
        <span class="green--text">{{ maxPoints }}</span>
        puncte!
      </h3>
      <h3 v-if="allPoints != null && maxAllPoints != null" class="display-2 text-center">
        {{ textSingleSubject }}
        <span class="red--text">{{ allPoints }}</span>
        puncte din
        <span class="green--text">{{ maxAllPoints }}</span>
        !
      </h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ExamResult",
  props: {
    points: {
      type: Number,
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
    allPoints: {
      type: Number,
      default: null,
    },
    maxAllPoints: {
      type: Number,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    disableSubjectText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    textSingleSubject() {
      return this.disableSubjectText ? "Ai obtinut " : "In total ai ";
    },
  },
};
</script>

<style scoped></style>
