import { purgeStoredState } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const signIn = (userData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((response) => {
        getFirebase().firestore().collection("favourites").doc(response.user.uid).get().then(doc => {
          if (doc.exists) {
            dispatch({type: "RESET_FAVOURITES"});
            const favourites = doc.data().favourites;
            dispatch({type: "SET_FAVOURITES", favourites})
          }
          dispatch({ type: "LOGIN_SUCCESS" });
        })
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        purgeStoredState({
          key: "root",
          storage,
        });
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        getFirebase().firestore()
          .collection("users")
          .doc(response.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
        getFirebase().firestore()
          .collection("favourites")
          .doc(response.user.uid)
          .set({
            favourites: [],
            authorFirstName: newUser.firstName,
            authorLastName: newUser.lastName,
            createdAt: new Date()
          });
        dispatch({type: "RESET_FAVOURITES"});
      })
      .catch(err => dispatch({ type: "SIGNUP_ERROR", err }));
  };
};

export const resetStatus = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'RESET_STATUS' });
  }
}