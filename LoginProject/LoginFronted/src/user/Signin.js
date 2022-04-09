import React, { useState } from "react";
import  Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import {signin, authenticate, isAuthenticated} from "../auth/helper"

const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values

const {user} = isAuthenticated();

const handleChange = name => event => {
  setValues({ ...values, error: false, [name]: event.target.value });
};

const loadingMessage = () => {
  return(
    loading && (
      <div className="alert alert-info">
        <h1>Loading...</h1>
      </div>
    )
  );
  };
const errorMessage = () => {
  return(
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
  <div className="alert alert-danger"
    style={{display: error ? "" : "none"}}>
    {error}
  </div>
  </div>
  </div>
  );
};

const onSubmit = event => {
  event.preventDefault();
  setValues({...values, error: false, loading: true})
  signin({email, password})
  .then(data => {
    if (data.error) {
      setValues({...values, error: data.error, loading: false})
    } else {
      authenticate(data, () => {
        setValues({
          ...values,
          didRedirect: true
        });
      });
    }
  })
  .catch(console.log("signin request failed"));
}

const performRedirect = () => {
  if(didRedirect) {
    if (user && user.role === 0) {
      return <Redirect to ="/userchart" />
    } else {
      return console.log(error)
    }
  }
}

const signInForm = () => {
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-6 offset-md-3 offset-sm-3 text-left mb-0 mt-0">
        <form>
          <div className="form-group">
            <label className="text-black ml-0 ml-2 font-weight-bold">Email</label>
            <input
              onChange={handleChange("email")}
              value={email}
              className="form-control border-top-0 border-left-0 border-right-0"
              type="email"
            />
          </div>

          <div className="form-group mt-4">
            <label className="text-black ml-0 ml-2 font-weight-bold">Password</label>
            <div className="forgot float-right">
                    <a href="#" id="forgot-link" style={{Color:"#7c4dff"}}>Forgot Password?</a>
                  </div>
            <input
              onChange={handleChange("password")}
              value={password}
              className="form-control border-top-0 border-left-0 border-right-0"
              type="password"
            />
          </div>
          <button onClick={onSubmit} className="btn btn-block text-white form-control form-control-md rounded-pill" style={{backgroundColor:"#7c4dff"}}>
            Log in
          </button>
          <div className="mt-4 text-center font-weight-bold">
                    <a href="#" id="" style={{Color:"#7c4dff"}}>Don't have account ? <Link to="/signup">Sign up</Link></a>
                  </div>
        </form>
      </div>
    </div>
  );
};

    return (
         <Base title= "Log in" description="A page for user to signin!">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
    <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;