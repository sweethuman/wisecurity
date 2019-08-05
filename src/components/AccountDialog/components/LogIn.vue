<template>
  <v-card>
    <v-tabs v-model="activeTab" color="#ffffff" dark slider-color="#E94057" grow icons-and-text>
      <v-tab ripple style="background: rgb(70, 101, 139)">
        Login
        <v-icon>{{ tabIcon(0, "mdi-account") }}</v-icon>
      </v-tab>
      <v-btn
        v-if="!this.$vuetify.breakpoint.mdAndUp"
        style="margin: auto"
        class="wiretap-gradient-halved"
        round
        @click="$emit('close-dialog')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-tab ripple style="background: rgb(70, 101, 139)">
        Register
        <v-icon>{{ tabIcon(1, "mdi-account-plus") }}</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="loginForm.loginId"
                prepend-icon="mdi-account"
                name="loginId"
                label="Email"
                type="text"
                :error-messages="loginIdErrors"
                @blur="$v.loginForm.loginId.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="loginForm.loginPassword"
                prepend-icon="mdi-lock"
                name="password"
                label="Parola"
                type="password"
                color="red"
                :error-messages="loginPasswordErrors"
                @blur="$v.loginForm.loginPassword.$touch"
                @keyup.enter="callFuncAfterInputEvent($event, submitLogin)"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="wiretap-gradient-angled" large @click="submitLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <form ref="form">
              <v-text-field
                v-model="registerForm.registerName"
                prepend-icon="mdi-face"
                name="registerName"
                label="Nume"
                type="text"
                :error-messages="requiredOnlyFieldErrors($v.registerForm.registerName, 'Numele')"
                @blur="$v.registerForm.registerName.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerForename"
                prepend-icon="mdi-face"
                name="registerForename"
                label="Prenume"
                type="text"
                :error-messages="requiredOnlyFieldErrors($v.registerForm.registerForename, 'Prenumele')"
                @blur="$v.registerForm.registerForename.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerEmail"
                prepend-icon="mdi-at"
                name="registerEmail"
                label="Email"
                type="text"
                color="#0091ff"
                :error-messages="registerEmailErrors"
                @blur="$v.registerForm.registerEmail.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerPassword"
                prepend-icon="mdi-lock"
                name="registerPassword"
                label="Parola"
                type="password"
                color="#a80000"
                :error-messages="registerPasswordErrors"
                hint="Parola trebuie sa aiba minim 8 caractere"
                @blur="$v.registerForm.registerPassword.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerPasswordRepeat"
                prepend-icon="mdi-lock"
                name="registerPasswordRepeat"
                label="Repeta Parola"
                type="password"
                color="#a80000"
                :error-messages="registerPasswordRepeatErrors"
                @blur="$v.registerForm.registerPasswordRepeat.$touch"
                @keyup.enter="callFuncAfterInputEvent($event, submitRegister)"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="wiretap-gradient-angled" large @click="submitRegister">Creeaza Cont</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-alert
      v-model="alert.show"
      :type="alert.type"
      transition="scale-transition"
      dismissible
      mode="in-out"
      style="margin-bottom: 0; margin-top: 4px"
    >
      {{ alert.message }}
    </v-alert>
  </v-card>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { formUtilitiesMixin } from "../../../mixins/formUtilitiesMixin";
import { utilityMethodsMixin } from "../../../mixins/utilitiesMixins";
import { genericErrorMethodsMixin } from "../../../mixins/genericErrorMethodsMixin";

