import React, { Component } from 'react';
import {connect}from 'react-redux';
import {signIn} from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom';

class SignIn extends Component {
    state={
        email:'',
        password:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.signIn(this.state);
    }
    render() {
        const {status,auth}=this.props;
        if (auth.uid) return <Redirect to='/'/>
        return (
            <div className="container mt-5">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign in</h5>
                    <div className="form-group">
                        <label htmlFor="firstName" className="float-left label">Email</label>
                        <input className="form-control" type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName" className="float-left label">Password</label>
                        <input className="form-control" type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn border-success">Login</button>
                        <div className="red-text center">
                            {status ?  <p>{status}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        signIn:(creds)=> dispatch(signIn(creds))
    }
}
const mapStateToProps=(state)=>{
    return {
        status:state.auth.status,
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
