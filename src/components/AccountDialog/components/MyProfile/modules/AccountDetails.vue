<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex xs12>
        <v-subheader>
          Account Info
          <v-spacer></v-spacer>
          <edit-buttons
            v-model="editable"
            :prevent-save="$v.accountInfo.$invalid"
            @click:close="loadAccountData"
            @click:save="saveAccountData"
          ></edit-buttons>
        </v-subheader>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12 md6>
        <v-text-field
          v-model="accountInfo.name"
          label="Nume"
          :disabled="!editable"
          :error-messages="requiredOnlyFieldErrors(this.$v.accountInfo.name, 'Numele')"
          @blur="this.$v.accountInfo.name.$touch"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          v-model="accountInfo.forename"
          label="Prenume"
          :disabled="!editable"
          :error-messages="requiredOnlyFieldErrors(this.$v.accountInfo.forename, 'Prenumele')"
          @blur="this.$v.accountInfo.forename.$touch"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="accountInfo.email"
          label="Email"
          :disabled="!editable"
          :error-messages="accountEmailErrors"
          @blur="this.$v.accountInfo.email.$touch"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!-- NOTE Password Edit Form-->
    <v-layout wrap>
      <v-flex xs12>
        <v-subheader id="passwordForm">
          Schimba Parola
          <v-spacer></v-spacer>
          <edit-buttons
            v-model="showPasswordForm"
            :prevent-save="$v.passwordForm.$invalid"
            @click:edit="scrollToPassForm"
            @click:close="closePassForm"
            @click:save="savePassForm"
          ></edit-buttons>
        </v-subheader>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12>
        <v-expand-transition>
          <form v-if="showPasswordForm" class="layout wrap">
            <v-flex xs12>
              <v-text-field
                v-model="passwordForm.oldPassword"
                name="current-password"
                type="password"
                label="Parola Veche"
                autocomplete="current-password"
                :error-messages="requiredOnlyFieldErrors($v.passwordForm.oldPassword, 'Parola veche')"
                @blur="$v.passwordForm.oldPassword.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="passwordForm.newPassword"
                name="new-password"
                type="password"
                label="Parola Noua"
                autocomplete="new-password"
                :error-messages="newPasswordErrors"
                @blur="$v.passwordForm.newPassword.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="passwordForm.newRepeatPassword"
                name="new-password-repeat"
                type="password"
                label="Repeta Parola Noua"
                :error-messages="newRepeatPasswordErrors"
                @blur="$v.passwordForm.newRepeatPassword.$touch"
              ></v-text-field>
            </v-flex>
          </form>
        </v-expand-transition>
      </v-flex>
    </v-layout>
    <v-alert
      v-model="alert.show"
      :type="alert.type"
      transition="scale-transition"
      dismissible
      mode="in-out"
      style="margin-bottom: 0; margin-top: 4px; position: sticky; bottom: 0; height: auto; width: auto;"
    >
      {{ alert.message }}
    </v-alert>
  </v-container>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { genericErrorMethodsMixin } from "../../../../../mixins/genericErrorMethodsMixin";
import { utilityMethodsMixin } from "../../../../../mixins/utilitiesMixins";
import { formUtilitiesMixin } from "../../../../../mixins/formUtilitiesMixin";
import EditButtons from "../../../../core/EditButtons";
import { mapState } from "vuex";

export default {
  name: "AccountDetails",
  components: {
    EditButtons,
  },
  mixins: [genericErrorMethodsMixin, utilityMethodsMixin, formUtilitiesMixin],
  props: {
    scrollParent: {
      type: Object,
      required: true,
    },
  },
  validations: {
    accountInfo: {
      name: { required },
      forename: { required },
      email: { required, email },
    },
    passwordForm: {
      oldPassword: { required },
      newPassword: { required, minLength: minLength(8) },
      newRepeatPassword: { required, sameAsNewPassword: sameAs("newPassword") },
    },
  },
  data() {
    return {
      accountInfo: {
        name: null,
        forename: null,
        email: null,
      },
      passwordForm: {
        oldPassword: null,
        newPassword: null,
        newRepeatPassword: null,
      },
      editable: false,
      showPasswordForm: false,
      alert: {
        show: false,
        type: "error",
        message: "GENERIC ERROR",
      },
    };
  },
  computed: {
    accountEmailErrors() {
      const errors = [];
      // !this.$v.accountInfo.email.emailNotExist && errors.push("Email deja prezent");
      if (!this.$v.accountInfo.email.$dirty) return errors;
      !this.$v.accountInfo.email.email && errors.push("Trebuie sa fie un Email Valid");
      !this.$v.accountInfo.email.required && errors.push("Emailul este necesar");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.passwordForm.newPassword.$dirty) return errors;
      !this.$v.passwordForm.newPassword.required && errors.push("Parola Noua este obligatorie");
      !this.$v.passwordForm.newPassword.minLength && errors.push("Trebuie sa aiba minim 8 caractere");
      return errors;
    },
    newRepeatPasswordErrors() {
      const errors = [];
      if (!this.$v.passwordForm.newRepeatPassword.$dirty) return errors;
      !this.$v.passwordForm.newRepeatPassword.required && errors.push("Repetarea Parolei Noi este necesara");
      !this.$v.passwordForm.newRepeatPassword.sameAsNewPassword &&
        errors.push("Trebuie sa fie identica cu parola noua");
      return errors;
    },
    ...mapState("userManagement", ["currentUser"]),
  },
  watch: {
    currentUser: {
      immediate: true,
      handler() {
        this.loadAccountData();
      },
    },
  },
  methods: {
    loadAccountData() {
      let currentUser = this.$store.state.userManagement.currentUser;
      this.accountInfo.name = currentUser.name;
      this.accountInfo.forename = currentUser.forename;
      this.accountInfo.email = currentUser.email;
      this.$v.accountInfo.$reset();
      this.hideError();
    },
    async saveAccountData() {
      this.$v.accountInfo.$touch();
      if (this.$v.accountInfo.$invalid) {
        this.displayError("Sunt greseli in Datele noi ale Contului");
        return;
      }
      await this.$store.dispatch("userManagement/updateCurrentUser", this.accountInfo);
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
    hideError() {
      this.alert.show = false;
    },
    scrollToPassForm() {
      //this needs to be here because if it will be used upwards vue won't detect as a function setTimeout
      setTimeout(
        () =>
          this.$vuetify.goTo("#passwordForm", {
            duration: 1000,
            easing: "easeInOutQuad",
            container: this.scrollParent,
          }),
        50
      );
    },
    closePassForm() {
      this.clearObjStringFields(this.passwordForm);
      this.$v.passwordForm.$reset();
    },
    async savePassForm() {
      this.$v.passwordForm.$touch();
      if (this.$v.passwordForm.$invalid) {
        this.displayError("Formularul de schimbare a parolei este gresit");
        return;
      }
      try {
        await this.$store.dispatch("userManagement/updateCurrentPassword", {
          oldPassword: this.passwordForm.oldPassword,
          newPassword: this.passwordForm.newPassword,
        });
        this.displaySuccess("Password successfully changed");
        this.clearObjStringFields(this.passwordForm);
        this.$v.passwordForm.$reset();
      } catch (e) {
        this.displayError(e.message);
      }
    },
  },
};
</script>

<style scoped></style>
