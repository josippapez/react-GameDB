import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { resetData } from "../../store/actions/gamesActions";
import {
  showSignInModal,
  showSignUpModal,
} from "../../store/actions/gamesActions";
class Navbar extends Component {
  handleReset = () => {
    this.props.actions.resetData();
  };
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand center"
            onClick={this.handleReset}
          >
            GameDB
          </Link>
          {this.props.isNotAuthenticated ? (
            <SignedOutLinks
              showSignInModal={this.props.actions.showSignInModal}
              showSignUpModal={this.props.actions.showSignUpModal}
              signInModal={this.props.signInModal}
              signUpModal={this.props.signUpModal}
            />
          ) : (
            <SignedInLinks profile={this.props.profile} />
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isNotAuthenticated: state.firebase.auth.isEmpty,
    profile: state.firebase.profile,
    signInModal: state.modals.signInModal,
    signUpModal: state.modals.signUpModal,
  };
};

const mapStateToDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      resetData,
      showSignInModal,
      showSignUpModal,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Navbar);
