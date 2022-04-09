import React from 'react';
import {NavLink} from 'react-router-dom';
import { isAuthenticated } from "../auth/helper"

 
const userNavbar = () => {
    const {user} = isAuthenticated();
    return (
        <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container mt-2">
   <div className="ml-auto mr-auto">
    <h5>welcome {user.name}</h5>
   </div>
  </div>
</nav>
        </>
    )
}

export default userNavbar;