<template>
  <v-container grid-list-lg fill-height>
    <v-layout wrap fill-height align-center justify-space-around>
      <v-flex v-for="(item, i) in contentCards" :key="i" lg4 md6 xs12 pa-2>
        <content-card
          :round="true"
          :content="generateContent(item)"
          @card-click="showLessonDialog(item)"
        ></content-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="lessonDialog" width="500">
      <v-card>
        <v-card-title class="headline white--text " style="background: rgb(71, 98, 130)" primary-title>
          <v-spacer></v-spacer>
          {{ dialogContent.title }}
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text class="text-center">
          <lesson-dialog-list
            v-if="dialogContent.lessons.length !== 0 && !$wait.is('loading lessons')"
            :lessons="dialogContent.lessons"
            :chapter-id="dialogContent.chapterId"
          ></lesson-dialog-list>
          <div v-if="dialogContent.lessons.length === 0 && !$wait.is('loading lessons')" class="headline py-12">
            <span>Nu au fost gasite lectii!</span>
          </div>
          <v-progress-circular
            v-if="$wait.is('loading lessons')"
            indeterminate
            size="50"
            color="primary"
            class="py-12"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CardContent from "../constructors/CardContent";
import ContentCard from "../components/ContentCard";
import { firestore } from "../firebase";
import LessonDialogList from "../components/Lesson/LessonDialogList";

export default {
  name: "Info",
  components: { ContentCard, LessonDialogList },
  data() {
    return {
      contentCards: [],
      lessonDialog: false,
      dialogContent: {
        chapterId: "",
        title: "Mancare",
        lessons: [],
      },
    };
  },
  firestore: {
    contentCards: firestore.collection("chapters").orderBy("order", "asc"),
  },
  methods: {
    generateContent(item) {
      return new CardContent(
        item.title,
        item.description,
        item.image + "?auto=format&fit=crop&w=1000",
        item.image + "?auto=format&fit=crop&w=200&q=80"
      );
    },
    async showLessonDialog(chapter) {
      this.$wait.start("loading lessons");
      this.lessonDialog = true;
      this.dialogContent.chapterId = chapter.id;
      this.dialogContent.title = chapter.title;
      await this.$bind(
        "dialogContent.lessons",
        firestore.collection(`chapters/${chapter.id}/lessons/`).orderBy("order", "asc")
      );
      this.$wait.end("loading lessons");
    },
  },
};
</script>

<style scoped></style>
