import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/firebaseSetup";
import "./home-page.scss";

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div>Homepage</div>
        <Link to="/">
          <button onClick={logout}>Logout</button>
        </Link>
      </div>
    );
  }
}
