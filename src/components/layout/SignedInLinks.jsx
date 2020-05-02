import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

function SignedInLinks(props) {
  return (
    <div>
      <NavLink to="/favourites" className="navbar-toggler mr-3">
        Favourites
      </NavLink>
      <button onClick={props.signOut} className="navbar-toggler">Log Out</button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispatchToProps)(SignedInLinks);
