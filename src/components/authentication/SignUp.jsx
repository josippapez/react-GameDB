import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signUp, resetStatus } from "../../store/actions/authActions";
import { showSignUpModal } from "../../store/actions/gamesActions";
import "./Forms.scss";
import Modal from "react-responsive-modal";
import Colors from "../../styles/_colors.scss"
import { bindActionCreators } from "redux";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
        <Modal
        modalId="signUp-form"
        closeIconId="signUp-form-close-icon"
        open={this.props.signUpModal}
        onClose={() => {
            this.props.actions.showSignUpModal();
            this.props.actions.resetStatus();
          }}
        styles={{
          overlay: {
            background: Colors.overlay,
            display: "flex",
            alignItems: "flex-start",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            overflowY: "auto",
            overflowX: "hidden",
            zIndex: "1000",
            padding: "1.2rem",
          },
        }}
      >
      <div className="registration-Form" id="fadein">
        <div className="container pt-5">
          <form onSubmit={this.handleSubmit} className="form-group">
            <h5>Sign up</h5>
            <div className="form-group">
              <label htmlFor="email" className="float-left label">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="float-left label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="float-left label">
                Last name
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName" className="float-left label">
                First name
              </label>
              <input
                className="form-control"
                type="text"
                id="firstName"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="btn border-success">Sign up</button>
              <div className="red-text center">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
        </div>
      </div>
      </Modal>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
      {
        showSignUpModal,
        signUp,
        resetStatus,
      },
      dispatch
    ),
  });
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.status,
    signUpModal: state.modals.signUpModal,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
