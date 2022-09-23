import React from "react";
import "./sign-up-form.scss";

const Regex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

interface SignUpProps {
  name?: any;
  value?: any;
}
interface SignUpState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
}

export class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    const initialState = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
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
    switch (name) {
      case "fullName":
        errors.username =
          value.length < 5 ? "Username must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be eight characters long!" : "";
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if (validity === true) {
      console.log("Registering can be done");
    } else {
      console.log("You cannot be registered!!!");
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2 className="form-header">Sign Up</h2>
          <form
            className="sign-up-form"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <div className="full-name">
              <label className="input-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="input"
                type="text"
                name="fullName"
                placeholder="Enter full name"
                onChange={this.handleChange}
              />
              {this.state.errors.username.length > 0 && (
                <span className="input-error">
                  {this.state.errors.username}
                </span>
              )}
            </div>
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
            <button className="submit-button">Register Me</button>
          </form>
        </div>
      </div>
    );
  }
}
