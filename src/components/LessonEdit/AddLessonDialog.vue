<template>
  <v-dialog :value="value" width="50%" @input="forwardUpwards($event)">
    <v-card>
      <v-card-title class="headline white--text " style="background: rgb(71, 98, 130)" primary-title>
        Add Chapter
      </v-card-title>
      <v-card-text class="mt-5">
        <form>
          <v-text-field v-model="chapterForm.id" label="Id-ul Lectiei" :disabled="editing"></v-text-field>
          <v-text-field v-model="chapterForm.title" label="Titlul Lectiei"></v-text-field>
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
      <v-card-actions>
        <v-btn v-if="editing === true" dark large rounded color="red" @click="deleteChapter">
          <v-icon left>mdi-delete</v-icon>
          Sterge Lectia
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn dark rounded color="#46658b" large @click="saveChapter">
          Salveaza Lectia
          <v-icon right>mdi-content-save-edit</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { firestore } from "../../firebase";

export default {
  name: "AddChapterDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    chapter: {
      type: String,
      required: true,
    },
    lesson: {
      type: String,
      default: null,
    },
    editing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      chapterForm: {
        id: "",
        title: "",
      },
      alert: {
        show: false,
        type: "error",
        message: "GENERIC ERROR",
      },
    };
  },
  watch: {
    async value(newValue) {
      if (
        newValue === false ||
        this.editing === false ||
        this.chapter === null ||
        this.chapter === "" ||
        this.lessons === null ||
        this.lesson === ""
      ) {
        this.chapterForm.id = "";
        this.chapterForm.title = "";
        return;
      }
      let lessonValues = await firestore
        .collection(`/chapters/${this.chapter}/lessons`)
        .doc(this.lesson)
        .get();
      this.chapterForm.id = lessonValues.id;
      let lessonObject = lessonValues.data();
      this.chapterForm.title = lessonObject.title;
    },
  },
  methods: {
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
    forwardUpwards(event) {
      this.$emit("input", event);
    },
    async deleteChapter() {
      if (this.chapterForm.id === "") {
        this.displayError("Nu este specificat un id de lectie");
        return;
      }
      this.$wait.start("deleting lesson");
      try {
        await firestore
          .collection(`/chapters/${this.chapter}/lessons`)
          .doc(this.lesson)
          .delete();
      } catch (e) {
        this.$log.error(e);
        this.$showError(e.message);
      }
      this.$emit("input", false);
      this.$wait.end("deleting lesson");
    },
    async saveChapter() {
      if (this.chapterForm.id === "") {
        this.displayError("Nu este specificat un id de lectie");
        return;
      }
      this.$wait.start("saving lesson");
      let finalObject = {
        title: this.chapterForm.title,
      };

      if (this.editing === false) {
        let checkObject = await firestore
          .collection(`/chapters/${this.chapter}/lessons`)
          .doc(this.chapterForm.id)
          .get();
        if (checkObject.exists) {
          this.displayError("Lectia Exista deja");
          this.$wait.end("saving lesson");
          return;
        }
        let lastObject = await firestore
          .collection(`chapters/${this.chapter}/lessons`)
          .orderBy("order", "desc")
          .limit(1)
          .get();
        if (!lastObject.empty) {
          finalObject.order = lastObject.docs[0].data().order + 1;
        } else {
          finalObject.order = 0;
        }
      }

      await firestore
        .collection(`/chapters/${this.chapter}/lessons`)
        .doc(this.chapterForm.id)
        .set(finalObject, { merge: true });
      this.displaySuccess("A fost salvata lectia");
      this.$wait.end("saving lesson");
    },
  },
};
</script>

<style scoped></style>
