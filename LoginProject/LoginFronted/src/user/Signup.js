import React, { useState } from "react";
import  Base from "../core/Base";
import {Link} from "react-router-dom";
import { signup } from "../auth/helper"

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };
  
   const signUpForm = () => {
       return (
        <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 offset-md-3 offset-sm-3 text-left mb-0 mt-0">
          <form>
            <div className="form-group">
              <label className="text-black ml-0 ml-2 font-weight-bold">Name</label>
              <input className="form-control form-control-md border-top-0 border-left-0 border-right-0" 
              onChange={handleChange("name")} 
              type="text" 
              placeholder="your name"
               value={name} 
               />
            </div>
            <div className="form-group mt-4">
              <label className="text-black ml-2 font-weight-bold">Email Address</label>
              <input className="form-control form-control-md border-top-0 border-left-0 border-right-0"  
              onChange={handleChange("email")}  
              placeholder="ex@gmail.com"
              type="email" 
              value={email}
              />
            </div>

            <div className="form-group mt-4">
              <label className="text-black ml-2 font-weight-bold">Password</label>
              <input className="form-control form-control-md border-top-0 border-left-0 border-right-0"  
              onChange={handleChange("password")} 
               type="password" 
               placeholder="your password"
               value={password}
               />
            </div>
            <button onClick={onSubmit}
            className="btn btn-block text-white form-control form-control-md rounded-pill" style={{backgroundColor:"#7c4dff"}}>Submit</button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return(
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-success"
      style={{display: success ? "" : "none"}}>
        New account was created successfully. Please <Link to="/">Login Here</Link>
    </div>
    </div>
    </div>
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

    return (
        <Base title= "Sign up" description="A page for user to signup!">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        </Base>
    )
}

export default Signup;