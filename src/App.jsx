import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Homepage from "./components/homepage/Homepage";
import Favourites from "./components/favourites/Favourites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/favourites' component={Favourites}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
