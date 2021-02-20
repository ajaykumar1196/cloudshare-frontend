import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authAction";

import { Form, TextInput, Button } from "carbon-components-react";
import { Login32 } from "@carbon/icons-react";

function Signup(props) {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [inputs, setInputs] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const { firstName, lastName, email, password } = inputs;

  const { isLoading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (firstName && lastName && email && password) {
      dispatch(register(inputs));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 col-xl-4 my-3">
          <div className="text-center">
            <div className="mt-2 mb-3">
              <svg
                width="30"
                height="30"
                viewBox="0 0 182 156"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 9H104.081C142.144 9 173 39.8924 173 78C173 116.108 142.144 147 104.081 147H80.6486"
                  stroke="#2C7BE5"
                  stroke-width="17"
                  stroke-linecap="round"
                />
                <path
                  d="M35.101 119H103.788C126.549 119 145 100.644 145 78C145 55.3563 126.549 37 103.788 37H9"
                  stroke="#2C7BE5"
                  stroke-width="17"
                  stroke-linecap="round"
                />
                <path
                  d="M104.2 64C111.822 64 118 70.268 118 78C118 85.732 111.822 92 104.2 92H49"
                  stroke="#2C7BE5"
                  stroke-width="17"
                  stroke-linecap="round"
                />
                <line
                  x1="75.5"
                  y1="65.5"
                  x2="65.5"
                  y2="65.5"
                  stroke="#2C7BE5"
                  stroke-width="17"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-center mb-3">Signup</h1>
          <p className="text-muted text-center mb-4">
            Free access to cloudshare
          </p>
          {isLoading ? "Loading..." : null}
          <Form className="mb-3" onSubmit={handleSubmit}>
            <TextInput
              id="firstName"
              type="firstName"
              name="firstName"
              invalidText="First Name is required"
              labelText="First Name"
              placeholder="First Name"
              invalid={submitted && !firstName}
              value={firstName}
              onChange={handleChange}
            />
            <div className="mb-3"></div>
            <TextInput
              id="lastName"
              type="lastName"
              name="lastName"
              invalidText="Second Name is required"
              labelText="Second Name"
              placeholder="Second Name"
              invalid={submitted && !lastName}
              value={lastName}
              onChange={handleChange}
            />
            <div className="mb-3"></div>

            <TextInput
              id="email"
              type="email"
              name="email"
              invalidText="Email is required"
              labelText="Email Address"
              placeholder="name@address.com"
              invalid={submitted && !email}
              value={email}
              onChange={handleChange}
            />
            <div className="mb-3"></div>
            <TextInput
              id="password"
              type="password"
              name="password"
              invalidText="Password is required"
              labelText="Password"
              placeholder="Enter your password"
              invalid={submitted && !password}
              value={password}
              onChange={handleChange}
            />
            <div className="mb-3"></div>
            <Button type="submit" renderIcon={Login32} className="mb-3">
              Signup
            </Button>
            {successMessage ? (
              <div className="text-success text-center">{successMessage}</div>
            ) : null}
            {errorMessage ? (
              <div className="text-danger text-center">{errorMessage}</div>
            ) : null}
            <div className="text-center">
              <small className="text-muted text-center">
                Already have account? <Link to="/login">Login</Link>
              </small>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
