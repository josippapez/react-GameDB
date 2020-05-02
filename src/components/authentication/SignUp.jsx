import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions'
import "./SignUp.scss";

class SignUp extends Component {
    state={
        email:'',
        password:'',
        firstname:'',
        lastname:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const {auth, authError}=this.props;
        if (auth.uid) return <Redirect to='/'/>
        return (
            <div className="container mt-5">
                <form onSubmit={this.handleSubmit} className="form-group">
                    <h5>Sign up</h5>
                    <div className="form-group">
                        <label htmlFor="email" className="float-left label">Email</label>
                        <input className="form-control" type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="float-left label">Password</label>
                        <input className="form-control" type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="float-left label">Last name</label>
                        <input className="form-control" type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName" className="float-left label">First name</label>
                        <input className="form-control" type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button className="btn border-success">Sign up</button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        signUp:(creds) =>dispatch(signUp(creds))
    }
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        authError: state.auth.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
