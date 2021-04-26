import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

import AuthContext from "../../context/auth-context";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = AuthContext;

  handleSubmit(e) {
    e.preventDefault();
    const data = {};
    data["email"] = e.target[0].value;
    data["password"] = e.target[1].value;
    // console.log(data);
    const url = "/users/login";

    axios
      .post(url, data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.access_token) {
          localStorage.setItem("jwtToken", res.data.access_token);
          localStorage.setItem("user", e.target[0].value);
          this.context.login(res.data.access_token, e.target[0].value);
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  }

  render() {
    return (
      <div style={{ margin: "40px 0" }}>
        <div className="container login">
          <div className="row row-content justify-content-space-between">
            <div className="login__form col-12 col-md-6">
              <h3>Login</h3>
              <Form
                onSubmit={(e) => this.handleSubmit(e)}
                className="login__form-inputs"
              >
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Eg. abc123@gmail.com"
                    className="login__input"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    required
                    className="login__input"
                    type="password"
                    name="password"
                    id="password"
                  />
                </FormGroup>
                <FormText style={{ margin: "10px 0" }}>
                  <NavLink to="/signup">
                    Don't have an account? Register now!
                  </NavLink>
                </FormText>
                <Button color="warning">Login</Button>
              </Form>
            </div>
            <div className="login__img d-none d-sm-none d-md-block col-md-6">
              <img
                className="img-fluid"
                src="/assets/login.jpg"
                height="400"
                alt=""
              />
            </div>
          </div>
        </div>
        {this.context.token && <Redirect to="/" />}
      </div>
    );
  }
}
