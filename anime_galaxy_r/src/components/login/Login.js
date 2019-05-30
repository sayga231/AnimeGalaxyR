import React from 'react';

import "./login.sass";
import App from "../App";

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        App.login(this.state.username, this.state.password).then(res => {
            console.log(res);
        });
    };

    render() {
        return (
            <div className="login-container">
                <form className="login-form" action="" onSubmit={this.handleSubmit}>
                    <h1 className="title"><span>Login</span></h1>
                    <div className="form-group">
                        <label htmlFor="username-input">Username</label>
                        <input className="input" spellCheck="false" type="text" name="username" id="username-input" onChange={event => this.setState({username: event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-input">Password</label>
                        <input className="input" type="password" name="password" id="password-input" onChange={event => this.setState({password: event.target.value})}/>
                    </div>
                    <input className="btn" type="submit" value="Login"/>
                </form>
            </div>
        );
    }

}