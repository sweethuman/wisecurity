//to change the title of the page just declare a pageTitle variable or computed prop inside the component

export default {
  watch: {
    pageTitle(newValue) {
      document.title = newValue + " - Wisecurity";
    },
  },
  created() {
    if (this.pageTitle) {
      document.title = this.pageTitle + " - Wisecurity";
    }
  },
};
