import React from "react";
import { Link } from "react-router-dom";
import { LoginProps, LoginState } from "../../interfaces/login";
import "./login-page.scss";

const Regex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export class LoginPage extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    const initialState = {
      user: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let user = this.state.user;
    switch (name) {
      case "email":
        user.email = value;
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        user.password = value;
        errors.password =
          value.length < 8 ? "Password must be eight characters long!" : "";
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { user, errors, [name]: value }));
  };

  handleSubmit = (event: any) => {
    console.log(this.state.user);
    event.preventDefault();
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2 className="form-header">Login</h2>
          <form
            className="sign-up-form"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <div className="email">
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Enter email address"
                onChange={this.handleChange}
              />
              {this.state.errors.email.length > 0 && (
                <span className="input-error">{this.state.errors.email}</span>
              )}
            </div>
            <div className="password">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleChange}
              />
              {this.state.errors.password.length > 0 && (
                <span className="input-error">
                  {this.state.errors.password}
                </span>
              )}
            </div>
            <div className="login-buttons-container">
              <Link to="/signup">Signup</Link>
              <Link to="/home">Login</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
