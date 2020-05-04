export const signIn = (userData) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
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
      })
      .then(() => dispatch({ type: "SIGNUP_SUCCSESS" }))
      .catch(err => dispatch({ type: "SIGNUP_ERROR", err }));
  };
};

export const resetStatus = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'RESET_STATUS' });
  }
}