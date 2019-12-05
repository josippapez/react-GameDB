import React from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Homepage from './components/homepage/homepage';
import GameDetails from './components/games/gameDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path='/game/:id' component={GameDetails}/>
        </Switch>
      </div>
    </BrowserRouter>  
  );
}

export default App;
