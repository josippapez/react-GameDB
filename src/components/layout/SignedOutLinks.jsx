import React from "react";
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";

function SignedOutLinks(props) {
  return (
    <div>
      <button
        className="btn border-success option  mr-3"
        onClick={() => props.showSignUpModal()}
      >
        Sign up
      </button>
      <button
        className="btn border-success option"
        onClick={() => props.showSignInModal()}
      >
        Log in
      </button>
      {props.signInModal && <SignIn />}
      {props.signUpModal && <SignUp />}
    </div>
  );
}

export default SignedOutLinks;
