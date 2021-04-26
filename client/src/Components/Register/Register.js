import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

import "./Register.css";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      data[e.target[i].id] = e.target[i].value;
    }
    console.log(data);

    const url = "/users/signup";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <div className="container register">
        <div className="row row-content justify-content-space-between">
          <div className="register__form col-12 col-md-6">
            <h3>Sign Up</h3>
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className="register__form-inputs"
            >
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="register__input"
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="register__input"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Eg. abc123@gmail.com"
                  className="register__input"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  required
                  className="register__input"
                  type="password"
                  name="password"
                  id="password"
                />
              </FormGroup>
              <FormText style={{ margin: "10px 0" }}>
                <NavLink to="/login"> ← Back to Login</NavLink>
              </FormText>
              <Button color="warning">Register</Button>
            </Form>
          </div>
          <div className="register__img d-none d-sm-none d-md-block col-md-6">
            <img
              className="img-fluid"
              src="/assets/login.jpg"
              height="400"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
