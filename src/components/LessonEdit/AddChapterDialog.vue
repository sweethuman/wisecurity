<template>
  <v-dialog :value="value" width="50%" @input="forwardUpwards($event)">
    <v-card>
      <v-card-title class="headline white--text " style="background: rgb(71, 98, 130)" primary-title>
        Add Chapter
      </v-card-title>
      <v-card-text class="mt-5">
        <form>
          <v-text-field v-model="chapterForm.id" label="Id-ul Capitolului" :disabled="editing"></v-text-field>
          <v-text-field v-model="chapterForm.title" label="Titlul Capitolului"></v-text-field>
          <v-text-field v-model="chapterForm.description" label="Descrierea Capitolului"></v-text-field>
          <v-text-field v-model="chapterForm.image" label="Imaginea Capitolului"></v-text-field>
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
          Sterge Capitolul
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn dark rounded color="#46658b" large @click="saveChapter">
          Salveaza Capitolul
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
        description: "",
        image: "",
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
      if (newValue === false || this.editing === false || this.chapter === null || this.chapter === "") {
        this.chapterForm.id = "";
        this.chapterForm.title = "";
        this.chapterForm.description = "";
        this.chapterForm.image = "";
        return;
      }
      let chapterValues = await firestore
        .collection("/chapters/")
        .doc(this.chapter)
        .get();
      this.chapterForm.id = chapterValues.id;
      let chapterObject = chapterValues.data();
      this.chapterForm.title = chapterObject.title;
      this.chapterForm.description = chapterObject.description;
      this.chapterForm.image = chapterObject.image;
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
        this.displayError("Nu este specificat un id de capitol");
        return;
      }
      this.$wait.start("deleting chapter");
      try {
        await firestore
          .collection("/chapters/")
          .doc(this.chapter)
          .delete();
      } catch (e) {
        this.$log.error(e);
        this.$showError(e.message);
      }
      this.$emit("input", false);
      this.$wait.end("deleting chapter");
    },
    async saveChapter() {
      if (this.chapterForm.id === "") {
        this.displayError("Nu este specificat un id de capitol");
        return;
      }
      this.$wait.start("saving chapter");
      let finalObject = {
        title: this.chapterForm.title,
        description: this.chapterForm.description,
        image: this.chapterForm.image,
      };

      if (this.editing === false) {
        let checkObject = await firestore
          .collection("/chapters/")
          .doc(this.chapterForm.id)
          .get();
        if (checkObject.exists) {
          this.displayError("Capitolul Exista deja");
          this.$wait.end("saving chapter");
          return;
        }
        let lastObject = await firestore
          .collection("chapters")
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
        .collection("/chapters/")
        .doc(this.chapterForm.id)
        .set(finalObject, { merge: true });
      this.displaySuccess("A fost salvat capitolul");
      this.$wait.end("saving chapter");
    },
  },
};
</script>

<style scoped></style>
