import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/NavBar";
import Homepage from "./components/homepage/Homepage";
import Favourites from "./components/favourites/Favourites";
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
