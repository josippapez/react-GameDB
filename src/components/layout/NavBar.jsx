import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  handleReset = () => {
    this.props.resetData();
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
        </div>
      </nav>
    );
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    resetData: () => dispatch({ type: "RESET_DATA" }),
  };
};

export default connect(null, mapStateToDispatch)(Navbar);
