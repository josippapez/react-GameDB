import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { resetData } from "../../store/actions/gamesActions";

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
          <Link to="/favourites" className="navbar-toggler">
            Favourites
          </Link>
        </div>
      </nav>
    );
  }
}

const mapStateToDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      resetData,
    },
    dispatch
  ),
});

export default connect(null, mapStateToDispatch)(Navbar);
