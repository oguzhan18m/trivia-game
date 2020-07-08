import React from "react";
import happygif from "./happy-gif.gif";
import unhappy from "./unhapp.gif";
import "./GameOver.css";
import { Link } from "react-router-dom";

export default function GameOver(props) {
   if (props.score >= 60) {
      return (
         <div className="container-fluid">
            <div className="game-over mx-auto col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
               <div className="game-over-text">
                  <h1>GAME OVER!</h1>
                  <h3>Great Job!</h3>
               </div>

               <div className="game-over-img">
                  <img
                     src={happygif}
                     alt="happy"
                     className="happy-gif rounded-pill"
                  />
                  YOUR SCORE: {props.score}
                  <Link to="/">
                     <button className="btn btn-primary">Play Again</button>
                  </Link>
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <div className="container-fluid">
            <div className="game-over mx-auto col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
               <div className="game-over-text">
                  <h1>GAME OVER!</h1>
                  <h4>Your Score: {props.score}</h4>
                  <p>Ehhh... Not bad.</p>
               </div>

               <div className="game-over-img">
                  <img
                     src={unhappy}
                     alt="unhappy"
                     className="happy-gif rounded-pill"
                  />
                  <br />
                  <Link to="/">
                     <button className="btn btn-warning">Play Again</button>
                  </Link>
               </div>
            </div>
         </div>
      );
   }
}
