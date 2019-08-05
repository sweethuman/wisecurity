export const textUtilitiesMixin = {
  computed: {
    textColorOnTheme() {
      let parent = this.$parent;
      while (parent.isDark == null) {
        parent = parent.$parent;
      }
      return parent.isDark ? "white--text" : "black--text";
    },
  },
};

export const isDarkThemeOn = {
  computed: {
    isDark() {
      let parent = this.$parent;
      while (parent.isDark == null) {
        parent = parent.$parent;
      }
      return parent.isDark;
    },
  },
};

export const utilityMethodsMixin = {
  methods: {
    clearObjStringFields(object) {
      this._.forEach(object, (value, key) => {
        object[key] = "";
      });
    },
  },
};
