import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Homepage from "./components/homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Homepage />
      </div>
    </BrowserRouter>
  );
}

export default App;
