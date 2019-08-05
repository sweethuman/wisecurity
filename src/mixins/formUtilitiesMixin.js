export const formUtilitiesMixin = {
  methods: {
    focusNextInputOnEvent(event) {
      let indexOf = this._.indexOf(event.target.form, event.target);
      event.target.form[indexOf + 1].focus();
    },
    callFuncAfterInputEvent(event, callback) {
      event.target.blur();
      callback();
    },
  },
};
