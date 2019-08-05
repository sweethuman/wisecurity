import { auth, firestore } from "../firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import { firestoreAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    currentUser: null,
  },
  getters: {
    loggedIn: state => {
      return state.currentUser != null;
    },
  },
  actions: {
    async logIn({ dispatch }, payload) {
      try {
        await auth.signInWithEmailAndPassword(payload.loginId, payload.password);
        await dispatch("bindCurrentUser");
      } catch (error) {
        throw new Error(error.message);
      }
    },
    logOut: firestoreAction(async function({ unbindFirestoreRef }) {
      await auth.signOut();
      return unbindFirestoreRef("currentUser");
    }),
    bindCurrentUser: firestoreAction(function({ bindFirestoreRef }) {
      return bindFirestoreRef("currentUser", firestore.collection("users").doc(auth.currentUser.uid));
    }),
    async register({ dispatch }, payload) {
      if (
        payload == null ||
        payload.name == null ||
        payload.forename == null ||
        payload.email == null ||
        payload.password == null
      )
        throw new Error("Unul sau Mai multe campuri sunt goale");
      try {
        let userCredential = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
        await firestore
          .collection("users")
          .doc(userCredential.user.uid)
          .set({
            forename: payload.forename,
            name: payload.name,
            email: payload.email,
          });
        await userCredential.user.updateProfile({ displayName: payload.name + " " + payload.forename });
        await dispatch("bindCurrentUser");
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateCurrentUser: firestoreAction(async function(context, payload) {
      await firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .update(payload);
    }),
    async updateCurrentPassword({ state }, payload) {
      let credential = firebase.auth.EmailAuthProvider.credential(state.currentUser.email, payload.oldPassword);
      //TODO handle errors as they come as error codes not error messages and the method error handling this method might not be able to show the appropriate message
      // currently it shows any error as a network error
      await auth.currentUser.reauthenticateWithCredential(credential);
      //TODO same here as above
      await auth.currentUser.updatePassword(payload.newPassword);
    },
  },
};
