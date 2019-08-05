<template>
  <v-container>
    <lesson-edit-form></lesson-edit-form>
  </v-container>
</template>

<script>
import ErrorComponent from "../components/ErrorComponent";
import SimpleSpinner from "../components/SimpleSpinner";

export default {
  name: "ContentEditor",
  components: {
    //Webpack Dynamic Imports, this means they are only loaded only when they are used, saving on LoadTime and bandwidth
    LessonEditForm: () => ({
      component: import(/* webpackChunkName: "lessonEditForm" */ "../components/LessonEdit/LessonEditForm"),
      // A component to use while the async component is loading
      loading: SimpleSpinner,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
  },
};
</script>

<style scoped></style>
