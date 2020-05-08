import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Modal from "react-responsive-modal";
import { bindActionCreators } from "redux";

import { signIn, resetStatus } from "../../store/actions/authActions";
import { showSignInModal } from "../../store/actions/gamesActions";
import "./Forms.scss";
import Colors from "../../styles/_colors.scss";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.actions.signIn(this.state);
  };
  render() {
    const { status, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <Modal
        modalId="login-form"
        closeIconId="login-form-close-icon"
        open={this.props.signInModal}
        onClose={() => {
          this.props.actions.showSignInModal();
          if (status) {
            this.props.actions.resetStatus();
          }
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
            padding: "1.2rem"
          }
        }}
      >
        <div className="login-Form" id="fadein">
          <div className="container pt-5">
            <form onSubmit={this.handleSubmit} className="white">
              <h5 className="grey-text text-darken-3">Sign in</h5>
              <div className="form-group">
                <label htmlFor="firstName" className="float-left label">
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
                <label htmlFor="firstName" className="float-left label">
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
                <button className="btn border-success option text-dark">
                  Login
                </button>

                {status ? (
                  <div className="status-text pt-3 mt-3">
                    <p>{status}</p>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      showSignInModal,
      signIn,
      resetStatus
    },
    dispatch
  )
});

const mapStateToProps = state => {
  return {
    signInModal: state.modals.signInModal,
    status: state.auth.status,
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
