import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { addFavouritesAndSignOut } from "../../store/actions/favouritesActions";
import { bindActionCreators, compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

function SignedInLinks(props) {
  return (
    <div>
      <NavLink to="/favourites" className="btn border-success option  mr-3">
        Favourites
      </NavLink>
      <button
        onClick={() => {
          props.actions.addFavouritesAndSignOut(props.favourites);
          window.localStorage.clear();
        }}
        className="btn border-success option mr-3"
      >
        Log Out
      </button>
      <div className="float-right initials">{props.store.firebase.profile.initials}</div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      signOut,
      addFavouritesAndSignOut,
    },
    dispatch
  ),
});
const mapStateToProps = (state) => {
  return {
    favourites: state.games.favourites,
    store: state,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "favourites" }])
)(SignedInLinks);
