import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserChart from './user/userchart'

function Routes() {
    return (
       <BrowserRouter>
       <Switch>
           <Route path="/signup" exact component={Signup} />
           <Route path="/" exact component={Signin} />
           <Route path="/userchart" exact component={UserChart} />
          
</Switch>
       </BrowserRouter>
    )
}
export default Routes; 
