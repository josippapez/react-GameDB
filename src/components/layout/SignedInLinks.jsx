import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

function SignedInLinks(props) {
  return (
    <div>
      <NavLink to="/favourites" className="btn border-success option  mr-3">
        Favourites
      </NavLink>
      <button onClick={props.signOut} className="btn border-success option">Log Out</button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispatchToProps)(SignedInLinks);
