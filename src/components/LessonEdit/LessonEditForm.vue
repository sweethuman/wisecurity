<template>
  <v-layout align-center justify-center>
    <v-flex xl8 lg10 xs12>
      <v-card>
        <v-card-text>
          <form class="mx-3 mt-3">
            <v-select
              v-model="lessonForm.chapter"
              :items="chapterItems"
              item-text="title"
              item-value="id"
              label="Capitol"
              :error-messages="chapterErrors"
              outlined
              @blur="$v.lessonForm.chapter.$touch"
            ></v-select>
            <v-select
              v-show="lessonForm.chapter !== ''"
              v-model="lessonForm.lesson"
              :items="lessonItems"
              item-text="title"
              item-value="id"
              label="Lectie"
              :error-messages="lessonErrors"
              outlined
              @blur="$v.lessonForm.lesson.$touch"
            ></v-select>
            <v-textarea
              v-show="lessonForm.lesson !== ''"
              key="simpleContent"
              v-model.trim="lessonForm.simpleContent"
              auto-grow
              label="Continut Simplu"
              outlined
              :error-messages="simpleContentErrors"
              :loading="$wait.is('loading content')"
              @blur="$v.lessonForm.simpleContent.$touch"
            ></v-textarea>
            <v-textarea
              v-show="lessonForm.lesson !== ''"
              key="mediumContent"
              v-model.trim="lessonForm.mediumContent"
              auto-grow
              label="Continut Mediu"
              outlined
              :error-messages="mediumContentErrors"
              :loading="$wait.is('loading content')"
              @blur="$v.lessonForm.mediumContent.$touch"
            ></v-textarea>
            <v-textarea
              v-show="lessonForm.lesson !== ''"
              key="complexContent"
              v-model.trim="lessonForm.complexContent"
              auto-grow
              label="Continut Complex"
              outlined
              :error-messages="complexContentErrors"
              :loading="$wait.is('loading content')"
              @blur="$v.lessonForm.complexContent.$touch"
            ></v-textarea>
          </form>
        </v-card-text>
        <v-alert
          v-model="alert.show"
          :type="alert.type"
          transition="scale-transition"
          dismissible
          mode="in-out"
          class="my-2 mx-5"
        >
          {{ alert.message }}
        </v-alert>
        <v-card-actions v-show="lessonForm.lesson !== ''" class="pb-4 px-5">
          <v-btn dark rounded :large="$vuetify.breakpoint.mdAndUp" color="red" @click="deleteLesson">
            <v-icon :left="!$vuetify.breakpoint.xsOnly">mdi-delete</v-icon>
            {{ returnEmptyStringOnlyOnXS("Sterge Lectia") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark rounded :large="$vuetify.breakpoint.mdAndUp" color="#46658b" @click="saveLesson">
            {{ returnEmptyStringOnlyOnXS("Salveaza Lectia") }}
            <v-icon :right="!$vuetify.breakpoint.xsOnly">mdi-content-save-edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { firestore } from "../../firebase";

export default {
  name: "LessonEditForm",
  data() {
    return {
      chapterItems: [],
      lessonItems: [],
      lessonForm: {
        chapter: "",
        lesson: "",
        simpleContent: "",
        mediumContent: "",
        complexContent: "",
      },
      alert: {
        show: false,
        type: "error",
        message: "GENERIC ERROR",
      },
    };
  },
  computed: {
    chapterErrors() {
      const errors = [];
      if (!this.$v.lessonForm.chapter.$dirty) return errors;
      !this.$v.lessonForm.chapter.required && errors.push("Capitolul este necesar");
      return errors;
    },
    lessonErrors() {
      const errors = [];
      if (!this.$v.lessonForm.lesson.$dirty) return errors;
      !this.$v.lessonForm.lesson.required && errors.push("Lecția este necesară");
      return errors;
    },
    simpleContentErrors() {
      const errors = [];
      if (!this.$v.lessonForm.simpleContent.$dirty) return errors;
      !this.$v.lessonForm.simpleContent.required && errors.push("Conținutul Simplu este necesar");
      return errors;
    },
    mediumContentErrors() {
      const errors = [];
      if (!this.$v.lessonForm.mediumContent.$dirty) return errors;
      !this.$v.lessonForm.mediumContent.required && errors.push("Conținutul Mediu este necesar");
      return errors;
    },
    complexContentErrors() {
      const errors = [];
      if (!this.$v.lessonForm.complexContent.$dirty) return errors;
      !this.$v.lessonForm.complexContent.required && errors.push("Conținutul Complex este necesar");
      return errors;
    },
  },
  watch: {
    "lessonForm.chapter": {
      async handler(newChapter) {
        this.lessonForm.lesson = "";
        this.$v.lessonForm.lesson.$reset();
        await this.$bind("lessonItems", firestore.collection(`/chapters/${newChapter}/lessons`));
      },
    },
    "lessonForm.lesson": {
      async handler(newLesson) {
        if (newLesson === "") return;
        this.$wait.start("loading content");
        this.$v.lessonForm.simpleContent.$reset();
        this.$v.lessonForm.mediumContent.$reset();
        this.$v.lessonForm.complexContent.$reset();
        let simpleContentPromise = firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/${newLesson}/content/`)
          .doc("simple")
          .get();
        let mediumContentPromise = firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/${newLesson}/content/`)
          .doc("medium")
          .get();
        let complexContentPromise = firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/${newLesson}/content/`)
          .doc("complex")
          .get();
        let content = await Promise.all([simpleContentPromise, mediumContentPromise, complexContentPromise]);
        this.lessonForm.simpleContent = content[0].exists ? content[0].data().source : "";
        this.lessonForm.mediumContent = content[1].exists ? content[1].data().source : "";
        this.lessonForm.complexContent = content[2].exists ? content[2].data().source : "";
        this.$wait.end("loading content");
      },
    },
  },
  async created() {
    await this.$bind("chapterItems", firestore.collection("chapters").orderBy("order", "asc"));
  },
  validations: {
    lessonForm: {
      chapter: { required },
      lesson: { required },
      simpleContent: { required },
      mediumContent: { required },
      complexContent: { required },
    },
  },
  methods: {
    returnEmptyStringOnlyOnXS(text) {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "";
      }
      return text;
    },
    displayError(message) {
      this.alert.message = message;
      this.alert.type = "error";
      this.alert.show = true;
    },
    displaySuccess(message) {
      this.alert.message = message;
      this.alert.type = "success";
      this.alert.show = true;
    },
    async deleteLesson() {
      this.$wait.start("deleting lesson");
      try {
        await firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/`)
          .doc(this.lessonForm.lesson)
          .delete();
      } catch (e) {
        this.$log.error(e);
        this.$showError(e.message);
      }
      this.$wait.end("deleting lesson");
      this.displaySuccess("Lectia a fost STEARSA!");
    },
    async saveLesson() {
      this.$wait.start("saving lesson");
      this.$v.lessonForm.$touch();
      if (this.$v.lessonForm.$invalid) {
        this.displayError("Sunt greseli in formularul de Inregistrare");
        return;
      }
      let savePromiseArray = [];
      savePromiseArray.push(
        firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/${this.lessonForm.lesson}/content/`)
          .doc("simple")
          .set({
            source: this.lessonForm.simpleContent,
          })
      );
      savePromiseArray.push(
        firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/${this.lessonForm.lesson}/content/`)
          .doc("medium")
          .set({
            source: this.lessonForm.mediumContent,
          })
      );
      savePromiseArray.push(
        firestore
          .collection(`/chapters/${this.lessonForm.chapter}/lessons/${this.lessonForm.lesson}/content/`)
          .doc("complex")
          .set({
            source: this.lessonForm.complexContent,
          })
      );
      await Promise.all(savePromiseArray);
      this.$wait.end("saving lesson");
      this.displaySuccess("Lectia a fost salvata cu success!");
    },
  },
};
</script>

<style scoped></style>
