<template>
  <form style="width: 100%">
    <v-radio-group v-model="radioSelection" :disabled="disabled" hide-details style="width: 100%">
      <v-layout
        v-for="(option, i) in exercise.options"
        :key="i"
        :style="`background: ${getAnswerColor(chipStore[i].value)}; border-radius: 10px`"
        my-1
        px-2
        style="width: 100%"
        align-center
      >
        <v-flex grow>
          <v-radio :value="i" class="py-2" color="primary">
            <template #label>
              <span :class="textColorOnTheme">{{ option }}</span>
            </template>
          </v-radio>
        </v-flex>
        <v-flex shrink>
          <v-chip
            v-if="chipStore[i].result"
            :color="chipStore[i].value === resultOptions.wrong ? '#c7004c' : '#4fb783'"
            label
            dark
          >
            {{ getLabelText(chipStore[i].value) }}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-radio-group>
  </form>
</template>

<script>
export default {
  name: "SingleSelection",
  props: {
    exercise: {
      type: Object,
      default: undefined,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radioSelection: null,
      chipStore: [],
      resultOptions: Object.freeze({ correct: 0, wrong: 1, intermediate: 2 }),
    };
  },
  computed: {
    textColorOnTheme() {
      let parent = this.$parent;
      while (parent.isDark == null) {
        parent = parent.$parent;
      }
      return parent.isDark ? "white--text" : "black--text";
    },
  },
  beforeMount() {
    //Sets initial chip values to disabled(false)
    //Chips are the indicators next to the label that say if you're answer is correct or not
    this.calculateChips();
  },
  methods: {
    showChip(chipId) {
      if (chipId === this.radioSelection) {
        if (chipId === this.exercise.correctAnswer) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (chipId === this.exercise.correctAnswer && this.radioSelection != null) {
        return { result: true, value: this.resultOptions.intermediate };
      }
      return { result: false };
    },
    isAnswerChecked() {
      return this.radioSelection != null;
    },
    calculateMaxPoints() {
      return 1;
    },
    getLabelText(value) {
      if (value === this.resultOptions.correct) return "Corect";
      if (value === this.resultOptions.wrong) return "Gresit";
      if (value === this.resultOptions.intermediate) return "Raspunsul Corect";
      return "";
    },
    getAnswerColor(value) {
      if (value === this.resultOptions.correct) return "#c6e377";
      if (value === this.resultOptions.wrong) return "#ef6c57";
      if (value === this.resultOptions.intermediate) return "#848081";
      return "";
    },
    calculateChips() {
      let points = 0;
      for (let j = 0; j < this.exercise.options.length; j++) {
        //NOTE showChip is not included in this mixin but it is ussualy found in the SelectionComponent of an Exam Page
        //Should add a default show chip of something
        let tempChipValue = this.showChip(j);
        if (tempChipValue.result === true && tempChipValue.value === this.resultOptions.correct) {
          ++points;
        }
        this.$set(this.chipStore, j, tempChipValue);
      }
      return points;
    },
  },
};
</script>

<style>
.v-input__control {
  width: 100% !important;
}
</style>
