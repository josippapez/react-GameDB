import React from "react";
import { NavLink } from "react-router-dom";

function SignedOutLinks() {
  return (
    <div>
      <NavLink to="/signup" className="navbar-toggler mr-3">Sign up</NavLink>
      <NavLink to="/signin" className="navbar-toggler">Log in</NavLink>
    </div>
  );
}

export default SignedOutLinks;
