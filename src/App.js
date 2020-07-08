import React from "react";
import Welcome from "./Welcome";
import GameOver from "./GameOver";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";
// import Questions from "./Questions";
import "./App.css";

function App() {
   return (
      <>
         <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/game-over" component={GameOver} />
         </Switch>

         {/* <div>
           
         </div> */}
      </>
   );
}

export default App;
