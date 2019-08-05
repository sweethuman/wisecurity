<template>
  <v-list rounded>
    <template v-for="(item, i) in lessons">
      <v-list-item :key="i + 'list-item'" :to="generateLink(item.id)" class="my-3">
        <v-list-item-title class="text-center">{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-divider v-if="i !== lessons.length - 1" :key="i + 'divider'"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "LessonDialogList",
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    chapterId: {
      type: String,
      required: true,
    },
  },
  methods: {
    generateLink(lessonId) {
      return `/lesson/${this.chapterId}/${lessonId}`;
    },
  },
};
</script>

<style scoped></style>
