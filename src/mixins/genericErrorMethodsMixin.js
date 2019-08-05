export const genericErrorMethodsMixin = {
  methods: {
    requiredOnlyFieldErrors(field, fieldName) {
      const errors = [];
      if (!field.$dirty) return errors;
      !field.required && errors.push(`${fieldName} este obligatoriu`);
      return errors;
    },
  },
};
