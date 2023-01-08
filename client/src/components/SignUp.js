import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp">
      <label> Sign Up</label>
      <input
        placeholder="First Name"
        className="form-control m-1"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        className="form-control m-1"
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        className="form-control m-1"
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        className="form-control m-1"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button
        type="button"
        onClick={signUp}
        className="btn btn-primary m-1 w-100"
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