export default {
  name: "LogIn",
  mixins: [formUtilitiesMixin, genericErrorMethodsMixin, utilityMethodsMixin],
  validations: {
    loginForm: {
      loginId: { required, email },
      loginPassword: { required, minLength: minLength(8) },
    },
    registerForm: {
      registerName: { required },
      registerForename: { required },
      registerEmail: { required, email },
      registerPassword: { required, minLength: minLength(8) },
      registerPasswordRepeat: { required, sameAsRegisterPassword: sameAs("registerPassword") },
    },
  },
  data() {
    return {
      activeTab: 0,
      loginForm: {
        loginId: "",
        loginPassword: "",
      },
      registerForm: {
        registerName: "",
        registerForename: "",
        registerEmail: "",
        registerPassword: "",
        registerPasswordRepeat: "",
      },
      alert: {
        show: false,
        type: "error",
        message: "GENERIC ERROR",
      },
    };
  },
  computed: {
    loginIdErrors() {
      const errors = [];
      if (!this.$v.loginForm.loginId.$dirty) return errors;
      !this.$v.loginForm.loginId.required && errors.push("Email este necesar");
      !this.$v.loginForm.loginId.email && errors.push("Email invalid");
      return errors;
    },
    loginPasswordErrors() {
      const errors = [];
      if (!this.$v.loginForm.loginPassword.$dirty) return errors;
      !this.$v.loginForm.loginPassword.required && errors.push("Parola este necesara");
      !this.$v.loginForm.loginPassword.minLength && errors.push("Lungimea minima este de 8 caractere");
      return errors;
    },
    registerEmailErrors() {
      const errors = [];
      // here comes a check for an already existing email in the database(i think you can get this from auth component)
      if (!this.$v.registerForm.registerEmail.$dirty) return errors;
      !this.$v.registerForm.registerEmail.email && errors.push("Trebuie sa fie un Email Valid");
      !this.$v.registerForm.registerEmail.required && errors.push("Emailul este necesar");
      return errors;
    },
    registerPasswordErrors() {
      const errors = [];
      if (!this.$v.registerForm.registerPassword.$dirty) return errors;
      !this.$v.registerForm.registerPassword.required && errors.push("Parola este necesara");
      !this.$v.registerForm.registerPassword.minLength && errors.push("Trebuie sa aiba minim 8 caractere");
      return errors;
    },
    registerPasswordRepeatErrors() {
      const errors = [];
      if (!this.$v.registerForm.registerPasswordRepeat.$dirty) return errors;
      !this.$v.registerForm.registerPasswordRepeat.sameAsRegisterPassword &&
        errors.push("Trebuie sa fie identica cu parola originala!");
      !this.$v.registerForm.registerPasswordRepeat.required && errors.push("Repetarea Parolei este necesara");
      return errors;
    },
  },
  methods: {
    tabIcon: function(tabNumber, baseIconName) {
      return tabNumber === this.activeTab ? baseIconName : baseIconName + "-outline";
    },
    async submitLogin() {
      this.$v.loginForm.$touch();
      if (this.$v.loginForm.$invalid) {
        this.displayError("Sunt greseli in formularul de Login");
        return;
      }
      try {
        await this.$store.dispatch("userManagement/logIn", {
          loginId: this.loginForm.loginId,
          password: this.loginForm.loginPassword,
        });
        this.hideError();
        this.clearObjStringFields(this.loginForm);
        this.$emit("close-dialog");
        this.$v.loginForm.$reset();
      } catch (e) {
        this.displayError(e.message);
      }
    },
    async submitRegister() {
      this.$v.registerForm.$touch();
      if (this.$v.registerForm.$invalid) {
        this.displayError("Sunt greseli in formularul de Inregistrare");
        return;
      }
      try {
        await this.$store.dispatch("userManagement/register", {
          name: this.registerForm.registerName,
          forename: this.registerForm.registerForename,
          email: this.registerForm.registerEmail,
          password: this.registerForm.registerPassword,
        });
        this.hideError();
        this.clearObjStringFields(this.registerForm);
        this.$emit("close-dialog");
        this.$v.registerForm.$reset();
      } catch (e) {
        this.displayError(e.message);
      }
    },
    displayError(message) {
      this.alert.message = message;
      this.alert.type = "error";
      this.alert.show = true;
    },
    hideError() {
      this.alert.show = false;
    },
  },
};
</script>

<style scoped></style>
