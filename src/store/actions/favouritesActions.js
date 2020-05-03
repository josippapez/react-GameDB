export const addFavouritesAndSignOut = (favourites) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection("favourites").doc(authorId).set({
            favourites,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            firebase
                .auth()
                .signOut();
        }).catch((err) => {
            dispatch({ type: 'ADD_FAVOURITES_ERROR', err });
        })
    }
};